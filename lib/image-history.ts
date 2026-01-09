import type { Audience, StyleType, ToolType, SizeType, LanguageType, DecorationType } from '@/types';

export interface ImageHistoryItem {
  id: string;
  timestamp: number;
  topic: string;
  topicDetail?: string;
  audience: Audience;
  style: StyleType;
  tool: ToolType;
  size: SizeType;
  language: LanguageType;
  decoration: DecorationType;
  imageUrl: string;
  prompt: string;
}

const STORAGE_KEY = 'thinkdraw_image_history';
const MAX_HISTORY_ITEMS = 50; // 최대 50개까지 저장

/**
 * 이미지 히스토리 저장
 */
export function saveImageToHistory(item: Omit<ImageHistoryItem, 'id' | 'timestamp'>): void {
  try {
    const history = getImageHistory();

    const newItem: ImageHistoryItem = {
      ...item,
      id: generateId(),
      timestamp: Date.now(),
    };

    // 최신 항목을 앞에 추가
    history.unshift(newItem);

    // 최대 개수 제한
    if (history.length > MAX_HISTORY_ITEMS) {
      history.splice(MAX_HISTORY_ITEMS);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    console.log('Image saved to history:', newItem.id);
  } catch (error) {
    console.error('Failed to save image to history:', error);
  }
}

/**
 * 이미지 히스토리 가져오기
 */
export function getImageHistory(): ImageHistoryItem[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];

    const history = JSON.parse(data) as ImageHistoryItem[];
    return history;
  } catch (error) {
    console.error('Failed to get image history:', error);
    return [];
  }
}

/**
 * 특정 이미지 가져오기
 */
export function getImageById(id: string): ImageHistoryItem | null {
  try {
    const history = getImageHistory();
    return history.find(item => item.id === id) || null;
  } catch (error) {
    console.error('Failed to get image by id:', error);
    return null;
  }
}

/**
 * 이미지 삭제
 */
export function deleteImageFromHistory(id: string): void {
  try {
    const history = getImageHistory();
    const filtered = history.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    console.log('Image deleted from history:', id);
  } catch (error) {
    console.error('Failed to delete image from history:', error);
  }
}

/**
 * 전체 히스토리 삭제
 */
export function clearImageHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    console.log('Image history cleared');
  } catch (error) {
    console.error('Failed to clear image history:', error);
  }
}

/**
 * 고유 ID 생성
 */
function generateId(): string {
  return `img_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}
