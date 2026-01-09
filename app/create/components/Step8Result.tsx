'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { StyleType, SizeType, Audience, ToolType, LanguageType, DecorationType } from '@/types';
import { STYLES, TOOLS, SIZES, LANGUAGES, DECORATIONS, AGE_GROUPS, FIELDS } from '@/lib/constants';

interface Step8ResultProps {
  prompt: string;
  imageUrl: string | null;
  topic: string;
  topicDetail?: string;
  audience: Audience | null;
  style: StyleType | null;
  tool: ToolType | null;
  size: SizeType | null;
  language: LanguageType | null;
  decoration: DecorationType | null;
  onRegenerate: () => void;
  onDownload: () => void;
}

export function Step8Result({
  prompt,
  imageUrl,
  topic,
  topicDetail,
  audience,
  style,
  tool,
  size,
  language,
  decoration,
  onRegenerate,
  onDownload,
}: Step8ResultProps) {
  // 선택한 옵션 이름 가져오기
  const getAudienceName = () => {
    if (!audience) return '없음';
    if (audience.type === 'age') {
      const ageGroup = AGE_GROUPS.find(g => g.id === audience.value);
      return ageGroup?.name || audience.value;
    } else {
      const field = FIELDS.find(f => f.id === audience.value);
      return field?.name || audience.value;
    }
  };

  const styleName = STYLES.find(s => s.id === style)?.name || '없음';
  const toolName = TOOLS.find(t => t.id === tool)?.name || '없음';
  const sizeName = SIZES.find(s => s.id === size)?.name || '없음';
  const languageName = LANGUAGES.find(l => l.id === language)?.name || '없음';
  const decorationName = DECORATIONS.find(d => d.id === decoration)?.name || '없음';

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* 선택한 조건 요약 */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-lg">📋 선택한 조건</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-1">1️⃣ 주제</p>
              <p className="text-sm text-gray-900">{topic}</p>
              {topicDetail && (
                <p className="text-xs text-gray-600 mt-1">{topicDetail}</p>
              )}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-1">2️⃣ 타겟 청중</p>
              <p className="text-sm text-gray-900">{getAudienceName()}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-1">3️⃣ 표현 스타일</p>
              <p className="text-sm text-gray-900">{styleName}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-1">4️⃣ 필기 도구</p>
              <p className="text-sm text-gray-900">{toolName}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-1">5️⃣ 이미지 사이즈</p>
              <p className="text-sm text-gray-900">{sizeName}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-1">6️⃣ 언어</p>
              <p className="text-sm text-gray-900">{languageName}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-1">7️⃣ 장식</p>
              <p className="text-sm text-gray-900">{decorationName}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 생성된 이미지 */}
      <Card>
        <CardHeader>
          <CardTitle>🎉 이미지가 생성되었습니다!</CardTitle>
          <CardDescription>
            아래 이미지를 확인하고 다운로드하세요
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center min-h-[400px]">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Generated image"
                className="max-w-full h-auto rounded-lg shadow-lg"
                key={imageUrl}
              />
            ) : (
              <div className="text-center">
                <div className="text-6xl mb-4">🎨</div>
                <p className="text-gray-600">이미지를 생성 중입니다...</p>
              </div>
            )}
          </div>

          {/* 액션 버튼 */}
          <div className="flex gap-4 mt-6">
            <Button onClick={onDownload} size="lg" className="flex-1">
              📥 다운로드
            </Button>
            <Button onClick={onRegenerate} variant="outline" size="lg" className="flex-1">
              🔄 다시 생성
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 생성된 프롬프트 */}
      <Card>
        <CardHeader>
          <CardTitle>생성된 프롬프트</CardTitle>
          <CardDescription>
            다음 프롬프트로 이미지가 생성되었습니다
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-4 rounded-lg">
            <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
              {prompt || '프롬프트를 생성 중입니다...'}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
