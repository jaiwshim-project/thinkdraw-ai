'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function Home() {
  const router = useRouter();

  const handleStart = () => {
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
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Hero Section */}
      <main className="flex-1">
        <section className="container mx-auto compact-container compact-section text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 sm:mb-6">
            생각과 자료를 입력하면
            <br />
            <span className="text-gradient">1페이지 비주얼</span>이 완성됩니다!
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 mb-6 max-w-2xl mx-auto leading-relaxed">
            글을 정리하지 않아도 됩니다. 그림을 그릴 줄 몰라도 됩니다.
            <br />
            ThinkDraw AI는 당신의 생각을 <strong className="text-gradient">설명 가능한 이미지</strong>로 바꿉니다.
          </p>
          <Button size="lg" className="btn-gradient text-lg px-6 py-5 sm:px-8 sm:py-6" onClick={handleStart}>
            ThinkDraw 시작하기 →
          </Button>
        </section>

        {/* Before/After Comparison Section */}
        <section className="compact-section bg-white/50 backdrop-blur-sm">
          <div className="container mx-auto compact-container">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gradient">
              복잡한 텍스트를 한 장의 비주얼로
            </h2>
            <div className="grid md:grid-cols-[1fr_auto_1fr] gap-6 items-center max-w-6xl mx-auto">
              {/* 왼쪽: 복잡한 텍스트 문서 */}
              <div className="relative">
                <div className="absolute -top-3 -left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">
                  BEFORE
                </div>
                <div className="bg-white border-2 border-gray-300 rounded-lg p-4 shadow-lg h-[400px] overflow-hidden relative">
                  <div className="text-[10px] leading-tight text-gray-700 space-y-2">
                    <p className="font-bold mb-2 text-sm">RQTDW 사고법 설명 문서</p>
                    <p>
                      RQTDW는 Request(요청), Question(질문), Thinking(사고), Drawing(그리기), Writing(작성)의
                      5단계로 구성된 문제 해결 프레임워크입니다. 첫 번째 단계인 Request는 문제를 명확히 정의하고
                      요청사항을 구체화하는 과정입니다. 이 단계에서는 무엇을 해결해야 하는지, 누구를 위한 것인지,
                      왜 필요한지를 명확히 합니다. 두 번째 단계인 Question은 문제에 대한 핵심 질문을 도출하는
                      과정입니다. What(무엇을), Why(왜), How(어떻게), When(언제), Where(어디서), Who(누가)의
                      6가지 질문 유형을 활용하여 문제의 본질을 파악합니다.
                    </p>
                    <p>
                      세 번째 단계인 Thinking은 수집된 정보를 바탕으로 체계적으로 사고하는 과정입니다.
                      이 단계에서는 분석적 사고, 비판적 사고, 창의적 사고를 모두 활용하여 다양한 관점에서
                      문제를 검토합니다. 사고의 깊이를 더하기 위해 마인드맵, 논리 트리, SWOT 분석 등의
                      도구를 활용할 수 있습니다. 또한 가설을 세우고 검증하는 과정을 통해 해결책의 타당성을
                      확인합니다.
                    </p>
                    <p>
                      네 번째 단계인 Drawing은 사고의 결과를 시각화하는 과정입니다. 복잡한 개념과 관계를
                      그림, 도표, 다이어그램으로 표현하여 이해를 돕습니다. 비주얼씽킹 기법을 활용하여
                      아이디어를 스케치하고, 프로세스를 흐름도로 그리며, 데이터를 차트로 시각화합니다.
                      이를 통해 추상적인 개념을 구체화하고, 팀원들과의 소통을 원활하게 합니다.
                    </p>
                    <p>
                      마지막 단계인 Writing은 최종 결과물을 문서화하는 과정입니다. 사고와 시각화의 결과를
                      명확하고 간결한 문장으로 정리합니다. 보고서, 제안서, 프레젠테이션 등 다양한 형식으로
                      작성할 수 있으며, 독자의 이해를 돕기 위해 논리적인 구조를 갖춥니다. RQTDW 사고법은
                      이러한 5단계를 순환적으로 반복하며 문제 해결의 완성도를 높여갑니다.
                    </p>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
                </div>
                <p className="text-center text-xs text-gray-500 mt-2">복잡하고 긴 텍스트 문서</p>
              </div>

              {/* 가운데: 화살표 */}
              <div className="flex justify-center md:block">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center shadow-lg animate-pulse">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>

              {/* 오른쪽: 비주얼 다이어그램 */}
              <div className="relative">
                <div className="absolute -top-3 -right-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">
                  AFTER
                </div>
                <div className="bg-white border-2 border-blue-300 rounded-lg p-4 shadow-lg h-[400px] relative overflow-hidden flex items-center justify-center">
                  <img
                    src="/rqtdw-visual.png"
                    alt="RQTDW 사고법 비주얼"
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-center text-xs text-gray-500 mt-2">한눈에 이해되는 비주얼</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-white/50 backdrop-blur-sm compact-section">
          <div className="container mx-auto compact-container">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-gradient">왜 ThinkDraw AI인가?</h2>
            <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
              <Card className="card-enhanced">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">🎯 사고 구조화</CardTitle>
                  <CardDescription>단순 이미지 생성기가 아닙니다</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    AI가 스스로 개념을 정의하고, 설명 구조를 만들고, 예시와 흐름을 구성하여 한 장의 시각적 결과물로 완성합니다.
                  </p>
                </CardContent>
              </Card>

              <Card className="card-enhanced">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">🎨 다양한 표현 스타일</CardTitle>
                  <CardDescription>목적에 맞는 스타일 선택</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    비주얼씽킹, 인포그래픽, 마인드맵, 컨셉맵 등 7가지 스타일과 만년필, 파인라이너 등 8가지 필기 도구로 표현합니다.
                  </p>
                </CardContent>
              </Card>

              <Card className="card-enhanced">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">📱 다목적 활용</CardTitle>
                  <CardDescription>교육, 출판, SNS까지</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    16:9, 9:16, 1:1 비율로 PPT, 유튜브 쇼츠, 인스타 피드 등 다양한 채널에 바로 활용할 수 있습니다.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="compact-section">
          <div className="container mx-auto compact-container">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gradient">어떻게 작동하나요?</h2>
            <div className="flex justify-center items-center gap-4 flex-wrap max-w-5xl mx-auto">
              {[
                { step: 1, title: '주제 입력', icon: '📝' },
                { step: 2, title: '타겟 선택', icon: '🎯' },
                { step: 3, title: '스타일 선택', icon: '🎨' },
                { step: 4, title: '도구 선택', icon: '✏️' },
                { step: 5, title: '사이즈 선택', icon: '📐' },
                { step: 6, title: '프롬프팅 수정', icon: '🤖' },
                { step: 7, title: '언어 선택', icon: '🌐' },
                { step: 8, title: '장식 선택', icon: '💎' },
                { step: 9, title: '자동 생성', icon: '✨' },
              ].map((item, index) => (
                <div key={item.step} className="flex items-center gap-2">
                  <div className="flex flex-col items-center gap-1">
                    <div className="text-4xl">
                      {item.icon}
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white flex items-center justify-center font-bold text-xs">
                        {item.step}
                      </span>
                      <h3 className="font-semibold text-sm">{item.title}</h3>
                    </div>
                  </div>
                  {index < 7 && (
                    <div className="text-blue-400 text-2xl">→</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white compact-section">
          <div className="container mx-auto compact-container text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">지금 바로 시작해보세요</h2>
            <p className="text-base sm:text-xl mb-6 opacity-90 max-w-2xl mx-auto">
              완벽하게 정리할 필요 없습니다. AI가 구조를 만들어 드립니다.
            </p>
            <Button size="lg" variant="secondary" className="text-lg px-6 py-5 sm:px-8 sm:py-6 bg-white text-primary hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all hover:scale-105" onClick={handleStart}>
              무료로 시작하기 →
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
