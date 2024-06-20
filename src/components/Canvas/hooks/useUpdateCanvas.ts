import { useEffect, useRef } from 'react';
import { debounce } from 'lodash';

import { useCanvas, useCanvasActions } from '@/shared/canvas/store';

export const CANVAS_PADDING = 64 as const;

type Dimensions = {
  width: number;
  height: number;
};

export const useUpdateCanvas = (paper: Dimensions) => {
  const canvas = useCanvas();
  const { updateCanvas } = useCanvasActions();

  const containerRef = useRef<HTMLDivElement>(null);
  const x = canvas.width / canvas.scale / 2 - paper.width / 2;
  const y = CANVAS_PADDING / 2 / canvas.scale;

  const adjustCanvas = () => {
    if (!containerRef.current) return;

    const screen = {
      width: containerRef.current.clientWidth,
      height: containerRef.current.clientHeight,
    };

    const scaleX = (screen.width - CANVAS_PADDING) / paper.width;
    const scaleY = (screen.height - CANVAS_PADDING) / paper.height;
    const scale = Math.floor(Math.min(scaleX, scaleY) * 100) / 100;

    const width = Math.max(paper.width * scale + CANVAS_PADDING, screen.width);
    const height = Math.max(paper.height * scale + CANVAS_PADDING, screen.height);

    updateCanvas(width, height, scale);
  };

  // useRef를 사용하여 debounced 함수의 인스턴스를 생성하고,
  // 컴포넌트의 생애 주기 동안 이 인스턴스가 재생성되지 않도록 합니다.
  // 이는 useEffect의 의존성 배열에 안정적인 참조를 제공하여 불필요한 리렌더링을 방지합니다.
  const debouncedUpdateCanvas = useRef(debounce(adjustCanvas, 200)).current;

  useEffect(() => {
    debouncedUpdateCanvas();

    const handleResize = () => {
      debouncedUpdateCanvas();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [debouncedUpdateCanvas]);

  return { canvas, containerRef, x, y };
};
