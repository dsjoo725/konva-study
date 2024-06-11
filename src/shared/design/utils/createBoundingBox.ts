import { degToRad } from '@/shared/@common/utils/math';
import { Transform } from 'konva/lib/Util';
import { Vector2d } from 'konva/lib/types';

/**
 * @name calculateBoundingBox
 * @description
 * 주어진 점들과 회전 각도를 이용하여 바운딩 박스를 계산합니다.
 * ```typescript
 * calculateBoundingBox(
 *   // 2D 벡터로 이루어진 점들의 배열
 *   points: Vector2d[],
 *   // 회전 각도 (도 단위)
 *   rotation: number
 * ): { x: number, y: number, width: number, height: number, rotation: number }
 * ```
 * @example
 * calculateBoundingBox(
 *   [{ x: 100, y: 100 },{ x: 200, y: 100 },{ x: 100, y: 300 },{ x: 200, y: 300 }],
 *   90
 * )
 * // { x: 200, y: 100, width: 200, height: 100, rotation: 90 }
 */
export const calculateBoundingBox = (points: Vector2d[], rotation: number) => {
  const transform = new Transform();
  transform.rotate(-degToRad(rotation));

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  points.forEach((point) => {
    const transformedPoint = transform.point(point);
    minX = Math.min(minX, transformedPoint.x);
    minY = Math.min(minY, transformedPoint.y);
    maxX = Math.max(maxX, transformedPoint.x);
    maxY = Math.max(maxY, transformedPoint.y);
  });

  transform.invert();
  const { x, y } = transform.point({ x: minX, y: minY });

  return { x, y, width: maxX - minX, height: maxY - minY, rotation };
};
