import Konva from 'konva';
import { Vector2d } from 'konva/lib/types';
import { useEffect, useRef } from 'react';

import {
  useDesignActions,
  useDesignBoundingBoxes,
  useDesignSelectedIds,
} from '@/shared/design/store';
import { BoundingBox } from '@/shared/design/type';
import { Transform } from 'konva/lib/Util';
import { degToRad } from '@/shared/@common/utils/math';

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
const calculateBoundingBox = (points: Vector2d[], rotation: number) => {
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

export const useUpdateBoundingBoxes = (
  stageRef: React.RefObject<Konva.Stage>,
  x: number,
  y: number,
  scale: number,
) => {
  const boundingBoxes = useDesignBoundingBoxes();
  const selectedIDs = useDesignSelectedIds();
  const { updateBoundingBoxes } = useDesignActions();

  const selectedShapesRef = useRef<Konva.Shape[]>([]);

  useEffect(() => {
    if (!stageRef.current) return;

    selectedShapesRef.current = selectedIDs
      .map((id) => stageRef.current?.findOne(`#${id}`))
      .filter((node): node is Konva.Shape => node instanceof Konva.Shape);

    const combinePoints: Vector2d[] = [];

    const clientRects: BoundingBox[] = selectedShapesRef.current.map((shape) => {
      const rotation = shape.rotation();
      const clientRect = shape.getClientRect({ skipTransform: true });

      const cornerPoints = [
        { x: clientRect.x, y: clientRect.y },
        { x: clientRect.x + clientRect.width, y: clientRect.y },
        { x: clientRect.x + clientRect.width, y: clientRect.y + clientRect.height },
        { x: clientRect.x, y: clientRect.y + clientRect.height },
      ];

      const getTransform = shape.getTransform();
      const transformedPoints: Vector2d[] = [];

      cornerPoints.forEach((point) => {
        const transformedPoint = getTransform.point(point);
        transformedPoints.push(transformedPoint);

        combinePoints.push(transformedPoint);
      });

      return calculateBoundingBox(transformedPoints, rotation);
    });

    if (clientRects.length === 0) {
      updateBoundingBoxes([]);
      return;
    }

    if (clientRects.length === 1) {
      updateBoundingBoxes(clientRects);
      return;
    }
    const combineClientRect = calculateBoundingBox(combinePoints, 0);

    updateBoundingBoxes([combineClientRect, ...clientRects]);
  }, [scale, selectedIDs, stageRef, updateBoundingBoxes, x, y]);

  return { boundingBoxes, selectedShapesRef };
};
