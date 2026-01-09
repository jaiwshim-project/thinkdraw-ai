import type { StyleOption, ToolOption, SizeOption, AudienceOption, LanguageOption, DecorationOption } from '@/types';

// 표현 스타일 옵션
export const STYLES: StyleOption[] = [
  {
    id: 'sketchnote',
    name: '비주얼씽킹/스케치노트',
    description: '손글씨, 화살표, 아이콘을 활용한 사고 흐름 표현',
    example: '/Gemini_Generated_Image_b8efuib8efuib8ef.png',
  },
  {
    id: 'infographic',
    name: '인포그래픽',
    description: '구조화된 정보를 시각적으로 전달',
    example: '/Gemini_Generated_Image_jaiq35jaiq35jaiq.png',
  },
  {
    id: 'mindmap',
    name: '마인드맵',
    description: '중앙에서 방사형으로 확장되는 사고 구조',
    example: '/Gemini_Generated_Image_eqjceeeqjceeeqjc.png',
  },
  {
    id: 'conceptmap',
    name: '컨셉맵',
    description: '개념 간의 관계와 연결고리 표현',
    example: '/Gemini_Generated_Image_jkk81ujkk81ujkk8.png',
  },
  {
    id: 'data-viz',
    name: '데이터 시각화',
    description: '레이더 차트, 그래프, 비교표 등',
    example: '/Gemini_Generated_Image_w8xuidw8xuidw8xu.png',
  },
  {
    id: 'framework',
    name: '프레임워크/매트릭스',
    description: '2x2 매트릭스, 비교 테이블 등 전략적 구조',
    example: '/Gemini_Generated_Image_w8xuidw8xuidw8xu.png',
  },
  {
    id: 'process',
    name: '프로세스 맵',
    description: '단계별 흐름과 절차 시각화',
    example: '/Gemini_Generated_Image_spte9kspte9kspte.png',
  },
];

// 필기 도구 옵션
export const TOOLS: ToolOption[] = [
  // 잉크 기반
  {
    id: 'fountain-pen',
    name: '만년필',
    description: '고급스러운 질감과 개성 있는 필압',
    category: 'ink',
    icon: '🖋️',
  },
  {
    id: 'fine-liner',
    name: '파인라이너',
    description: '일정한 선, 선명한 윤곽선',
    category: 'ink',
    icon: '✒️',
  },
  {
    id: 'ballpoint',
    name: '볼펜/젤펜',
    description: '일상적이고 자연스러운 느낌',
    category: 'ink',
    icon: '🖊️',
  },
  // 고체 기반
  {
    id: 'pencil',
    name: '연필',
    description: '부드러운 명암과 스케치 느낌',
    category: 'solid',
    icon: '✏️',
  },
  {
    id: 'colored-pencil',
    name: '색연필',
    description: '정밀한 채색과 세밀한 강조',
    category: 'solid',
    icon: '🖍️',
  },
  {
    id: 'crayon',
    name: '크레용/파스텔',
    description: '부드러운 질감과 감성적 표현',
    category: 'solid',
    icon: '🖍️',
  },
  // 예술 도구
  {
    id: 'brush',
    name: '붓/붓펜',
    description: '역동적인 선과 예술적 감성',
    category: 'artistic',
    icon: '🖌️',
  },
  {
    id: 'marker',
    name: '마커',
    description: '선명한 색상과 강조 효과',
    category: 'artistic',
    icon: '🖍️',
  },
];

// 이미지 사이즈 옵션
export const SIZES: SizeOption[] = [
  {
    id: '16:9',
    name: '16:9 (가로)',
    description: '프레젠테이션 및 웹 콘텐츠에 최적화',
    use: 'PPT, 강의자료, 웹 메인 이미지',
    dimensions: { width: 1920, height: 1080 },
  },
  {
    id: '9:16',
    name: '9:16 (세로)',
    description: '모바일 세로 콘텐츠에 최적화',
    use: '유튜브 쇼츠, 인스타 릴스, 틱톡',
    dimensions: { width: 1080, height: 1920 },
  },
  {
    id: '1:1',
    name: '1:1 (정사각)',
    description: 'SNS 피드 및 카드뉴스에 최적화',
    use: '인스타 피드, 카드뉴스, 썸네일',
    dimensions: { width: 1080, height: 1080 },
  },
];

// 연령대 옵션
export const AGE_GROUPS: AudienceOption[] = [
  { id: 'teens', name: '10대', type: 'age' },
  { id: '20s', name: '20대', type: 'age' },
  { id: '30s', name: '30대', type: 'age' },
  { id: '40s', name: '40대', type: 'age' },
  { id: '50s', name: '50대', type: 'age' },
  { id: '60plus', name: '60대 이상', type: 'age' },
];

// 분야 옵션
export const FIELDS: AudienceOption[] = [
  { id: 'education', name: '교육', type: 'field' },
  { id: 'dental', name: '치과', type: 'field' },
  { id: 'medical', name: '의료', type: 'field' },
  { id: 'fashion', name: '패션', type: 'field' },
  { id: 'food', name: '음식', type: 'field' },
  { id: 'furniture', name: '가구', type: 'field' },
  { id: 'it', name: 'IT', type: 'field' },
  { id: 'business', name: '경영', type: 'field' },
  { id: 'consulting', name: '컨설팅', type: 'field' },
];

// 도구 카테고리 레이블
export const TOOL_CATEGORY_LABELS = {
  ink: '잉크 기반',
  solid: '고체 기반',
  artistic: '예술 도구',
};

// 언어 옵션
export const LANGUAGES: LanguageOption[] = [
  {
    id: 'korean',
    name: '한국어',
    description: '이미지 내 모든 텍스트가 한국어로 표시됩니다',
    flag: '🇰🇷',
  },
  {
    id: 'english',
    name: 'English',
    description: 'All text in the image will be displayed in English',
    flag: '🇺🇸',
  },
  {
    id: 'japanese',
    name: '日本語',
    description: '画像内のすべてのテキストが日本語で表示されます',
    flag: '🇯🇵',
  },
  {
    id: 'chinese',
    name: '中文',
    description: '图像中的所有文本将以中文显示',
    flag: '🇨🇳',
  },
];

// 장식 옵션
export const DECORATIONS: DecorationOption[] = [
  {
    id: 'jewel',
    name: '보석',
    description: '화려한 보석으로 테두리와 공간을 장식',
    icon: '💎',
  },
  {
    id: 'crystal',
    name: '크리스탈',
    description: '투명하고 반짝이는 크리스탈 장식',
    icon: '💠',
  },
  {
    id: 'gold',
    name: '금',
    description: '고급스러운 금빛 장식과 테두리',
    icon: '🟡',
  },
  {
    id: 'silver',
    name: '은',
    description: '우아한 은빛 장식과 테두리',
    icon: '⚪',
  },
  {
    id: 'animal-sticker',
    name: '귀여운 동물 스티커',
    description: '귀여운 동물 스티커로 테두리와 공간을 장식',
    icon: '🐻',
  },
  {
    id: 'flower',
    name: '예쁜 꽃',
    description: '예쁜 꽃과 들꽃으로 테두리와 공간을 장식',
    icon: '🌸',
  },
  {
    id: 'fruit',
    name: '예쁜 과일',
    description: '예쁜 과일들로 테두리와 공간을 장식',
    icon: '🍎',
  },
  {
    id: 'dinosaur',
    name: '공룡',
    description: '귀여운 공룡으로 테두리와 공간을 장식',
    icon: '🦕',
  },
];
