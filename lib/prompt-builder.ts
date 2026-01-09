import type { Audience, StyleType, ToolType, SizeType, LanguageType, DecorationType } from '@/types';
import { AGE_GROUPS, FIELDS, STYLES, TOOLS, SIZES, LANGUAGES, DECORATIONS } from './constants';

interface PromptBuilderInput {
  topic: string;
  topicDetail?: string;
  audience: Audience;
  style: StyleType;
  tool: ToolType;
  size: SizeType;
  language: LanguageType;
  decoration: DecorationType;
}

/**
 * 청중 정보를 설명 문구로 변환
 */
function getAudienceDescription(audience: Audience): string {
  if (audience.type === 'age') {
    const ageGroup = AGE_GROUPS.find((g) => g.id === audience.value);
    return ageGroup?.name || '일반 청중';
  } else {
    const field = FIELDS.find((f) => f.id === audience.value);
    return `${field?.name || '일반'} 분야 전문가`;
  }
}

/**
 * 스타일별 시각적 지시 생성
 */
function getStyleInstructions(style: StyleType): string {
  const styleOption = STYLES.find((s) => s.id === style);
  if (!styleOption) return '';

  const instructions: Record<StyleType, string> = {
    sketchnote: `Create a hand-drawn sketchnote visual summary.
Use a pristine white paper background (no lines).
The art style should be 'graphic recording' or 'visual thinking'.
Center the main concept with a bold ICON or SYMBOL.
Surround with simple doodles, business icons, stick figures, graphs, and visual metaphors.
Use arrows, numbers (1,2,3), and connecting lines to show flow.
MINIMIZE TEXT - use only SHORT KEYWORDS (1-3 words) in bold, clear handwriting.
Focus on VISUAL STORYTELLING with illustrations, not text explanations.`,

    infographic: `Create a structured infographic layout.
Use clean, professional design with clear visual hierarchies.
PRIORITIZE icons, charts, graphs, and visual elements over text.
Use a grid-based layout with consistent spacing.
Use SHORT LABELS and NUMBERS - avoid paragraphs.
Emphasize key data with color, size, and visual contrast.`,

    mindmap: `Create a radial mind map visualization.
Place the central concept (as ICON or SYMBOL) in the middle.
Branch out main ideas in different directions.
Use colors to differentiate branches.
Use ICONS, SYMBOLS, and 1-2 word KEYWORDS only.
Show relationships with connecting lines.`,

    conceptmap: `Create a concept map showing relationships between ideas.
Use nodes with ICONS/SYMBOLS for concepts.
Use labeled arrows with SHORT phrases (1-3 words) for relationships.
Show hierarchies and connections clearly.
Use different shapes for different concept types.
MINIMIZE TEXT - focus on visual structure.`,

    'data-viz': `Create a data visualization dashboard.
Include charts, graphs, and comparative tables.
Use radar charts, bar graphs, or line charts.
Show trends and comparisons with VISUAL DATA, not text.
Use color coding and NUMBERS for categories.
MINIMIZE text labels - use legends and short keywords.`,

    framework: `Create a strategic framework or matrix.
Use 2x2 matrices, comparison tables, or quadrant diagrams.
Show clear axes with SHORT LABELS (1-2 words).
Include ICONS or SYMBOLS in each quadrant.
Use professional business diagram style with minimal text.`,

    process: `Create a process flow diagram.
Show sequential steps with NUMBERED STAGES (1,2,3...).
Use arrows to indicate flow direction.
Use ICONS/SYMBOLS for each step, not paragraphs.
Include decision diamonds with YES/NO branches.
Use horizontal or timeline flow layout with MINIMAL TEXT.`,
  };

  return instructions[style] || instructions.sketchnote;
}

/**
 * 도구별 렌더링 스타일 지시 생성
 */
