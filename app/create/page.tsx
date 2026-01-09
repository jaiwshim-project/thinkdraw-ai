'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCreateStore } from '@/store/create-store';
import { Header } from '@/components/Header';
import { StepIndicator } from './components/StepIndicator';
import { NavigationButtons } from './components/NavigationButtons';
import { Step1Topic } from './components/Step1Topic';
import { Step2Audience } from './components/Step2Audience';
import { Step3Style } from './components/Step3Style';
import { Step4Tool } from './components/Step4Tool';
import { Step5Size } from './components/Step5Size';
import { Step6PromptRefine } from './components/Step6PromptRefine';
import { Step6Language } from './components/Step6Language';
import { Step7Decoration } from './components/Step7Decoration';
import { Step8Result } from './components/Step8Result';
import { buildPrompt } from '@/lib/prompt-builder';
import { getMockImage, downloadMockImage } from '@/lib/mock-images';
import { saveImageToHistory } from '@/lib/image-history';

export default function CreatePage() {
  const router = useRouter();
  const {
    currentStep,
    topic,
    topicDetail,
    audience,
    style,
    tool,
    size,
    refinedPrompt,
    language,
    decoration,
    generatedPrompt,
    generatedImage,
    setTopic,
    setAudience,
    setStyle,
    setTool,
    setSize,
    setRefinedPrompt,
    setLanguage,
    setDecoration,
    setGeneratedPrompt,
    setGeneratedImage,
    nextStep,
    prevStep,
    canProceedToNextStep,
  } = useCreateStore();

  // API 키 체크 - 페이지 로드 시 한 번만 실행
  useEffect(() => {
    const openaiApiKey = localStorage.getItem('openai_api_key');
    const geminiApiKey = localStorage.getItem('gemini_api_key');

    if (!openaiApiKey && !geminiApiKey) {
      const goToSettings = confirm(
        'API 키가 설정되지 않았습니다.\n\n설정 페이지에서 OpenAI 또는 Gemini API 키를 설정해주세요.'
      );
      if (goToSettings) {
        router.push('/settings');
      } else {
        router.push('/');
      }
    }
  }, []); // 빈 배열로 한 번만 실행

  // Step 6 이하로 돌아가면 생성된 콘텐츠 초기화 (스타일이나 사이즈 변경 가능성)
  useEffect(() => {
    if (currentStep <= 6) {
      console.log('Returned to step', currentStep, '- resetting generated content');
      setGeneratedPrompt('');
      setGeneratedImage(null);
    }
  }, [currentStep, setGeneratedPrompt, setGeneratedImage]);

  // Step 9에 도달하면 프롬프트 생성
  useEffect(() => {
    if (currentStep === 9) {
      console.log('Step 9 reached. Current state:', {
        topic,
        audience,
        style,
        tool,
        size,
        refinedPrompt,
        language,
        decoration,
      });

      // 유효성 검사
      if (!topic || !audience || !style || !tool || !size || !refinedPrompt || !language || !decoration) {
        console.error('Missing required fields:', {
          topic: !!topic,
          audience: !!audience,
          style: !!style,
          tool: !!tool,
          size: !!size,
          refinedPrompt: !!refinedPrompt,
          language: !!language,
          decoration: !!decoration,
        });
        return;
      }

      console.log('Generating new content...');

      // 항상 새로 생성 (현재 선택된 값으로)
      const prompt = buildPrompt({
        topic,
        topicDetail,
        audience,
        style,
        tool,
        size,
        language,
        decoration,
      });

      console.log('Generated prompt:', prompt);
      setGeneratedPrompt(prompt);

      // 실제 AI 이미지 생성 (DALL-E 3 API 호출)
      generateImageWithAPI(prompt, size);
    }
  }, [currentStep]);

  // 실제 API 호출하여 이미지 생성
  const generateImageWithAPI = async (prompt: string, imageSize: typeof size) => {
    try {
      // LocalStorage에서 API 키 가져오기
      const openaiApiKey = localStorage.getItem('openai_api_key');
      const geminiApiKey = localStorage.getItem('gemini_api_key');

      // 어떤 API를 사용할지 결정
      let provider: 'openai' | 'gemini' | null = null;
      let apiKey: string | null = null;

      if (openaiApiKey) {
        provider = 'openai';
        apiKey = openaiApiKey;
      } else if (geminiApiKey) {
        provider = 'gemini';
        apiKey = geminiApiKey;
      }

      if (!apiKey || !provider) {
        const goToSettings = confirm(
          'API 키가 설정되지 않았습니다.\n\n설정 페이지에서 OpenAI 또는 Gemini API 키를 설정하시겠습니까?'
        );
        if (goToSettings) {
          window.location.href = '/settings';
        } else {
          // Mock 이미지 사용
          const mockImageUrl = getMockImage(style!, imageSize!);
          setGeneratedImage(mockImageUrl);
        }
        return;
      }

      console.log(`Calling ${provider.toUpperCase()} API to generate image...`);
      setGeneratedImage(null); // 로딩 상태

      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          size: imageSize,
          provider, // 제공자 정보 추가
          apiKey, // API 키 전달
        }),
      });

      const data = await response.json();

      console.log('=== API 응답 ===');
      console.log('Status:', response.status);
      console.log('OK:', response.ok);
      console.log('Data:', data);

      if (!response.ok) {
        console.error('API Error:', data);
        console.error('Error code:', data.code);
        console.error('Error message:', data.error);
        console.error('Error details:', data.details);

        // 에러 코드별 처리
        if (data.code === 'billing_hard_limit_reached' || data.code === 'insufficient_quota') {
          // API 한도 초과 에러
          const userChoice = confirm(
            `❌ ${data.error}\n\n${data.details}\n\n` +
            `옵션을 선택하세요:\n` +
            `✅ [확인] - 설정 페이지로 이동 (다른 API 키 사용)\n` +
            `❌ [취소] - Mock 이미지로 대체`
          );

          if (userChoice) {
            // 확인 클릭: 설정 페이지로 이동
            window.location.href = '/settings';
            return;
          } else {
            // 취소 클릭: Mock 이미지 사용
            alert('Mock 이미지를 표시합니다. 실제 이미지를 생성하려면 API 크레딧을 충전하거나 다른 API 키를 사용하세요.');
            const mockImageUrl = getMockImage(style!, imageSize!);
            setGeneratedImage(mockImageUrl);
            return;
          }
        } else if (data.error?.includes('API key') || data.code === 'invalid_api_key') {
          // API 키 오류
          const goToSettings = confirm(
            `${data.error}\n\n설정 페이지에서 API 키를 확인하시겠습니까?`
          );
          if (goToSettings) {
            window.location.href = '/settings';
            return;
          }
        } else {
          // 기타 에러
          alert(`이미지 생성 실패: ${data.error}\n${data.details || ''}`);
        }

        // 실패 시 Mock 이미지 사용
        const mockImageUrl = getMockImage(style!, imageSize!);
        setGeneratedImage(mockImageUrl);
        return;
      }

      console.log('Image generated successfully:', data.imageUrl);

      // 이미지 URL 유효성 검사
      if (!data.imageUrl) {
        console.error('No imageUrl in response:', data);
        alert('이미지 생성 실패: 이미지 URL이 응답에 포함되지 않았습니다.');
        const mockImageUrl = getMockImage(style!, imageSize!);
        setGeneratedImage(mockImageUrl);
        return;
      }

      setGeneratedImage(data.imageUrl);

      // 이미지 히스토리에 저장
      if (topic && audience && style && tool && size && refinedPrompt && language && decoration) {
        saveImageToHistory({
          topic,
          topicDetail,
          audience,
          style,
          tool,
          size: imageSize!,
          language,
          decoration,
          imageUrl: data.imageUrl,
          prompt: prompt,
        });
        console.log('Image saved to history');
      }

    } catch (error) {
      console.error('Failed to generate image (catch):', error);
      console.error('Error details:', {
        message: (error as Error).message,
        stack: (error as Error).stack
      });
      alert(`이미지 생성 중 오류가 발생했습니다.\n\n에러: ${(error as Error).message}`);
      // 오류 시 Mock 이미지 사용
      const mockImageUrl = getMockImage(style!, imageSize!);
      setGeneratedImage(mockImageUrl);
    }
  };

  const generatePrompt = () => {
    // 수동 재생성용 함수
    console.log('Manual regeneration triggered');

    if (!topic || !audience || !style || !tool || !size || !refinedPrompt || !language || !decoration) {
      console.error('Cannot regenerate - missing required fields');
      return;
    }

    // 먼저 초기화
    setGeneratedPrompt('');
    setGeneratedImage(null);

    // 짧은 딜레이 후 재생성
    setTimeout(() => {
      const prompt = buildPrompt({
        topic,
        topicDetail,
        audience,
        style,
        tool,
        size,
        language,
        decoration,
      });

      console.log('Regenerated prompt:', prompt);
      setGeneratedPrompt(prompt);

      // 실제 API 호출
      generateImageWithAPI(prompt, size);
    }, 100);
  };

  const handleDownload = () => {
    if (generatedImage) {
      const filename = `thinkdraw-${style}-${size}-${Date.now()}.png`;
      downloadMockImage(generatedImage, filename);
    }
  };

  const handleRegenerate = () => {
    setGeneratedPrompt('');
    setGeneratedImage(null);
    generatePrompt();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto compact-container compact-section">
        {/* Step Indicator */}
        <StepIndicator currentStep={currentStep} totalSteps={9} />

        {/* Step Content */}
        <div className="mb-6">
          {currentStep === 1 && (
            <Step1Topic
              topic={topic}
              topicDetail={topicDetail}
              onTopicChange={(value) => setTopic(value, topicDetail)}
              onDetailChange={(value) => setTopic(topic, value)}
            />
          )}

          {currentStep === 2 && (
            <Step2Audience
              audience={audience}
              onAudienceChange={setAudience}
              onNext={nextStep}
            />
          )}

          {currentStep === 3 && (
            <Step3Style
              style={style}
              onStyleChange={setStyle}
              onNext={nextStep}
            />
          )}

          {currentStep === 4 && (
            <Step4Tool
              tool={tool}
              onToolChange={setTool}
              onNext={nextStep}
            />
          )}

          {currentStep === 5 && (
            <Step5Size
              size={size}
              onSizeChange={setSize}
              onNext={nextStep}
            />
          )}

          {currentStep === 6 && (
            <Step6PromptRefine
              topic={topic}
              topicDetail={topicDetail}
              audienceType={audience?.type || 'age'}
              audienceValue={audience?.value || '일반'}
              refinedPrompt={refinedPrompt}
              onPromptChange={setRefinedPrompt}
              onNext={nextStep}
            />
          )}

          {currentStep === 7 && (
            <Step6Language
              language={language}
              onLanguageChange={setLanguage}
              onNext={nextStep}
            />
          )}

          {currentStep === 8 && (
            <Step7Decoration
              decoration={decoration}
              onDecorationChange={setDecoration}
              onNext={nextStep}
            />
          )}

          {currentStep === 9 && (
            <Step8Result
              prompt={generatedPrompt}
              imageUrl={generatedImage}
              topic={topic}
              topicDetail={topicDetail}
              audience={audience}
              style={style}
              tool={tool}
              size={size}
              language={language}
              decoration={decoration}
              onRegenerate={handleRegenerate}
              onDownload={handleDownload}
            />
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="max-w-4xl mx-auto">
          <NavigationButtons
            currentStep={currentStep}
            totalSteps={9}
            canProceed={canProceedToNextStep()}
            onPrev={prevStep}
            onNext={nextStep}
          />
        </div>
      </main>
    </div>
  );
}
