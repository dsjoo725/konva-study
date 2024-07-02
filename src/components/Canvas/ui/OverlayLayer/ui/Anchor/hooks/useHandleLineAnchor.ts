import Konva from 'konva';
import { KonvaEventObject } from 'konva/lib/Node';

import { useDesignActions } from '@/shared/design/store';

const snapToAngles = (movingPoint: Konva.Vector2d, referencePoint: Konva.Vector2d) => {
  const deltaX = movingPoint.x - referencePoint.x;
  const deltaY = movingPoint.y - referencePoint.y;
  const angle = Math.atan2(deltaY, deltaX);
  const snapAngle = Math.round(angle / (Math.PI / 2)) * (Math.PI / 2);
  const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

  return {
    x: referencePoint.x + Math.cos(snapAngle) * distance,
    y: referencePoint.y + Math.sin(snapAngle) * distance,
  };
};

const getReferencePoint = (anchor: Konva.Shape, points: number[]) => {
  const anchorName = anchor.name();

  if (anchorName === 'left-anchor') {
    return { x: points[2], y: points[3] };
  } else if (anchorName === 'right-anchor') {
    return { x: points[0], y: points[1] };
  } else {
    return { x: anchor.x(), y: anchor.y() };
  }
};

const getUpdatePoints = (anchor: Konva.Shape, movingPoint: Konva.Vector2d, points: number[]) => {
  const anchorName = anchor.name();

  if (anchorName === 'left-anchor') {
    return [movingPoint.x, movingPoint.y, points[2], points[3]];
  } else if (anchorName === 'right-anchor') {
    return [points[0], points[1], movingPoint.x, movingPoint.y];
  } else {
    return points;
  }
};

export const useHandleLineAnchor = (selectedShapes: Konva.Shape[]) => {
  const { setBoundingBoxes, updateShapeAttributes } = useDesignActions();

  const handleDragMove = (e: KonvaEventObject<DragEvent>) => {
    const anchor = e.target;
    const line = selectedShapes[0] as Konva.Line;
    if (!(anchor instanceof Konva.Shape)) return;

    let movingPoint = { x: anchor.x(), y: anchor.y() };
    const referencePoint = getReferencePoint(anchor, line.points());

    if (e.evt.shiftKey) {
      movingPoint = snapToAngles(movingPoint, referencePoint);
      anchor.x(movingPoint.x);
      anchor.y(movingPoint.y);
    }

    const updatePoints = getUpdatePoints(anchor, movingPoint, line.points());

    const updatedBoundingBox = {
      x: line.x(),
      y: line.y(),
      width: 0,
      height: 0,
      points: updatePoints,
      rotation: line.rotation(),
    };
    const updatedShapeAttribute = {
      id: line.id(),
      points: updatePoints,
    };
    setBoundingBoxes([updatedBoundingBox]);
    updateShapeAttributes([updatedShapeAttribute]);
  };

  return { handleDragMove };
};