function getToolInstructions(tool: ToolType): string {
  const toolOption = TOOLS.find((t) => t.id === tool);
  if (!toolOption) return '';

  const instructions: Record<ToolType, string> = {
    'fountain-pen': 'using fountain pen (만년필) for elegant, varied line weight with ink texture',
    'fine-liner': 'using fine-liner pen for consistent, clean lines with sharp details',
    ballpoint: 'using ballpoint pen for casual, everyday sketch style',
    pencil: 'using pencil for soft, sketch-like appearance with shading',
    'colored-pencil': 'using colored pencils for detailed, precise coloring',
    crayon: 'using crayon or pastel for soft, textured coloring',
    brush: 'using brush or brush pen for dynamic, calligraphic strokes',
    marker: 'using markers for bold, vibrant colors and emphasis',
  };

  return instructions[tool] || instructions['fine-liner'];
}

/**
 * 사이즈별 레이아웃 지시 생성
 */
function getSizeInstructions(size: SizeType): string {
  const sizeOption = SIZES.find((s) => s.id === size);
  if (!sizeOption) return '';

  const instructions: Record<SizeType, string> = {
    '16:9': 'Format: 16:9 landscape orientation for presentations and web content. Optimize for horizontal layout.',
    '9:16': 'Format: 9:16 vertical orientation for mobile content and social media stories. Optimize for vertical scrolling.',
    '1:1': 'Format: 1:1 square format for social media posts. Optimize for centered, balanced composition.',
  };

  return instructions[size] || instructions['16:9'];
}

/**
 * 언어별 텍스트 지시 생성
 *
 * DALL-E 3는 영어 텍스트가 가장 잘 나오므로,
 * 핵심 키워드는 영어로, 개념 설명은 심볼/아이콘 위주로 표현
 */
function getLanguageInstructions(language: LanguageType): string {
  const languageOption = LANGUAGES.find((l) => l.id === language);
  if (!languageOption) return '';

  const instructions: Record<LanguageType, string> = {
    korean: `Use minimal text - focus on VISUAL SYMBOLS, ICONS, and ILLUSTRATIONS to explain concepts.
If text is necessary, use SHORT ENGLISH KEYWORDS (1-3 words maximum) in clear, bold fonts.
Use arrows, numbers, and visual metaphors instead of long text.
Make it universally understandable through visuals, not text.`,

    english: 'Use clear, short English text. Keep labels and titles concise (1-3 words). Focus on visual communication with minimal text.',

    japanese: `Use minimal text - focus on VISUAL SYMBOLS, ICONS, and ILLUSTRATIONS.
If text is needed, use SHORT ENGLISH KEYWORDS in clear fonts.
Make it visually understandable with minimal text reliance.`,

    chinese: `Use minimal text - focus on VISUAL SYMBOLS, ICONS, and ILLUSTRATIONS.
If text is needed, use SHORT ENGLISH KEYWORDS in clear fonts.
Prioritize visual communication over text.`,
  };

  return instructions[language] || instructions.korean;
}

/**
 * 장식 방법별 지시 생성
 */
function getDecorationInstructions(decoration: DecorationType): string {
  const decorationOption = DECORATIONS.find((d) => d.id === decoration);
  if (!decorationOption) return '';

  const instructions: Record<DecorationType, string> = {
    jewel: 'Decorate borders and empty spaces with colorful, sparkling jewels and gemstones. Add elegant, luxurious decorative elements.',
    crystal: 'Decorate borders and empty spaces with transparent, shimmering crystals. Add light, ethereal decorative elements.',
    gold: 'Decorate borders and empty spaces with golden ornaments and accents. Add luxurious, premium gold-themed decorative elements.',
    silver: 'Decorate borders and empty spaces with silver ornaments and accents. Add elegant, sophisticated silver-themed decorative elements.',
  };

  return instructions[decoration] || instructions.jewel;
}

/**
 * 메인 프롬프트 생성 함수
 */
