'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AGE_GROUPS, FIELDS } from '@/lib/constants';
import type { Audience } from '@/types';

interface Step2AudienceProps {
  audience: Audience | null;
  onAudienceChange: (audience: Audience) => void;
  onNext?: () => void;
}

export function Step2Audience({ audience, onAudienceChange, onNext }: Step2AudienceProps) {
  const [activeTab, setActiveTab] = useState<'age' | 'field'>(audience?.type || 'age');

  const handleSelect = (type: 'age' | 'field', value: string) => {
    onAudienceChange({ type, value });
  };

  const handleDoubleClick = (type: 'age' | 'field', value: string) => {
    onAudienceChange({ type, value });
    if (onNext) {
      setTimeout(() => onNext(), 200);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>타겟 청중을 선택하세요</CardTitle>
          <CardDescription>
            연령대 또는 분야를 선택하면 청중에 맞는 표현으로 이미지가 생성됩니다
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Tab 선택 */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab('age')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                activeTab === 'age'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              연령대 기반
            </button>
            <button
              onClick={() => setActiveTab('field')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                activeTab === 'field'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              분야 기반
            </button>
          </div>

          {/* 연령대 선택 */}
          {activeTab === 'age' && (
            <div className="grid grid-cols-3 gap-4">
              {AGE_GROUPS.map((group) => (
                <button
                  key={group.id}
                  onClick={() => handleSelect('age', group.id)}
                  onDoubleClick={() => handleDoubleClick('age', group.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    audience?.type === 'age' && audience?.value === group.id
                      ? 'border-primary bg-primary/5 shadow-sm'
                      : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'
                  }`}
                >
                  <div className="text-lg font-semibold">{group.name}</div>
                </button>
              ))}
            </div>
          )}

          {/* 분야 선택 */}
          {activeTab === 'field' && (
            <div className="grid grid-cols-3 gap-4">
              {FIELDS.map((field) => (
                <button
                  key={field.id}
                  onClick={() => handleSelect('field', field.id)}
                  onDoubleClick={() => handleDoubleClick('field', field.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    audience?.type === 'field' && audience?.value === field.id
                      ? 'border-primary bg-primary/5 shadow-sm'
                      : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'
                  }`}
                >
                  <div className="text-lg font-semibold">{field.name}</div>
                </button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
