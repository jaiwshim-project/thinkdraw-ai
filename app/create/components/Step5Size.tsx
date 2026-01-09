'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SIZES } from '@/lib/constants';
import type { SizeType } from '@/types';

interface Step5SizeProps {
  size: SizeType | null;
  onSizeChange: (size: SizeType) => void;
  onNext?: () => void;
}

export function Step5Size({ size, onSizeChange, onNext }: Step5SizeProps) {
  const handleDoubleClick = (selectedSize: SizeType) => {
    onSizeChange(selectedSize);
    if (onNext) {
      setTimeout(() => onNext(), 200);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>이미지 사이즈를 선택하세요</CardTitle>
          <CardDescription>
            사용 목적에 맞는 이미지 비율을 선택하세요
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {SIZES.map((sizeOption) => (
              <button
                key={sizeOption.id}
                onClick={() => onSizeChange(sizeOption.id)}
                onDoubleClick={() => handleDoubleClick(sizeOption.id)}
                className={`p-6 rounded-lg border-2 transition-all text-left ${
                  size === sizeOption.id
                    ? 'border-primary bg-primary/5 shadow-lg'
                    : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="font-semibold text-lg mb-2">{sizeOption.name}</div>
                    <p className="text-sm text-gray-600 mb-3">{sizeOption.description}</p>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium text-primary">활용 용도:</span>
                      <span className="text-gray-600">{sizeOption.use}</span>
                    </div>
                  </div>

                  {/* 비율 시각화 */}
                  <div className="flex items-center justify-center w-32 h-24 bg-gray-100 rounded-md p-2">
                    <div
                      className={`bg-primary/20 border-2 border-primary/50 ${
                        sizeOption.id === '16:9'
                          ? 'w-full h-16'
                          : sizeOption.id === '9:16'
                          ? 'w-12 h-full'
                          : 'w-16 h-16'
                      }`}
                    />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
