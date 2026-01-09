// 타겟 청중 타입
export type AudienceType = 'age' | 'field';

export interface Audience {
  type: AudienceType;
  value: string;
}

// 스타일 타입
export type StyleType =
  | 'sketchnote'
  | 'infographic'
  | 'mindmap'
  | 'conceptmap'
  | 'data-viz'
  | 'framework'
  | 'process';

// 도구 타입
export type ToolType =
  | 'fountain-pen'
  | 'fine-liner'
  | 'ballpoint'
  | 'pencil'
  | 'colored-pencil'
  | 'crayon'
  | 'brush'
  | 'marker';

// 사이즈 타입
export type SizeType = '16:9' | '9:16' | '1:1';

// 언어 타입
export type LanguageType = 'korean' | 'english' | 'japanese' | 'chinese';

// 장식 타입
export type DecorationType = 'jewel' | 'crystal' | 'gold' | 'silver';

// 선택 옵션 인터페이스
export interface SelectOption {
  id: string;
  name: string;
  description: string;
  icon?: string;
}

// 스타일 옵션
export interface StyleOption extends SelectOption {
  id: StyleType;
  example?: string; // 예시 이미지 경로
}

// 도구 옵션
export interface ToolOption extends SelectOption {
  id: ToolType;
  category: 'ink' | 'solid' | 'artistic';
}

// 사이즈 옵션
export interface SizeOption extends SelectOption {
  id: SizeType;
  use: string; // 활용 용도
  dimensions?: { width: number; height: number };
}

// 청중 옵션
export interface AudienceOption {
  id: string;
  name: string;
  type: AudienceType;
}

// 언어 옵션
export interface LanguageOption extends SelectOption {
  id: LanguageType;
  flag?: string; // 국기 이모지
}

// 장식 옵션
export interface DecorationOption extends SelectOption {
  id: DecorationType;
  icon?: string; // 아이콘 이모지
}
