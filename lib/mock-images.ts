import type { StyleType, SizeType } from '@/types';

/**
 * Mock 이미지 생성
 * 실제로는 AI API를 호출하지만, MVP에서는 placeholder 이미지 반환
 */
export function getMockImage(style: StyleType, size: SizeType): string {
  console.log('getMockImage called with:', { style, size });

  // 스타일별 이미지 매핑 (실제 Gemini 생성 이미지 사용)
  const styleImageMap: Record<StyleType, Record<SizeType, string>> = {
    sketchnote: {
      '16:9': '/Gemini_Generated_Image_jaiq35jaiq35jaiq.png',
      '9:16': '/Gemini_Generated_Image_6p1sb06p1sb06p1s.png',
      '1:1': '/Gemini_Generated_Image_b8efuib8efuib8ef.png',
    },
    infographic: {
      '16:9': '/Gemini_Generated_Image_eqjceeeqjceeeqjc.png',
      '9:16': '/Gemini_Generated_Image_gc2f3mgc2f3mgc2f.png',
      '1:1': '/Gemini_Generated_Image_gh6jz8gh6jz8gh6j.png',
    },
    mindmap: {
      '16:9': '/Gemini_Generated_Image_jfemhkjfemhkjfem.png',
      '9:16': '/Gemini_Generated_Image_jkk81ujkk81ujkk8.png',
      '1:1': '/Gemini_Generated_Image_ns1zd2ns1zd2ns1z.png',
    },
    conceptmap: {
      '16:9': '/Gemini_Generated_Image_spte9kspte9kspte.png',
      '9:16': '/Gemini_Generated_Image_tucf9ntucf9ntucf.png',
      '1:1': '/Gemini_Generated_Image_v0oon0v0oon0v0oo.png',
    },
    'data-viz': {
      '16:9': '/Gemini_Generated_Image_w8xuidw8xuidw8xu.png',
      '9:16': '/Gemini_Generated_Image_jaiq35jaiq35jaiq.png',
      '1:1': '/Gemini_Generated_Image_6p1sb06p1sb06p1s.png',
    },
    framework: {
      '16:9': '/Gemini_Generated_Image_b8efuib8efuib8ef.png',
      '9:16': '/Gemini_Generated_Image_eqjceeeqjceeeqjc.png',
      '1:1': '/Gemini_Generated_Image_gc2f3mgc2f3mgc2f.png',
    },
    process: {
      '16:9': '/Gemini_Generated_Image_gh6jz8gh6jz8gh6j.png',
      '9:16': '/Gemini_Generated_Image_jfemhkjfemhkjfem.png',
      '1:1': '/Gemini_Generated_Image_jkk81ujkk81ujkk8.png',
    },
  };

  // 스타일과 사이즈에 맞는 이미지 선택
  const imageUrl = styleImageMap[style]?.[size] || styleImageMap.sketchnote['16:9'];

  console.log('Selected Gemini image:', imageUrl);
  return imageUrl;
}

/**
 * 스타일 이름 가져오기
 */
function getStyleName(style: StyleType): string {
  const names: Record<StyleType, string> = {
    sketchnote: 'Sketchnote',
    infographic: 'Infographic',
    mindmap: 'Mind Map',
    conceptmap: 'Concept Map',
    'data-viz': 'Data Visualization',
    framework: 'Framework',
    process: 'Process Map',
  };

  return names[style] || 'Visual';
}

/**
 * Mock 이미지 다운로드
 * 실제로는 생성된 이미지를 다운로드하지만, MVP에서는 placeholder 다운로드
 */
export function downloadMockImage(imageUrl: string, filename: string): void {
  // 브라우저에서 이미지 다운로드
  const link = document.createElement('a');
  link.href = imageUrl;
  link.download = filename || 'thinkdraw-image.png';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * 실제 AI 이미지 생성 함수 (향후 구현)
 * Phase 2에서 DALL-E 또는 Midjourney API 연동
 */
export async function generateImageWithAI(
  prompt: string,
  style: StyleType,
  size: SizeType
): Promise<string> {
  // TODO: Phase 2에서 실제 AI API 호출 구현
  // 현재는 Mock 이미지 반환
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getMockImage(style, size));
    }, 2000);
  });
}
