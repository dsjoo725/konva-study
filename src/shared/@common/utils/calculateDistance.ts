/**
 * @name calculateDistance
 * @description
 * 두 점 (x1, y1)와 (x2, y2) 사이의 유클리드 거리를 계산합니다.
 * ```typescript
 * calculateDistance(
 *   // 첫 번째 점의 x 좌표
 *   x1: number,
 *   // 첫 번째 점의 y 좌표
 *   y1: number,
 *   // 두 번째 점의 x 좌표
 *   x2: number,
 *   // 두 번째 점의 y 좌표
 *   y2: number
 * ): number
 * ```
 * @example
 * calculateDistance(0, 0, 3, 4) // 5
 * calculateDistance(1, 1, 4, 5) // 5
 */
export const calculateDistance = (x1: number, y1: number, x2: number, y2: number): number => {
  const deltaX = x2 - x1;
  const deltaY = y2 - y1;
  return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
};
