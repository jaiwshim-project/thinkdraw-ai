'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TOOLS, TOOL_CATEGORY_LABELS } from '@/lib/constants';
import type { ToolType } from '@/types';

interface Step4ToolProps {
  tool: ToolType | null;
  onToolChange: (tool: ToolType) => void;
  onNext?: () => void;
}

export function Step4Tool({ tool, onToolChange, onNext }: Step4ToolProps) {
  const groupedTools = TOOLS.reduce((acc, toolOption) => {
    if (!acc[toolOption.category]) {
      acc[toolOption.category] = [];
    }
    acc[toolOption.category].push(toolOption);
    return acc;
  }, {} as Record<string, typeof TOOLS>);

  const handleDoubleClick = (selectedTool: ToolType) => {
    onToolChange(selectedTool);
    if (onNext) {
      setTimeout(() => onNext(), 200);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>필기 도구를 선택하세요</CardTitle>
          <CardDescription>
            이미지의 질감과 스타일을 결정하는 도구를 선택하세요
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {Object.entries(groupedTools).map(([category, tools]) => (
            <div key={category}>
              <h3 className="font-semibold text-lg mb-4">
                {TOOL_CATEGORY_LABELS[category as keyof typeof TOOL_CATEGORY_LABELS]}
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tools.map((toolOption) => (
                  <button
                    key={toolOption.id}
                    onClick={() => onToolChange(toolOption.id)}
                    onDoubleClick={() => handleDoubleClick(toolOption.id)}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      tool === toolOption.id
                        ? 'border-primary bg-primary/5 shadow-md'
                        : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'
                    }`}
                  >
                    <div className="font-semibold mb-1">{toolOption.name}</div>
                    <p className="text-sm text-gray-600">{toolOption.description}</p>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
