'use client';

import type { DecorationType } from '@/types';
import { DECORATIONS } from '@/lib/constants';
import { Card } from '@/components/ui/card';

interface Step7DecorationProps {
  decoration: DecorationType | null;
  onDecorationChange: (decoration: DecorationType) => void;
  onNext?: () => void;
}

export function Step7Decoration({ decoration, onDecorationChange, onNext }: Step7DecorationProps) {
  const handleDoubleClick = (selectedDecoration: DecorationType) => {
    onDecorationChange(selectedDecoration);
    if (onNext) {
      setTimeout(() => onNext(), 200);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold text-gray-900">장식 방법 선택</h2>
        <p className="text-lg text-gray-600">
          이미지의 테두리와 공간을 장식할 스타일을 선택하세요
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
        {DECORATIONS.map((decorationOption) => (
          <Card
            key={decorationOption.id}
            className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
              decoration === decorationOption.id
                ? 'border-2 border-purple-500 bg-purple-50'
                : 'border border-gray-200 hover:border-purple-300'
            }`}
            onClick={() => onDecorationChange(decorationOption.id)}
            onDoubleClick={() => handleDoubleClick(decorationOption.id)}
          >
            <div className="flex items-start gap-4">
              <div className="text-4xl flex-shrink-0">
                {decorationOption.icon}
              </div>
              <div className="flex-1 space-y-2">
                <h3 className="text-xl font-semibold text-gray-900">
                  {decorationOption.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {decorationOption.description}
                </p>
              </div>
              {decoration === decorationOption.id && (
                <div className="flex-shrink-0 text-purple-500 text-xl">✓</div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {decoration && (
        <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <p className="text-sm text-purple-800">
            <strong>선택된 장식:</strong>{' '}
            {DECORATIONS.find((d) => d.id === decoration)?.name}
          </p>
        </div>
      )}
    </div>
  );
}
