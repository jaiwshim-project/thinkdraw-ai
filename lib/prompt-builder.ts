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
