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
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold text-gray-900">이미지 언어 선택</h2>
        <p className="text-lg text-gray-600">
          이미지 내에 표시될 텍스트의 언어를 선택하세요
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
        {LANGUAGES.map((languageOption) => (
          <Card
            key={languageOption.id}
            className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
              language === languageOption.id
                ? 'border-2 border-blue-500 bg-blue-50'
                : 'border border-gray-200 hover:border-blue-300'
            }`}
            onClick={() => onLanguageChange(languageOption.id)}
            onDoubleClick={() => handleDoubleClick(languageOption.id)}
          >
            <div className="flex items-start gap-4">
              <div className="text-4xl flex-shrink-0">
                {languageOption.flag}
              </div>
              <div className="flex-1 space-y-2">
                <h3 className="text-xl font-semibold text-gray-900">
                  {languageOption.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {languageOption.description}
                </p>
              </div>
              {language === languageOption.id && (
                <div className="flex-shrink-0 text-blue-500 text-xl">✓</div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {language && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>선택된 언어:</strong>{' '}
            {LANGUAGES.find((l) => l.id === language)?.name}
          </p>
        </div>
      )}
    </div>
  );
}
