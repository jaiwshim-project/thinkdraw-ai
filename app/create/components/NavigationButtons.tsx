'use client';

import { Button } from '@/components/ui/button';

interface NavigationButtonsProps {
  currentStep: number;
  totalSteps: number;
  canProceed: boolean;
  onPrev: () => void;
  onNext: () => void;
}

export function NavigationButtons({
  currentStep,
  totalSteps,
  canProceed,
  onPrev,
  onNext,
}: NavigationButtonsProps) {
  return (
    <div className="flex items-center justify-between gap-4 mt-8">
      <Button
        variant="outline"
        onClick={onPrev}
        disabled={currentStep === 1}
        className="min-w-[120px]"
      >
        ← 이전
      </Button>

      <Button
        onClick={onNext}
        disabled={!canProceed}
        className="min-w-[120px]"
      >
        {currentStep === totalSteps ? '완료' : '다음 →'}
      </Button>
    </div>
  );
}
