import { useState, useEffect, useRef } from 'react';

interface Dimensions {
  width: number;
  height: number;
}

const useContainerDimensions = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState<Dimensions>({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        // 컨테이너의 현재 너비와 높이를 상태로 설정합니다.
        setDimensions({ width: clientWidth, height: clientHeight });
      }
    };

    // 초기 치수 업데이트
    updateDimensions();

    // 창 크기 조정 이벤트에 대한 리스너 추가
    window.addEventListener('resize', updateDimensions);

    // 컴포넌트 언마운트 시 리스너 제거
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return { containerRef, dimensions };
};

export default useContainerDimensions;
