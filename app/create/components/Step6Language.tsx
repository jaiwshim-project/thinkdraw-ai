'use client';

import type { LanguageType } from '@/types';
import { LANGUAGES } from '@/lib/constants';
import { Card } from '@/components/ui/card';

interface Step6LanguageProps {
  language: LanguageType | null;
  onLanguageChange: (language: LanguageType) => void;
  onNext?: () => void;
}

export function Step6Language({ language, onLanguageChange, onNext }: Step6LanguageProps) {
  const handleDoubleClick = (selectedLanguage: LanguageType) => {
    onLanguageChange(selectedLanguage);
    if (onNext) {
      setTimeout(() => onNext(), 200);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">이미지 언어 선택</h2>
        <p className="text-base text-gray-600">
          이미지 내에 표시될 텍스트의 언어를 선택하세요
        </p>
      </div>

      <div className="grid grid-cols-4 gap-2 mt-6">
        {LANGUAGES.map((languageOption) => (
          <Card
            key={languageOption.id}
            className={`p-3 cursor-pointer transition-all hover:shadow-lg ${
              language === languageOption.id
                ? 'border-2 border-blue-500 bg-blue-50'
                : 'border border-gray-200 hover:border-blue-300'
            }`}
            onClick={() => onLanguageChange(languageOption.id)}
            onDoubleClick={() => handleDoubleClick(languageOption.id)}
          >
            <div className="text-center space-y-2">
              <div className="text-3xl">
                {languageOption.flag}
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-semibold text-gray-900">
                  {languageOption.name}
                </h3>
                <p className="text-xs text-gray-600">
                  {languageOption.description}
                </p>
              </div>
              {language === languageOption.id && (
                <div className="text-blue-500 text-lg">✓</div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {language && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-800">
            <strong>선택:</strong>{' '}
            {LANGUAGES.find((l) => l.id === language)?.name}
          </p>
        </div>
      )}
    </div>
  );
}
