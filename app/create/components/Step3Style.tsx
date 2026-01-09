'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { STYLES } from '@/lib/constants';
import type { StyleType } from '@/types';
import Image from 'next/image';

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
          <div className="grid grid-cols-4 gap-2">
            {STYLES.map((styleOption) => (
              <button
                key={styleOption.id}
                onClick={() => onStyleChange(styleOption.id)}
                onDoubleClick={() => handleDoubleClick(styleOption.id)}
                className={`p-3 rounded-lg border-2 transition-all text-left ${
                  style === styleOption.id
                    ? 'border-primary bg-primary/5 shadow-lg'
                    : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'
                }`}
              >
                <div className="font-semibold text-base mb-1">{styleOption.name}</div>
                <p className="text-xs text-gray-600">{styleOption.description}</p>

                {/* 예시 이미지 */}
                {styleOption.example && (
                  <div className="mt-2 h-24 bg-gray-100 rounded-md overflow-hidden relative">
                    <Image
                      src={styleOption.example}
                      alt={`${styleOption.name} 예시`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                )}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