export function buildPrompt(input: PromptBuilderInput): string {
  const { topic, topicDetail, audience, style, tool, size, language, decoration } = input;

  // 1. 기본 프롬프트 (주제 및 청중)
  let prompt = `Identify and explain ${topic}.`;

  if (topicDetail) {
    prompt += `\n\nAdditional context: ${topicDetail}`;
  }

  prompt += `\nBe specific and to the point.`;
  prompt += `\nProvide relevant examples.`;
  prompt += `\nAudience is ${getAudienceDescription(audience)}.`;

  // 2. 스타일 지시
  prompt += `\n\n${getStyleInstructions(style)}`;

  // 3. 도구 렌더링 스타일
  prompt += `\n${getToolInstructions(tool)}`;

  // 4. 색상 지시
  prompt += `\nUse colored markers (specifically teal, orange, and muted red) for simple shading and accents.`;

  // 5. 사이즈 레이아웃
  prompt += `\n\n${getSizeInstructions(size)}`;

  // 6. 언어 지시
  prompt += `\n\n${getLanguageInstructions(language)}`;

  // 7. 장식 방법
  prompt += `\n${getDecorationInstructions(decoration)}`;

  // 8. DALL-E 3 최적화 지시사항
  prompt += `\n\nIMPORTANT - DALL-E 3 OPTIMIZATION:`;
  prompt += `\n- Use MINIMAL TEXT (only essential keywords in English)`;
  prompt += `\n- Focus on VISUAL COMMUNICATION: icons, symbols, illustrations, metaphors`;
  prompt += `\n- Keep any text SHORT, BOLD, and LEGIBLE (1-3 words maximum per label)`;
  prompt += `\n- Use numbers (1,2,3) and arrows instead of sentences`;
  prompt += `\n- Ensure high contrast and clarity for easy reading`;
  prompt += `\n- Make it universally understandable without relying on text`;

  // 9. 최종 품질 요구사항
  prompt += `\n\nEnsure the visual is CLEAR, ORGANIZED, and PROFESSIONAL.`;
  prompt += `\nAvoid clutter and maintain excellent visual hierarchy.`;
  prompt += `\nCreate a publication-quality image with crisp details.`;

  return prompt.trim();
}

/**
 * 프롬프트 미리보기 생성 (간략 버전)
 */
export function buildPromptPreview(input: Partial<PromptBuilderInput>): string {
  if (!input.topic) return '주제를 입력하세요...';

  let preview = `주제: ${input.topic}`;

  if (input.audience) {
    preview += `\n청중: ${getAudienceDescription(input.audience)}`;
  }

  if (input.style) {
    const styleOption = STYLES.find((s) => s.id === input.style);
    preview += `\n스타일: ${styleOption?.name}`;
  }

  if (input.tool) {
    const toolOption = TOOLS.find((t) => t.id === input.tool);
    preview += `\n도구: ${toolOption?.name}`;
  }

  if (input.size) {
    const sizeOption = SIZES.find((s) => s.id === input.size);
    preview += `\n사이즈: ${sizeOption?.name}`;
  }

  if (input.language) {
    const languageOption = LANGUAGES.find((l) => l.id === input.language);
    preview += `\n언어: ${languageOption?.name}`;
  }

  if (input.decoration) {
    const decorationOption = DECORATIONS.find((d) => d.id === input.decoration);
    preview += `\n장식: ${decorationOption?.name}`;
  }

  return preview;
}

/**
 * 주제와 청중만으로 초기 프롬프트 생성 (Step 3용)
 */
export function buildInitialPrompt(topic: string, topicDetail: string, audience: Audience): string {
  let prompt = `주제: ${topic}\n`;

  if (topicDetail) {
    prompt += `상세: ${topicDetail}\n\n`;
  } else {
    prompt += '\n';
  }

  const audienceDesc = getAudienceDescription(audience);
  prompt += `타겟 청중: ${audienceDesc}\n\n`;

  prompt += `AI가 생성한 풍부한 설명:\n`;
  prompt += `${topic}는 ${audienceDesc}를 위한 중요한 개념입니다. `;

  if (topicDetail) {
    prompt += `${topicDetail}\n\n`;
  } else {
    prompt += `이 주제는 다양한 관점에서 이해할 수 있으며, 실생활에 직접 적용 가능한 실용적인 지식입니다.\n\n`;
  }

  prompt += `핵심 포인트:\n`;
  prompt += `1. 기본 개념과 정의를 명확히 이해\n`;
  prompt += `2. 실제 적용 사례와 예시 학습\n`;
  prompt += `3. 단계별 실행 방법 습득\n`;
  prompt += `4. 예상되는 결과와 효과 파악\n\n`;

  prompt += `이를 통해 ${audienceDesc}는 ${topic}를 효과적으로 활용할 수 있게 됩니다.`;

  return prompt;
}

