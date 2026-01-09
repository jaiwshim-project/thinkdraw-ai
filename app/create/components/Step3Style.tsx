'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { STYLES } from '@/lib/constants';
import type { StyleType } from '@/types';

interface Step3StyleProps {
  style: StyleType | null;
  onStyleChange: (style: StyleType) => void;
  onNext?: () => void;
}

export function Step3Style({ style, onStyleChange, onNext }: Step3StyleProps) {
  const handleDoubleClick = (selectedStyle: StyleType) => {
    onStyleChange(selectedStyle);
    if (onNext) {
      setTimeout(() => onNext(), 200);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>표현 스타일을 선택하세요</CardTitle>
          <CardDescription>
            목적에 맞는 시각화 스타일을 선택하세요
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {STYLES.map((styleOption) => (
              <button
                key={styleOption.id}
                onClick={() => onStyleChange(styleOption.id)}
                onDoubleClick={() => handleDoubleClick(styleOption.id)}
                className={`p-6 rounded-lg border-2 transition-all text-left ${
                  style === styleOption.id
                    ? 'border-primary bg-primary/5 shadow-lg'
                    : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'
                }`}
              >
                <div className="font-semibold text-lg mb-2">{styleOption.name}</div>
                <p className="text-sm text-gray-600">{styleOption.description}</p>

                {/* 예시 이미지 플레이스홀더 */}
                <div className="mt-4 h-32 bg-gray-100 rounded-md flex items-center justify-center text-gray-400 text-sm">
                  예시 이미지
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
