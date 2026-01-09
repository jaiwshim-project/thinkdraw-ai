'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function Header() {
  const router = useRouter();

  const handleStartClick = (e: React.MouseEvent) => {
    e.preventDefault();

    // LocalStorage에서 API 키 확인
    const openaiApiKey = localStorage.getItem('openai_api_key');
    const geminiApiKey = localStorage.getItem('gemini_api_key');

    // API 키가 하나라도 설정되어 있으면 create 페이지로 이동
    if (openaiApiKey || geminiApiKey) {
      router.push('/create');
    } else {
      // API 키가 없으면 settings 페이지로 이동
      const goToSettings = confirm(
        'API 키가 설정되지 않았습니다.\n\n먼저 설정 페이지에서 OpenAI 또는 Gemini API 키를 설정해주세요.'
      );
      if (goToSettings) {
        router.push('/settings');
      }
    }
  };

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="container mx-auto compact-container flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-gradient hover:scale-105 transition-transform">
          ThinkDraw AI
        </Link>
        <nav className="flex items-center gap-4 sm:gap-6">
          <Link href="/" className="text-sm font-medium hover:text-primary transition-all hover:scale-105">
            홈
          </Link>
          <a
            href="/create"
            onClick={handleStartClick}
            className="text-sm font-medium px-3 py-1.5 rounded-md bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all hover:scale-105 shadow-sm cursor-pointer"
          >
            시작하기
          </a>
          <Link href="/dashboard" className="text-sm font-medium hover:text-primary transition-all hover:scale-105">
            📊 대시보드
          </Link>
          <Link href="/settings" className="text-sm font-medium hover:text-primary transition-all hover:scale-105">
            ⚙️ 설정
          </Link>
        </nav>
      </div>
    </header>
  );
}
