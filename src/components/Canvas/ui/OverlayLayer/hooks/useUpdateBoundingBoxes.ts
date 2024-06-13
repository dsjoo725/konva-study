import Konva from 'konva';
import { Vector2d } from 'konva/lib/types';
import { Transform } from 'konva/lib/Util';
import { useEffect, useRef } from 'react';

import { useBoundingBoxes, useDesignActions, useSelectedShapeIds } from '@/shared/design/store';
import { BoundingBox } from '@/shared/design/type';
import { degToRad } from '@/shared/@common/utils/math';

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
  const boundingBoxes = useBoundingBoxes();
  const selectedIDs = useSelectedShapeIds();
  const { setBoundingBoxes } = useDesignActions();

  const selectedShapesRef = useRef<Konva.Shape[]>([]);

  useEffect(() => {
    if (!stageRef.current) return;

    // 선택된 도형들을 참조로 저장합니다.
    selectedShapesRef.current = selectedIDs
      .map((id) => stageRef.current?.findOne(`#${id}`))
      .filter((node): node is Konva.Shape => node instanceof Konva.Shape);

    const combinePoints: Vector2d[] = [];

    // 각 도형의 변환된 경계 상자를 계산합니다.
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

      // 코너 포인트를 변환합니다.
      cornerPoints.forEach((point) => {
        const transformedPoint = getTransform.point(point);
        transformedPoints.push(transformedPoint);

        combinePoints.push(transformedPoint);
      });

      return calculateBoundingBox(transformedPoints, rotation);
    });

    // 선택된 도형이 없는 경우
    if (clientRects.length === 0) {
      setBoundingBoxes([]);
      return;
    }

    // 하나의 도형만 선택된 경우
    if (clientRects.length === 1) {
      setBoundingBoxes(clientRects);
      return;
    }

    // 여러 도형이 선택된 경우 결합된 바운딩 박스를 계산합니다.
    const combineClientRect = calculateBoundingBox(combinePoints, 0);

    setBoundingBoxes([combineClientRect, ...clientRects]);
  }, [scale, selectedIDs, stageRef, x, y, setBoundingBoxes]);

  return { boundingBoxes, selectedShapesRef };
};
