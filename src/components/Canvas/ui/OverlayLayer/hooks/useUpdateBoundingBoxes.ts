import Konva from 'konva';
import { Vector2d } from 'konva/lib/types';
import { useEffect, useRef } from 'react';

import {
  useDesignActions,
  useDesignBoundingBoxes,
  useDesignSelectedIds,
} from '@/shared/design/store';
import { BoundingBox } from '@/shared/design/type';
import { calculateBoundingBox } from '@/shared/design/utils/createBoundingBox';

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
