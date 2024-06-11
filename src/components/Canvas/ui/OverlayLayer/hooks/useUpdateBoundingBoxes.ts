import {
  useDesignActions,
  useDesignBoundingBoxes,
  useDesignSelectedIds,
} from '@/shared/design/store';
import { BoundingBox } from '@/shared/design/type';

import Konva from 'konva';
import { useEffect, useRef } from 'react';

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

    const clientRects: BoundingBox[] = selectedShapes.current.map((shape) => {
      const rect = shape.getClientRect();
      return {
        x: rect.x / scale - x,
        y: rect.y / scale - y,
        width: rect.width / scale,
        height: rect.height / scale,
        rotation: shape.rotation(),
      };
    });

    if (clientRects.length === 0) {
      updateBoundingBoxes([]);
      return;
    }

    if (clientRects.length === 1) {
      updateBoundingBoxes(clientRects);
      return;
    }

    const xMin = Math.min(...clientRects.map((rect) => rect.x));
    const yMin = Math.min(...clientRects.map((rect) => rect.y));
    const xMax = Math.max(...clientRects.map((rect) => rect.x + rect.width));
    const yMax = Math.max(...clientRects.map((rect) => rect.y + rect.height));
    const combineClientRect: BoundingBox = {
      x: xMin,
      y: yMin,
      width: xMax - xMin,
      height: yMax - yMin,
      rotation: 0,
    };
    updateBoundingBoxes([combineClientRect, ...clientRects]);
  }, [scale, selectedIDs, stageRef, updateBoundingBoxes, x, y]);

  return { boundingBoxes, selectedShapes };
};
