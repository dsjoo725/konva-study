import { useSelectedShapeIds, useShapeLayer, useShapes } from '@/shared/design/store';
import Konva from 'konva';

export const useSelectedShapes = () => {
  const shapes = useShapes();
  const shapeLayer = useShapeLayer();
  const selectedShapeIds = useSelectedShapeIds();

  const selectedShapes = shapes.filter((shape) => selectedShapeIds.includes(shape.id));

  const konva = {
    selectedShapes: (shapeLayer?.children as Konva.Shape[]) ?? [],
  };

  return { selectedShapes, konva };
};
