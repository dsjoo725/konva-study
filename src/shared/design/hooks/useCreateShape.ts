import { CircleConfig, RectangleConfig } from '@/shared/design/type';
import { useDesignActions } from '@/shared/design/store';
import { shapeFactory } from '@/shared/design/services/ShapeFactory';

export const useCreateShape = () => {
  const { addShapes } = useDesignActions();

  const createRectangle = (config: RectangleConfig) => {
    const rectangle = shapeFactory.createRectangle(config);
    addShapes([rectangle]);
  };

  const createCircle = (config: CircleConfig) => {
    const circle = shapeFactory.createCircle(config);
    addShapes([circle]);
  };

  return { createRectangle, createCircle };
};
