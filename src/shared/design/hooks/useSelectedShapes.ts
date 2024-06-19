import { useSelectedShapeIds, useShapes } from '@/shared/design/store';

export const useSelectedShapes = () => {
  const shapes = useShapes();
  const selectedShapeIds = useSelectedShapeIds();

  const selectedShapes = shapes.filter((shape) => selectedShapeIds.includes(shape.id));

  return { selectedShapes };
};
