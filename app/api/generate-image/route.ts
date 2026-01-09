import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, size, apiKey, provider } = body;

    console.log('Generating image with prompt:', prompt);
    console.log('Image size:', size);
    console.log('Provider:', provider);

    // 유효성 검사
    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    if (!provider) {
      return NextResponse.json(
        { error: 'Provider is required' },
        { status: 400 }
      );
    }

    // API 키 확인
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key is required. Please set your API key in Settings.' },
        { status: 401 }
      );
    }

    // Gemini 선택 시 (현재 이미지 생성 미지원)
    if (provider === 'gemini') {
      return NextResponse.json(
        {
          error: 'Gemini 이미지 생성 기능은 준비 중입니다',
          details: 'Google Gemini API는 현재 텍스트 생성만 지원합니다. OpenAI (DALL-E 3)를 사용해주세요.'
        },
        { status: 501 } // Not Implemented
      );
    }

    // OpenAI DALL-E 3 처리
    if (provider === 'openai') {
      // API 키 형식 검증
      if (!apiKey.startsWith('sk-')) {
        return NextResponse.json(
          { error: 'Invalid API key format. OpenAI API keys should start with "sk-"' },
          { status: 401 }
        );
      }

      // OpenAI 클라이언트 초기화 (프론트엔드에서 받은 API 키 사용)
      const openai = new OpenAI({
        apiKey: apiKey,
      });

      // 사이즈 매핑 (DALL-E 3는 특정 사이즈만 지원)
      let dalleSize: '1024x1024' | '1024x1792' | '1792x1024' = '1024x1024';

      if (size === '16:9') {
        dalleSize = '1792x1024'; // 가로형
      } else if (size === '9:16') {
        dalleSize = '1024x1792'; // 세로형
      } else {
        dalleSize = '1024x1024'; // 정사각형
      }

      console.log('DALL-E size:', dalleSize);

      // DALL-E 3로 이미지 생성 (HD 품질)
      const response = await openai.images.generate({
        model: 'dall-e-3',
        prompt: prompt,
        n: 1,
        size: dalleSize,
        quality: 'hd', // HD 품질로 향상 (standard 대비 2배 비용, 더 선명하고 디테일함)
        style: 'natural',
      });

      const imageUrl = response.data[0]?.url;

      if (!imageUrl) {
        throw new Error('No image URL returned from OpenAI');
      }

      console.log('Image generated successfully:', imageUrl);

      return NextResponse.json({
        success: true,
        imageUrl: imageUrl,
        revisedPrompt: response.data[0]?.revised_prompt,
      });
    }

    // 지원하지 않는 제공자
    return NextResponse.json(
      { error: `Unsupported provider: ${provider}` },
      { status: 400 }
    );

  } catch (error: any) {
    console.error('Error generating image:', error);

    // OpenAI API 에러 코드별 처리
    let errorMessage = 'Failed to generate image';
    let errorDetails = error.message;
    let errorCode = error?.code;

    if (errorCode === 'billing_hard_limit_reached') {
      errorMessage = 'API 사용 한도 초과';
      errorDetails = 'OpenAI API 사용 한도가 초과되었습니다. 결제 정보를 업데이트하거나 다른 API 키를 사용해주세요.';
    } else if (errorCode === 'insufficient_quota') {
      errorMessage = 'API 크레딧 부족';
      errorDetails = 'OpenAI API 크레딧이 부족합니다. 결제 정보를 확인해주세요.';
    } else if (errorCode === 'invalid_api_key') {
      errorMessage = 'API 키 오류';
      errorDetails = 'API 키가 유효하지 않습니다. 설정 페이지에서 올바른 API 키를 입력해주세요.';
    }

    return NextResponse.json(
      {
        error: errorMessage,
        details: errorDetails,
        code: errorCode
      },
      { status: error?.status || 500 }
    );
  }
}
