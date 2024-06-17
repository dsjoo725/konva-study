import { CircleConfig, RectangleConfig, TextConfig } from '@/shared/design/type';
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

  const createText = (config: TextConfig) => {
    const text = shapeFactory.createText(config);
    addShapes([text]);
  };

  return { createRectangle, createCircle, createText };
};
