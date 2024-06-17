import { BoundingBox } from '@/shared/design/type';

/**
 * @name radToDeg
 * @description
 * 라디안을 도 단위로 변환합니다.
 * ```typescript
 * radToDeg(
 *   // 변환할 라디안 값
 *   rad: number
 * ): number
 * ```
 * @example
 * radToDeg(Math.PI) // 180
 * radToDeg(Math.PI / 2) // 90
 */
export const radToDeg = (rad: number) => (rad * 180) / Math.PI;

/**
 * @name degToRad
 * @description
 * 도 단위를 라디안으로 변환합니다.
 * ```typescript
 * degToRad(
 *   // 변환할 도 값
 *   deg: number
 * ): number
 * ```
 * @example
 * degToRad(180) // Math.PI
 * degToRad(90) // Math.PI / 2
 */
export const degToRad = (deg: number): number => (deg * Math.PI) / 180;

/**
 * @name calculateAngle
 * @description
 * 주어진 점 (x, y)와 y축 사이의 각도를 계산합니다. 결과는 라디안 단위로 제공됩니다.
 * ```typescript
 * calculateAngle(
 *   // 점의 x 좌표
 *   x: number,
 *   // 점의 y 좌표
 *   y: number
 * ): number
 * ```
 * @example
 * calculateAngle(1, 0) // -Math.PI / 2
 * calculateAngle(0, 1) // 0
 */
export const calculateAngle = (x: number, y: number): number => {
  return Math.atan2(y, x) - Math.PI / 2;
};

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

export const calculateSinCos = (boundingBox: BoundingBox) => {
  const hypotenuse = Math.sqrt(Math.pow(boundingBox.width, 2) + Math.pow(boundingBox.height, 2));

  const sin = Math.abs(boundingBox.height / hypotenuse);
  const cos = Math.abs(boundingBox.width / hypotenuse);

  return { sin, cos };
};
