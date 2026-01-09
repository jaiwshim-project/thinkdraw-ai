'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type ProviderType = 'openai' | 'gemini';

export default function SettingsPage() {
  const [selectedProvider, setSelectedProvider] = useState<ProviderType>('openai');
  const [openaiApiKey, setOpenaiApiKey] = useState('');
  const [geminiApiKey, setGeminiApiKey] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // LocalStorage에서 API 키 불러오기
    const savedOpenAIKey = localStorage.getItem('openai_api_key');
    const savedGeminiKey = localStorage.getItem('gemini_api_key');

    if (savedOpenAIKey) {
      setOpenaiApiKey(savedOpenAIKey);
    }
    if (savedGeminiKey) {
      setGeminiApiKey(savedGeminiKey);
    }
  }, []);

  const currentApiKey = selectedProvider === 'openai' ? openaiApiKey : geminiApiKey;
  const setCurrentApiKey = selectedProvider === 'openai' ? setOpenaiApiKey : setGeminiApiKey;

  const handleSave = () => {
    if (!currentApiKey.trim()) {
      alert('API 키를 입력해주세요.');
      return;
    }

    // API 키 형식 검증
    if (selectedProvider === 'openai' && !currentApiKey.startsWith('sk-')) {
      alert('올바른 OpenAI API 키 형식이 아닙니다. (sk-로 시작해야 합니다)');
      return;
    }

    if (selectedProvider === 'gemini' && !currentApiKey.startsWith('AIza')) {
      alert('올바른 Gemini API 키 형식이 아닙니다. (AIza로 시작해야 합니다)');
      return;
    }

    // LocalStorage에 저장
    const storageKey = selectedProvider === 'openai' ? 'openai_api_key' : 'gemini_api_key';
    localStorage.setItem(storageKey, currentApiKey.trim());
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);

    alert('API 키가 저장되었습니다!');
  };

  const handleClear = () => {
    if (confirm('저장된 API 키를 삭제하시겠습니까?')) {
      const storageKey = selectedProvider === 'openai' ? 'openai_api_key' : 'gemini_api_key';
      localStorage.removeItem(storageKey);
      setCurrentApiKey('');
      alert('API 키가 삭제되었습니다.');
    }
  };

  const handleOpenApiKeyPage = () => {
    const url = selectedProvider === 'openai'
      ? 'https://platform.openai.com/api-keys'
      : 'https://aistudio.google.com/app/apikey';
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto compact-container compact-section max-w-4xl">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gradient">설정</h1>
          <p className="text-gray-700 mt-1 text-sm sm:text-base">AI 제공자를 선택하고 API 키를 설정하여 실제 이미지 생성 기능을 사용하세요</p>
        </div>

        {/* AI 제공자 선택 버튼 */}
        <div className="mb-4 flex gap-3">
          <Button
            onClick={() => setSelectedProvider('openai')}
            size="default"
            variant={selectedProvider === 'openai' ? 'default' : 'outline'}
            className={`flex-1 transition-all ${selectedProvider === 'openai' ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-md' : 'hover:border-green-500'}`}
          >
            🤖 OpenAI (ChatGPT / DALL-E 3)
          </Button>
          <Button
            onClick={() => setSelectedProvider('gemini')}
            size="default"
            variant={selectedProvider === 'gemini' ? 'default' : 'outline'}
            className={`flex-1 transition-all ${selectedProvider === 'gemini' ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md' : 'hover:border-blue-500'}`}
          >
            ✨ Google Gemini (Imagen 3)
          </Button>
        </div>

        <Card className="card-enhanced">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-gradient">
              {selectedProvider === 'openai' ? 'OpenAI API 키 설정' : 'Google Gemini API 키 설정'}
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              {selectedProvider === 'openai'
                ? 'DALL-E 3를 사용하여 실제 이미지를 생성하려면 OpenAI API 키가 필요합니다'
                : 'Imagen 3를 사용하여 실제 이미지를 생성하려면 Google Gemini API 키가 필요합니다'
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* API 키 생성 안내 */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-3 shadow-sm">
              <h3 className="font-semibold text-blue-900 mb-1.5 text-sm">📝 API 키 생성 방법</h3>
              <ol className="text-xs sm:text-sm text-blue-800 space-y-1.5 ml-4 list-decimal">
                <li>아래 "API 키 생성하러 가기" 버튼을 클릭하세요</li>
                {selectedProvider === 'openai' ? (
                  <>
                    <li>OpenAI 로그인 후 "Create new secret key" 클릭</li>
                    <li>생성된 API 키를 복사하세요 (sk-로 시작)</li>
                  </>
                ) : (
                  <>
                    <li>Google 로그인 후 "Create API key" 클릭</li>
                    <li>생성된 API 키를 복사하세요 (AIza로 시작)</li>
                  </>
                )}
                <li>아래 입력창에 붙여넣고 "저장" 버튼을 클릭하세요</li>
              </ol>
            </div>

            {/* API 키 생성 버튼 */}
            <div className="flex gap-2">
              <Button
                onClick={handleOpenApiKeyPage}
                className={`flex-1 shadow-md transition-all ${selectedProvider === 'openai' ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800' : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'}`}
                size="default"
              >
                🔑 API 키 생성하러 가기 ({selectedProvider === 'openai' ? 'OpenAI' : 'Gemini'})
              </Button>
            </div>

            {/* API 키 입력 */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                {selectedProvider === 'openai' ? 'OpenAI API 키' : 'Google Gemini API 키'}
              </label>
              <Input
                type="password"
                placeholder={selectedProvider === 'openai' ? 'sk-proj-...' : 'AIza...'}
                value={currentApiKey}
                onChange={(e) => setCurrentApiKey(e.target.value)}
                className="font-mono focus:ring-2 focus:ring-blue-500 transition-shadow"
              />
              <p className="text-xs text-gray-500">
                API 키는 브라우저에만 저장되며, 외부로 전송되지 않습니다.
              </p>
            </div>

            {/* 저장 버튼 */}
            <div className="flex gap-2 sm:gap-3">
              <Button onClick={handleSave} className="btn-gradient flex-1" size="default">
                {saved ? '✓ 저장됨!' : '💾 저장'}
              </Button>
              <Button
                onClick={handleClear}
                variant="outline"
                size="default"
                className="border-red-300 text-red-600 hover:bg-red-50"
              >
                🗑️ 삭제
              </Button>
            </div>

            {/* 비용 안내 */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-3 shadow-sm">
              <h3 className="font-semibold text-yellow-900 mb-1.5 text-sm">💰 비용 안내</h3>
              <ul className="text-xs sm:text-sm text-yellow-800 space-y-0.5 ml-4 list-disc">
                {selectedProvider === 'openai' ? (
                  <>
                    <li><strong>DALL-E 3 HD 품질 사용 중</strong> (더 선명하고 디테일한 이미지)</li>
                    <li>1024x1024 (정사각형): 이미지당 약 <strong>$0.080</strong> (~110원)</li>
                    <li>1792x1024 (16:9) / 1024x1792 (9:16): 이미지당 약 <strong>$0.120</strong> (~165원)</li>
                    <li>첫 $5 크레딧은 무료로 제공됩니다 (약 40-60개 이미지)</li>
                    <li>사용량은 OpenAI 대시보드에서 확인 가능합니다</li>
                  </>
                ) : (
                  <>
                    <li>Imagen 3: 무료 (월 제한 있음)</li>
                    <li>Google AI Studio에서 무료로 제공되는 API입니다</li>
                    <li>일일 요청 제한이 있을 수 있습니다</li>
                    <li>사용량은 Google AI Studio에서 확인 가능합니다</li>
                  </>
                )}
              </ul>
            </div>

            {/* API 한도 초과 시 안내 */}
            {selectedProvider === 'openai' && (
              <div className="bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-lg p-3 shadow-sm">
                <h3 className="font-semibold text-red-900 mb-1.5 text-sm">⚠️ API 한도 초과 시</h3>
                <p className="text-xs sm:text-sm text-red-800 mb-1.5">
                  "API 사용 한도 초과" 에러가 발생하면 다음을 확인하세요:
                </p>
                <ol className="text-xs sm:text-sm text-red-800 space-y-0.5 ml-4 list-decimal">
                  <li>OpenAI 계정에 결제 정보가 등록되어 있는지 확인</li>
                  <li>무료 크레딧($5)이 소진되었는지 확인</li>
                  <li>월별 사용 한도를 초과하지 않았는지 확인</li>
                </ol>
                <Button
                  onClick={() => window.open('https://platform.openai.com/account/billing/overview', '_blank')}
                  variant="outline"
                  size="sm"
                  className="mt-2 w-full border-red-300 text-red-700 hover:bg-red-100 transition-all"
                >
                  💳 OpenAI 결제 대시보드 열기
                </Button>
              </div>
            )}

            {selectedProvider === 'gemini' && (
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-3 shadow-sm">
                <h3 className="font-semibold text-blue-900 mb-1.5 text-sm">⚠️ API 한도 초과 시</h3>
                <p className="text-xs sm:text-sm text-blue-800 mb-1.5">
                  "API 사용 한도 초과" 에러가 발생하면 다음을 확인하세요:
                </p>
                <ol className="text-xs sm:text-sm text-blue-800 space-y-0.5 ml-4 list-decimal">
                  <li>Google AI Studio에서 API 키가 활성화되어 있는지 확인</li>
                  <li>일일 요청 제한을 초과하지 않았는지 확인</li>
                  <li>프로젝트 할당량(Quota)을 확인</li>
                </ol>
                <Button
                  onClick={() => window.open('https://aistudio.google.com/app/apikey', '_blank')}
                  variant="outline"
                  size="sm"
                  className="mt-2 w-full border-blue-300 text-blue-700 hover:bg-blue-100 transition-all"
                >
                  🔑 Google AI Studio 대시보드 열기
                </Button>
              </div>
            )}

            {/* 테스트 링크 */}
            <div className="pt-3 border-t">
              <Button
                onClick={() => window.location.href = '/create'}
                variant="outline"
                className="w-full hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all"
              >
                ✨ 이미지 생성하러 가기
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
