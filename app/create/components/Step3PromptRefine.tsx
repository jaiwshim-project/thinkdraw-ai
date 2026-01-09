'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { buildInitialPrompt } from '@/lib/prompt-builder';
import type { Audience } from '@/types';

interface Step3PromptRefineProps {
  topic: string;
  topicDetail: string;
  audience: Audience | null;
  refinedPrompt: string;
  onPromptChange: (prompt: string) => void;
  onNext: () => void;
}

const MAX_PROMPT_LENGTH = 3800;

export function Step3PromptRefine({
  topic,
  topicDetail,
  audience,
  refinedPrompt,
  onPromptChange,
  onNext,
}: Step3PromptRefineProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiGeneratedPrompt, setAiGeneratedPrompt] = useState('');

  const currentLength = refinedPrompt.length;
  const isOverLimit = currentLength > MAX_PROMPT_LENGTH;
  const remaining = MAX_PROMPT_LENGTH - currentLength;

  useEffect(() => {
    // Step 3에 처음 도착하면 AI 프롬프트 자동 생성 (주제 + 청중만 사용)
    if (!refinedPrompt && topic && audience) {
      generateAIPrompt();
    }
  }, []);

  const generateAIPrompt = async () => {
    if (!audience) return;

    setIsGenerating(true);
    try {
      // AI 엔진을 사용해 주제와 타겟을 바탕으로 풍부한 설명 생성
      await new Promise(resolve => setTimeout(resolve, 1500)); // 로딩 시뮬레이션

      // buildInitialPrompt 함수 사용
      const prompt = buildInitialPrompt(topic, topicDetail, audience);

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
                className={`text-sm focus:ring-2 transition-shadow font-mono ${
                  isOverLimit ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
                }`}
                placeholder="AI가 생성한 설명이 여기에 표시됩니다..."
              />

              {/* 글자수 표시 */}
              <div className="flex items-center justify-between text-xs">
                <p className="text-gray-500">
                  💡 내용을 자유롭게 수정하거나 추가 정보를 입력하세요. 이 내용은 최종 이미지 생성에 반영됩니다.
                </p>
                <div className={`font-medium ${
                  isOverLimit ? 'text-red-600' : remaining < 200 ? 'text-orange-600' : 'text-gray-600'
                }`}>
                  {currentLength.toLocaleString()} / {MAX_PROMPT_LENGTH.toLocaleString()}자
                  {isOverLimit && <span className="ml-1">({Math.abs(remaining)}자 초과)</span>}
                </div>
              </div>

              {/* 길이 초과 경고 */}
              {isOverLimit && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm font-semibold text-red-900 mb-1">⚠️ 프롬프트가 너무 깁니다</p>
                  <p className="text-xs text-red-800">
                    프롬프트는 {MAX_PROMPT_LENGTH.toLocaleString()}자를 초과할 수 없습니다.
                    현재 {Math.abs(remaining)}자를 줄여주세요.
                  </p>
                </div>
              )}
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
              <li className="font-semibold text-yellow-900">최대 {MAX_PROMPT_LENGTH.toLocaleString()}자까지 작성 가능</li>
            </ul>
          </div>

          {/* 버튼 */}
          <div className="flex gap-3 pt-2">
            <Button
              onClick={handleUseAsIs}
              className="btn-gradient flex-1"
              size="lg"
              disabled={!refinedPrompt || isGenerating || isOverLimit}
            >
              {isOverLimit
                ? `❌ 글자수 초과 (${Math.abs(remaining)}자 줄이기)`
                : refinedPrompt
                  ? '✓ 이 내용으로 진행'
                  : '내용을 입력해주세요'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
