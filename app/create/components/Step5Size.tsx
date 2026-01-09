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
          <div className="grid grid-cols-3 gap-2">
            {SIZES.map((sizeOption) => (
              <button
                key={sizeOption.id}
                onClick={() => onSizeChange(sizeOption.id)}
                onDoubleClick={() => handleDoubleClick(sizeOption.id)}
                className={`p-3 rounded-lg border-2 transition-all text-left ${
                  size === sizeOption.id
                    ? 'border-primary bg-primary/5 shadow-lg'
                    : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'
                }`}
              >
                <div className="space-y-2">
                  <div className="font-semibold text-base">{sizeOption.name}</div>
                  <p className="text-xs text-gray-600">{sizeOption.description}</p>
                  <div className="text-xs text-gray-500">
                    <span className="font-medium">용도:</span> {sizeOption.use}
                  </div>

                  {/* 비율 시각화 */}
                  <div className="flex items-center justify-center h-16 bg-gray-100 rounded-md p-1">
                    <div
                      className={`bg-primary/20 border-2 border-primary/50 ${
                        sizeOption.id === '16:9'
                          ? 'w-full h-10'
                          : sizeOption.id === '9:16'
                          ? 'w-8 h-full'
                          : 'w-12 h-12'
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