/**
 * 영어 프롬프트를 한글로 번역
 */
export function translatePromptToKorean(input: PromptBuilderInput): string {
  const { topic, topicDetail, audience, style, tool, size, language, decoration } = input;

  const styleName = STYLES.find((s) => s.id === style)?.name || '시각화';
  const toolName = TOOLS.find((t) => t.id === tool)?.name || '필기 도구';
  const sizeName = SIZES.find((s) => s.id === size)?.name || '16:9';
  const languageName = LANGUAGES.find((l) => l.id === language)?.name || '한국어';
  const decorationName = DECORATIONS.find((d) => d.id === decoration)?.name || '장식';

  let koreanPrompt = `📋 주제: ${topic}`;

  if (topicDetail) {
    koreanPrompt += `\n\n💡 추가 설명:\n${topicDetail}`;
  }

  koreanPrompt += `\n\n👥 대상 청중: ${getAudienceDescription(audience)}`;
  koreanPrompt += `\n구체적이고 명확하게 설명하며, 관련된 예시를 제공합니다.`;

  koreanPrompt += `\n\n🎨 시각화 스타일: ${styleName}`;

  // 스타일별 설명
  const styleDescriptions: Record<StyleType, string> = {
    sketchnote: '손으로 그린 스케치노트 형식으로 시각화합니다.\n- 깨끗한 흰색 배경 사용\n- 중심 개념을 굵은 아이콘/심볼로 표현\n- 간단한 낙서, 비즈니스 아이콘, 막대 인간, 그래프, 시각적 은유 활용\n- 화살표, 숫자(1,2,3), 연결선으로 흐름 표시\n- 최소한의 텍스트 - 짧은 키워드만 사용',
    infographic: '구조화된 인포그래픽 레이아웃을 만듭니다.\n- 깔끔하고 전문적인 디자인\n- 텍스트보다 아이콘, 차트, 그래프 우선\n- 그리드 기반 레이아웃\n- 짧은 레이블과 숫자만 사용\n- 색상, 크기, 대비로 핵심 강조',
    mindmap: '방사형 마인드맵을 만듭니다.\n- 중앙에 핵심 개념(아이콘/심볼)\n- 사방으로 주요 아이디어 분기\n- 색상으로 분기 구분\n- 아이콘, 심볼, 1-2단어 키워드만 사용\n- 연결선으로 관계 표시',
    conceptmap: '개념 간 관계를 보여주는 개념도를 만듭니다.\n- 개념별 아이콘/심볼 사용\n- 짧은 문구(1-3단어)로 관계 표시\n- 계층과 연결 명확히 표현\n- 개념 유형별 다른 모양 사용',
    'data-viz': '데이터 시각화 대시보드를 만듭니다.\n- 차트, 그래프, 비교 표 포함\n- 레이더 차트, 막대 그래프, 선 그래프 활용\n- 텍스트가 아닌 시각적 데이터로 표현\n- 색상 코딩과 숫자로 카테고리 구분',
    framework: '전략적 프레임워크/매트릭스를 만듭니다.\n- 2x2 매트릭스, 비교표, 사분면 다이어그램\n- 짧은 레이블(1-2단어)의 명확한 축\n- 각 사분면에 아이콘/심볼 포함\n- 최소한의 텍스트로 전문적 비즈니스 다이어그램',
    process: '프로세스 흐름도를 만듭니다.\n- 번호가 매겨진 단계(1,2,3...)로 순차 표시\n- 화살표로 흐름 방향 표시\n- 각 단계별 아이콘/심볼 사용\n- YES/NO 분기가 있는 결정 다이아몬드 포함\n- 최소 텍스트의 가로형/타임라인 레이아웃',
  };

  koreanPrompt += `\n${styleDescriptions[style]}`;

  koreanPrompt += `\n\n✏️ 필기 도구: ${toolName}`;

  const toolDescriptions: Record<ToolType, string> = {
    'fountain-pen': '만년필로 우아하고 다양한 선 굵기와 잉크 질감 표현',
    'fine-liner': '파인라이너 펜으로 일관되고 깔끔한 선과 선명한 디테일',
    ballpoint: '볼펜으로 캐주얼하고 일상적인 스케치 스타일',
    pencil: '연필로 부드러운 스케치 느낌과 음영 표현',
    'colored-pencil': '색연필로 섬세하고 정교한 색상 표현',
    crayon: '크레용/파스텔로 부드럽고 질감있는 색상 표현',
    brush: '붓/붓펜으로 역동적이고 서예적인 획',
    marker: '마커로 굵고 생동감있는 색상과 강조',
  };

  koreanPrompt += `\n${toolDescriptions[tool]}`;
  koreanPrompt += `\n청록색(teal), 주황색(orange), 차분한 빨강색(muted red) 마커로 간단한 음영과 강조 표현`;

  koreanPrompt += `\n\n📐 이미지 사이즈: ${sizeName}`;

  const sizeDescriptions: Record<SizeType, string> = {
    '16:9': '16:9 가로 방향 - 프레젠테이션과 웹 콘텐츠에 최적화된 가로 레이아웃',
    '9:16': '9:16 세로 방향 - 모바일 콘텐츠와 소셜미디어 스토리에 최적화된 세로 스크롤 레이아웃',
    '1:1': '1:1 정사각형 - 소셜미디어 게시물에 최적화된 중앙 정렬, 균형잡힌 구성',
  };

  koreanPrompt += `\n${sizeDescriptions[size]}`;

  koreanPrompt += `\n\n🌐 언어 설정: ${languageName}`;
  koreanPrompt += `\n최소한의 텍스트 사용 - 시각적 심볼, 아이콘, 일러스트레이션으로 개념 설명`;
  koreanPrompt += `\n필요한 경우 짧은 영어 키워드(최대 1-3단어)를 명확하고 굵은 글꼴로 표시`;
  koreanPrompt += `\n화살표, 숫자, 시각적 은유를 긴 텍스트 대신 사용`;
  koreanPrompt += `\n텍스트에 의존하지 않고 시각적으로 보편적으로 이해 가능하게 제작`;

  koreanPrompt += `\n\n💎 장식 스타일: ${decorationName}`;

  const decorationDescriptions: Record<DecorationType, string> = {
    jewel: '테두리와 빈 공간을 화려하고 반짝이는 보석으로 장식. 우아하고 고급스러운 장식 요소 추가',
    crystal: '테두리와 빈 공간을 투명하고 반짝이는 크리스탈로 장식. 가볍고 영롱한 장식 요소 추가',
    gold: '테두리와 빈 공간을 금색 장식과 액센트로 꾸밈. 고급스럽고 프리미엄한 금색 테마 장식',
    silver: '테두리와 빈 공간을 은색 장식과 액센트로 꾸밈. 우아하고 세련된 은색 테마 장식',
  };

  koreanPrompt += `\n${decorationDescriptions[decoration]}`;

  koreanPrompt += `\n\n✨ 품질 요구사항:`;
  koreanPrompt += `\n• 최소한의 텍스트 (영어로 필수 키워드만)`;
  koreanPrompt += `\n• 시각적 커뮤니케이션에 집중: 아이콘, 심볼, 일러스트, 은유`;
  koreanPrompt += `\n• 모든 텍스트는 짧고 굵고 읽기 쉽게 (레이블당 최대 1-3단어)`;
  koreanPrompt += `\n• 문장 대신 숫자(1,2,3)와 화살표 사용`;
  koreanPrompt += `\n• 높은 대비와 명료성으로 쉽게 읽을 수 있게`;
  koreanPrompt += `\n• 텍스트에 의존하지 않고 보편적으로 이해 가능하게`;
  koreanPrompt += `\n\n시각물은 명확하고 조직적이며 전문적이어야 합니다.`;
  koreanPrompt += `\n어수선함을 피하고 훌륭한 시각적 계층 구조를 유지합니다.`;
  koreanPrompt += `\n선명한 디테일의 출판 품질 이미지를 만듭니다.`;

  return koreanPrompt;
}
