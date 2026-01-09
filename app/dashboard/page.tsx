'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getImageHistory, deleteImageFromHistory, clearImageHistory, type ImageHistoryItem } from '@/lib/image-history';
import { STYLES, TOOLS, SIZES, LANGUAGES, DECORATIONS, AGE_GROUPS, FIELDS } from '@/lib/constants';

export default function DashboardPage() {
  const router = useRouter();
  const [history, setHistory] = useState<ImageHistoryItem[]>([]);
  const [selectedImage, setSelectedImage] = useState<ImageHistoryItem | null>(null);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    const items = getImageHistory();
    setHistory(items);
  };

  const handleDelete = (id: string) => {
    if (confirm('이 이미지를 삭제하시겠습니까?')) {
      deleteImageFromHistory(id);
      loadHistory();
      if (selectedImage?.id === id) {
        setSelectedImage(null);
      }
    }
  };

  const handleClearAll = () => {
    if (confirm('모든 이미지를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      clearImageHistory();
      loadHistory();
      setSelectedImage(null);
    }
  };

  const handleDownload = (imageUrl: string, id: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `thinkdraw-${id}.png`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getAudienceName = (audience: ImageHistoryItem['audience']) => {
    if (audience.type === 'age') {
      const ageGroup = AGE_GROUPS.find(g => g.id === audience.value);
      return ageGroup?.name || audience.value;
    } else {
      const field = FIELDS.find(f => f.id === audience.value);
      return field?.name || audience.value;
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto compact-container compact-section">
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gradient">나의 대시보드</h1>
            <p className="text-gray-700 mt-1 text-sm sm:text-base">생성한 이미지 목록을 확인하고 관리하세요</p>
          </div>
          <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
            <Button onClick={() => router.push('/create')} size="default" className="btn-gradient flex-1 sm:flex-none">
              ✨ 새 이미지 생성
            </Button>
            {history.length > 0 && (
              <Button onClick={handleClearAll} variant="outline" size="default" className="text-red-600 border-red-300 hover:bg-red-50 flex-1 sm:flex-none">
                🗑️ 전체 삭제
              </Button>
            )}
          </div>
        </div>

        {history.length === 0 ? (
          <Card className="card-enhanced">
            <CardContent className="py-10 text-center">
              <div className="text-5xl mb-3">🎨</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">생성한 이미지가 없습니다</h3>
              <p className="text-sm text-gray-600 mb-5">첫 번째 이미지를 생성해보세요!</p>
              <Button onClick={() => router.push('/create')} size="default" className="btn-gradient">
                시작하기 →
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* 이미지 목록 */}
            <div className="lg:col-span-1 space-y-3">
              <Card className="card-enhanced">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">이미지 목록 ({history.length})</CardTitle>
                  <CardDescription className="text-xs">생성한 순서대로 표시됩니다</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto">
                  {history.map((item, index) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedImage(item)}
                      className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedImage?.id === item.id
                          ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 shadow-md'
                          : 'border-gray-200 hover:border-blue-300 hover:shadow-sm'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <div className="flex-shrink-0 w-14 h-14 rounded-md overflow-hidden bg-gray-100 shadow-sm">
                          <img
                            src={item.imageUrl}
                            alt={item.topic}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 truncate text-xs sm:text-sm">
                            {index + 1}. {item.topic}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {formatDate(item.timestamp)}
                          </p>
                          <div className="flex gap-1.5 mt-1.5">
                            <span className="text-xs bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-2 py-0.5 rounded">
                              {STYLES.find(s => s.id === item.style)?.name}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* 이미지 상세 보기 */}
            <div className="lg:col-span-2">
              {selectedImage ? (
                <div className="space-y-3">
                  {/* 이미지 */}
                  <Card className="card-enhanced">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-gradient text-lg">{selectedImage.topic}</CardTitle>
                      <CardDescription className="text-xs">{formatDate(selectedImage.timestamp)}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-3 mb-3 shadow-inner">
                        <img
                          src={selectedImage.imageUrl}
                          alt={selectedImage.topic}
                          className="w-full h-auto rounded-lg shadow-lg"
                        />
                      </div>
                      <div className="flex gap-2 sm:gap-3">
                        <Button
                          onClick={() => handleDownload(selectedImage.imageUrl, selectedImage.id)}
                          className="btn-gradient flex-1"
                          size="default"
                        >
                          📥 다운로드
                        </Button>
                        <Button
                          onClick={() => handleDelete(selectedImage.id)}
                          variant="outline"
                          size="default"
                          className="text-red-600 border-red-300 hover:bg-red-50 flex-1 sm:flex-none"
                        >
                          🗑️ 삭제
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* 생성 조건 */}
                  <Card className="card-enhanced">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">생성 조건</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-sm font-semibold text-gray-700">주제</p>
                          <p className="text-sm text-gray-900">{selectedImage.topic}</p>
                          {selectedImage.topicDetail && (
                            <p className="text-xs text-gray-600 mt-1">{selectedImage.topicDetail}</p>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-700">타겟 청중</p>
                          <p className="text-sm text-gray-900">{getAudienceName(selectedImage.audience)}</p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-700">표현 스타일</p>
                          <p className="text-sm text-gray-900">
                            {STYLES.find(s => s.id === selectedImage.style)?.name}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-700">필기 도구</p>
                          <p className="text-sm text-gray-900">
                            {TOOLS.find(t => t.id === selectedImage.tool)?.name}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-700">이미지 사이즈</p>
                          <p className="text-sm text-gray-900">
                            {SIZES.find(s => s.id === selectedImage.size)?.name}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-700">언어</p>
                          <p className="text-sm text-gray-900">
                            {LANGUAGES.find(l => l.id === selectedImage.language)?.name}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-700">장식</p>
                          <p className="text-sm text-gray-900">
                            {DECORATIONS.find(d => d.id === selectedImage.decoration)?.name}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* 프롬프트 */}
                  <Card className="card-enhanced">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">생성 프롬프트</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-3 rounded-lg border border-gray-200">
                        <pre className="text-xs text-gray-700 whitespace-pre-wrap font-mono leading-relaxed">
                          {selectedImage.prompt}
                        </pre>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <Card className="card-enhanced">
                  <CardContent className="py-10 text-center">
                    <div className="text-5xl mb-3">👈</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">이미지를 선택하세요</h3>
                    <p className="text-sm text-gray-600">왼쪽 목록에서 이미지를 클릭하면 상세 정보를 볼 수 있습니다</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
