'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface Step6PromptRefineProps {
  topic: string;
  topicDetail: string;
  audienceType: string;
  audienceValue: string;
  refinedPrompt: string;
  onPromptChange: (prompt: string) => void;
  onNext: () => void;
}

export function Step6PromptRefine({
  topic,
  topicDetail,
  audienceType,
  audienceValue,
  refinedPrompt,
  onPromptChange,
  onNext,
}: Step6PromptRefineProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiGeneratedPrompt, setAiGeneratedPrompt] = useState('');

  useEffect(() => {
    // Step 6에 처음 도착하면 AI 프롬프트 자동 생성
    if (!refinedPrompt && topic) {
      generateAIPrompt();
    }
  }, []);

  const generateAIPrompt = async () => {
    setIsGenerating(true);
    try {
      // AI 엔진을 사용해 주제와 타겟을 바탕으로 풍부한 설명 생성
      // 실제로는 OpenAI API를 호출하지만, 여기서는 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1500)); // 로딩 시뮬레이션

      const prompt = `주제: ${topic}${topicDetail ? `\n상세: ${topicDetail}` : ''}
타겟: ${audienceValue}

AI가 생성한 풍부한 설명:
${topic}는 ${audienceValue}를 위한 중요한 개념입니다. ${topicDetail || '이 주제는 다양한 관점에서 이해할 수 있으며, 실생활에 직접 적용 가능한 실용적인 지식입니다.'}

핵심 포인트:
1. 기본 개념과 정의를 명확히 이해
2. 실제 적용 사례와 예시 학습
3. 단계별 실행 방법 습득
4. 예상되는 결과와 효과 파악

이를 통해 ${audienceValue}는 ${topic}를 효과적으로 활용할 수 있게 됩니다.`;

      setAiGeneratedPrompt(prompt);
      onPromptChange(prompt);
    } catch (error) {
      console.error('Failed to generate AI prompt:', error);
      alert('프롬프트 생성에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRegenerate = () => {
    generateAIPrompt();
  };

  const handleUseAsIs = () => {
    if (refinedPrompt) {
      onNext();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="card-enhanced">
        <CardHeader className="pb-4">
          <CardTitle className="text-gradient">AI 프롬프팅 수정</CardTitle>
          <CardDescription>
            AI가 생성한 설명을 확인하고, 필요시 수정하거나 추가 정보를 입력하세요
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* AI 생성 상태 */}
          {isGenerating && (
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200 text-center">
              <div className="animate-pulse">
                <div className="text-4xl mb-2">🤖</div>
                <p className="text-sm font-medium text-blue-900">AI가 풍부한 설명을 생성하고 있습니다...</p>
              </div>
            </div>
          )}

          {/* AI가 생성한 프롬프트 표시 */}
          {!isGenerating && refinedPrompt && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">AI가 생성한 설명</label>
                <Button
                  onClick={handleRegenerate}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  🔄 재생성
                </Button>
              </div>
              <Textarea
                value={refinedPrompt}
                onChange={(e) => onPromptChange(e.target.value)}
                rows={12}
                className="text-sm focus:ring-2 focus:ring-blue-500 transition-shadow font-mono"
                placeholder="AI가 생성한 설명이 여기에 표시됩니다..."
              />
              <p className="text-xs text-gray-500">
                💡 내용을 자유롭게 수정하거나 추가 정보를 입력하세요. 이 내용은 최종 이미지 생성에 반영됩니다.
              </p>
            </div>
          )}

          {/* 안내 메시지 */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-3 shadow-sm">
            <h3 className="font-semibold text-yellow-900 mb-1.5 text-sm">✏️ 수정 방법</h3>
            <ul className="text-xs text-yellow-800 space-y-0.5 ml-4 list-disc">
              <li>AI가 생성한 내용을 그대로 사용하거나</li>
              <li>텍스트를 직접 수정하여 원하는 내용으로 변경</li>
              <li>추가하고 싶은 정보나 지시사항 입력</li>
              <li>구체적인 예시나 세부 설명 추가 가능</li>
            </ul>
          </div>

          {/* 버튼 */}
          <div className="flex gap-3 pt-2">
            <Button
              onClick={handleUseAsIs}
              className="btn-gradient flex-1"
              size="lg"
              disabled={!refinedPrompt || isGenerating}
            >
              {refinedPrompt ? '✓ 이 내용으로 진행' : '내용을 입력해주세요'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
