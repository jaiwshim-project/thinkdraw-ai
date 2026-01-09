'use client';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const STEP_LABELS = [
  '주제 입력',
  '청중 선택',
  '스타일 선택',
  '도구 선택',
  '사이즈 선택',
  '프롬프팅',
  '언어 선택',
  '장식 선택',
  '결과 확인',
];

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="w-full max-w-4xl mx-auto mb-6">
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
          <div key={step} className="flex items-center flex-1">
            {/* Step Circle */}
            <div className="flex flex-col items-center">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-semibold transition-all text-sm shadow-sm ${
                  step < currentStep
                    ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white'
                    : step === currentStep
                    ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white ring-4 ring-blue-200 scale-110'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                {step < currentStep ? '✓' : step}
              </div>
              <span
                className={`text-xs mt-1.5 font-medium hidden sm:block ${
                  step === currentStep ? 'text-gradient font-semibold' : 'text-gray-500'
                }`}
              >
                {STEP_LABELS[step - 1]}
              </span>
            </div>

            {/* Connector Line */}
            {step < totalSteps && (
              <div
                className={`flex-1 h-0.5 mx-1.5 sm:mx-2 transition-all ${
                  step < currentStep ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
