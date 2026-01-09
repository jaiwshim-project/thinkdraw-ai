import { create } from 'zustand';
import type { Audience, StyleType, ToolType, SizeType, LanguageType, DecorationType } from '@/types';

interface CreateState {
  // 현재 단계 (1-9)
  currentStep: number;

  // 단계별 데이터
  topic: string;
  topicDetail: string;
  audience: Audience | null;
  style: StyleType | null;
  tool: ToolType | null;
  size: SizeType | null;
  refinedPrompt: string; // Step 6: AI가 생성한 프롬프트 + 사용자 수정
  language: LanguageType | null;
  decoration: DecorationType | null;

  // 생성된 프롬프트
  generatedPrompt: string;

  // 생성된 이미지 (Mock 또는 실제)
  generatedImage: string | null;

  // Actions
  setTopic: (topic: string, detail?: string) => void;
  setAudience: (audience: Audience) => void;
  setStyle: (style: StyleType) => void;
  setTool: (tool: ToolType) => void;
  setSize: (size: SizeType) => void;
  setRefinedPrompt: (prompt: string) => void;
  setLanguage: (language: LanguageType) => void;
  setDecoration: (decoration: DecorationType) => void;
  setGeneratedPrompt: (prompt: string) => void;
  setGeneratedImage: (image: string) => void;

  // 단계 이동
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;

  // 초기화
  reset: () => void;

  // 유효성 검증
  canProceedToNextStep: () => boolean;
}

const initialState = {
  currentStep: 1,
  topic: '',
  topicDetail: '',
  audience: null,
  style: null,
  tool: null,
  size: null,
  refinedPrompt: '',
  language: null,
  decoration: null,
  generatedPrompt: '',
  generatedImage: null,
};

export const useCreateStore = create<CreateState>((set, get) => ({
  ...initialState,

  setTopic: (topic, detail = '') =>
    set({ topic, topicDetail: detail }),

  setAudience: (audience) =>
    set({ audience }),

  setStyle: (style) =>
    set({ style }),

  setTool: (tool) =>
    set({ tool }),

  setSize: (size) =>
    set({ size }),

  setRefinedPrompt: (prompt) =>
    set({ refinedPrompt: prompt }),

  setLanguage: (language) =>
    set({ language }),

  setDecoration: (decoration) =>
    set({ decoration }),

  setGeneratedPrompt: (prompt) =>
    set({ generatedPrompt: prompt }),

  setGeneratedImage: (image) =>
    set({ generatedImage: image }),

  nextStep: () => {
    const state = get();
    if (state.canProceedToNextStep() && state.currentStep < 9) {
      set({ currentStep: state.currentStep + 1 });
    }
  },

  prevStep: () => {
    const { currentStep } = get();
    if (currentStep > 1) {
      set({ currentStep: currentStep - 1 });
    }
  },

  goToStep: (step) => {
    if (step >= 1 && step <= 9) {
      set({ currentStep: step });
    }
  },

  reset: () =>
    set(initialState),

  canProceedToNextStep: () => {
    const state = get();

    switch (state.currentStep) {
      case 1: // 주제 입력
        return state.topic.trim().length > 0;
      case 2: // 청중 선택
        return state.audience !== null;
      case 3: // 스타일 선택
        return state.style !== null;
      case 4: // 도구 선택
        return state.tool !== null;
      case 5: // 사이즈 선택
        return state.size !== null;
      case 6: // 프롬프팅 수정
        return state.refinedPrompt.trim().length > 0;
      case 7: // 언어 선택
        return state.language !== null;
      case 8: // 장식 선택
        return state.decoration !== null;
      case 9: // 결과 화면
        return true;
      default:
        return false;
    }
  },
}));
