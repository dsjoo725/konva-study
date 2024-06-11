import Konva from 'konva';
import { Transform } from 'konva/lib/Util';
import { Vector2d } from 'konva/lib/types';
import { useEffect, useRef } from 'react';

import {
  useDesignActions,
  useDesignBoundingBoxes,
  useDesignSelectedIds,
} from '@/shared/design/store';
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
  const boundingBoxes = useDesignBoundingBoxes();
  const selectedIDs = useDesignSelectedIds();
  const { updateBoundingBoxes } = useDesignActions();

  const selectedShapes = useRef<Konva.Shape[]>([]);

  useEffect(() => {
    if (!stageRef.current) return;

    selectedShapes.current = selectedIDs
      .map((id) => stageRef.current!.findOne(`#${id}`))
      .filter((node): node is Konva.Shape => node instanceof Konva.Shape);

    const combinePoints: Vector2d[] = [];

    const clientRects: BoundingBox[] = selectedShapes.current.map((shape) => {
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

  return { boundingBoxes, selectedShapes };
};
