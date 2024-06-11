import { MutableRefObject, useRef } from 'react';
import Konva from 'konva';
import { Vector2d } from 'konva/lib/types';
import { KonvaEventObject } from 'konva/lib/Node';
import { useDesignActions } from '@/shared/design/store';

export const useHandleBoundingBoxes = (selectedShapes: MutableRefObject<Konva.Shape[]>) => {
  const { updateBoundingBoxesPosition, updateSelectedShapesPosition } = useDesignActions();
  const startPoints = useRef<Vector2d | null>(null);

  const handleDragStart = (e: KonvaEventObject<DragEvent>) => {
    // 앵커를 드래그할 때는 전체 도형을 이동하지 않기 위해 이후 처리를 중지합니다.
    if (e.target.name().includes('anchor')) return;

    startPoints.current = e.target.position();
  };

  const handleDragMove = (e: KonvaEventObject<DragEvent>) => {
    if (!startPoints.current) return;

    const { x: newX, y: newY } = e.target.position();
    const { x: oldX, y: oldY } = startPoints.current;

    const deltaX = newX - oldX;
    const deltaY = newY - oldY;

    selectedShapes.current.forEach((shape) => {
      const shapeX = shape.x() + deltaX;
      const shapeY = shape.y() + deltaY;
      shape.position({ x: shapeX, y: shapeY });
    });

    startPoints.current = { x: newX, y: newY };
  };

  const handleDragEnd = (e: KonvaEventObject<DragEvent>) => {
    if (!startPoints.current) return;

    const { x, y } = e.target.position();
    updateSelectedShapesPosition(x, y);
    updateBoundingBoxesPosition(x, y);

    startPoints.current = null;
    e.target.x(0);
    e.target.y(0);
  };

  return { handleDragStart, handleDragMove, handleDragEnd };
};