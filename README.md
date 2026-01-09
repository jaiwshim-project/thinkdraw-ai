# ThinkDraw AI (씽크드로우 AI)

**생각과 자료를 입력하면 1페이지 비주얼이 완성됩니다!**

ThinkDraw AI는 당신의 생각을 설명 가능한 이미지로 변환하는 AI 기반 시각화 도구입니다.

![ThinkDraw AI](./thinkdraw-logo.png)

## 주요 기능

- 🎨 **9단계 맞춤형 이미지 생성**
  - 주제 입력 → 타겟 청중 → 스타일 → 프롬프트 정제 → 도구 → 사이즈 → 언어 → 장식 → 이미지 생성

- 🖼️ **7가지 표현 스타일**
  - 비주얼씽킹/스케치노트
  - 인포그래픽
  - 마인드맵
  - 컨셉맵
  - 데이터 시각화
  - 프레임워크/매트릭스
  - 프로세스 맵

- 🎯 **다양한 활용 분야**
  - 교육 자료, 프레젠테이션, SNS 콘텐츠, 출판, 컨설팅

- 🌍 **다국어 지원**
  - 한국어, English, 日本語, 中文

- ✨ **8가지 장식 스타일**
  - 보석, 크리스탈, 금, 은, 동물 스티커, 꽃, 과일, 공룡

## 기술 스택

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS, Shadcn/ui
- **State Management**: Zustand
- **AI Integration**: OpenAI DALL-E 3, Google Gemini (준비 중)

## 시작하기

### 1. 필수 요구사항

- Node.js 18.0 이상
- npm 또는 yarn
- OpenAI API 키 (이미지 생성용)

### 2. 설치

```bash
# 저장소 클론
git clone https://github.com/jaiwshim-project/thinkdraw-ai.git
cd thinkdraw-ai

# 의존성 설치
npm install
# 또는
yarn install
```

### 3. 환경 변수 설정 (선택사항)

프로젝트는 브라우저 LocalStorage에서 API 키를 관리합니다.
서버 측 환경 변수를 사용하려면 `.env.local` 파일을 생성하세요:

```bash
# .env.local (선택사항)
# OPENAI_API_KEY=sk-...
# GEMINI_API_KEY=...
```

### 4. 개발 서버 실행

```bash
npm run dev
# 또는
yarn dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 을 열어 확인하세요.

### 5. API 키 설정

1. 앱 실행 후 **설정(Settings)** 페이지로 이동
2. OpenAI API 키 입력
3. 저장 후 ThinkDraw 시작!

## 프로젝트 구조

```
thinkdraw-ai/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # 랜딩 페이지
│   ├── create/                   # 이미지 생성 플로우
│   │   ├── page.tsx             # 메인 생성 페이지
│   │   └── components/          # 9단계 컴포넌트
│   ├── settings/                # 설정 페이지
│   ├── dashboard/               # 대시보드
│   └── api/                     # API 라우트
│       └── generate-image/      # 이미지 생성 API
├── components/                   # 공통 컴포넌트
│   ├── ui/                      # Shadcn/ui 컴포넌트
│   ├── Header.tsx
│   └── Footer.tsx
├── lib/                         # 유틸리티 & 로직
│   ├── prompt-builder.ts        # 프롬프트 생성 엔진
│   ├── constants.ts             # 상수 정의
│   └── utils.ts
├── store/                       # Zustand 상태 관리
│   └── create-store.ts
├── types/                       # TypeScript 타입 정의
│   └── index.ts
└── public/                      # 정적 파일
    ├── thinkdraw-logo.png
    └── Gemini_Generated_*.png   # 예시 이미지
```

## 주요 기능 설명

### 프롬프트 생성 엔진

ThinkDraw AI의 핵심은 지능형 프롬프트 생성 엔진입니다:

1. **주제 확장**: 간단한 주제도 1450-1500자의 풍부한 컨텍스트로 확장
2. **청중 맞춤**: 연령대/분야에 따른 톤 및 난이도 자동 조정
3. **스마트 요약**: 긴 내용을 핵심만 남기고 최적 길이로 요약
4. **스타일 적용**: 선택한 시각화 스타일에 맞는 구체적인 지시사항 생성

### DALL-E 3 최적화

- 4000자 제한 준수
- 텍스트 최소화, 시각적 커뮤니케이션 우선
- HD 품질 이미지 생성
- 3가지 사이즈 지원 (16:9, 9:16, 1:1)

## 빌드 및 배포

### 프로덕션 빌드

```bash
npm run build
npm run start
```

### Vercel 배포 (권장)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/jaiwshim-project/thinkdraw-ai)

1. Vercel 계정으로 로그인
2. 저장소 연결
3. 환경 변수 설정 (선택사항)
4. 배포 완료!

## 라이선스

이 프로젝트는 개인 및 교육 목적으로 자유롭게 사용할 수 있습니다.

## 문의

- GitHub: [jaiwshim-project/thinkdraw-ai](https://github.com/jaiwshim-project/thinkdraw-ai)
- Issues: [Bug Report / Feature Request](https://github.com/jaiwshim-project/thinkdraw-ai/issues)

---

**Made with ❤️ by ThinkDraw AI Team**

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
