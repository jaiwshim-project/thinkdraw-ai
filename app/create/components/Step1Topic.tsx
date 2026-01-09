'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Step1TopicProps {
  topic: string;
  topicDetail: string;
  onTopicChange: (topic: string) => void;
  onDetailChange: (detail: string) => void;
}

export function Step1Topic({
  topic,
  topicDetail,
  onTopicChange,
  onDetailChange,
}: Step1TopicProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <Card className="card-enhanced">
        <CardHeader className="pb-4">
          <CardTitle className="text-gradient">주제를 입력하세요</CardTitle>
          <CardDescription>
            생각나는 주제를 자유롭게 입력하세요. 완벽하지 않아도 괜찮습니다!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* 주제 입력 */}
          <div className="space-y-1.5">
            <label htmlFor="topic" className="text-sm font-medium">
              주제 <span className="text-red-500">*</span>
            </label>
            <Input
              id="topic"
              value={topic}
              onChange={(e) => onTopicChange(e.target.value)}
              placeholder="예: RQTDW 사고법, 치과 신뢰 마케팅, AI 시대의 질문력"
              className="text-base focus:ring-2 focus:ring-blue-500 transition-shadow"
            />
          </div>

          {/* 상세 내용 입력 (선택사항) */}
          <div className="space-y-1.5">
            <label htmlFor="detail" className="text-sm font-medium">
              상세 내용 <span className="text-gray-400">(선택사항)</span>
            </label>
            <Textarea
              id="detail"
              value={topicDetail}
              onChange={(e) => onDetailChange(e.target.value)}
              placeholder="설명, 방법, 사례 등을 추가로 입력하면 더 정확한 이미지가 생성됩니다."
              rows={5}
              className="text-base focus:ring-2 focus:ring-blue-500 transition-shadow"
            />
          </div>

          {/* 예시 */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-3 rounded-lg space-y-1.5 border border-blue-100">
            <p className="text-sm font-medium text-gray-800">💡 입력 예시:</p>
            <ul className="text-xs sm:text-sm text-gray-700 space-y-0.5">
              <li>• "50대를 위한 치과 신뢰 마케팅 전략"</li>
              <li>• "AI 시대에 질문력이 중요한 이유를 학생들에게 설명"</li>
              <li>• "RQTDW 사고법의 5단계 프로세스와 각 단계별 특징"</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
