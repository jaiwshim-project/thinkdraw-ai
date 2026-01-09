import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages 정적 배포 설정
  output: 'export',

  // GitHub Pages 서브디렉토리 경로
  basePath: '/thinkdraw-ai',

  // 이미지 최적화 비활성화 (정적 export 필요)
  images: {
    unoptimized: true,
  },

  // 정적 파일 경로
  assetPrefix: '/thinkdraw-ai',
};

export default nextConfig;
