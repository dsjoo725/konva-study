import { v4 as uuidv4 } from 'uuid';

import { CircleConfig, CircleShape, RectangleConfig, RectangleShape } from '@/shared/design/type';

class ShapeFactory {
  private static instance: ShapeFactory;

  private constructor() {}

  public static getInstance(): ShapeFactory {
    if (!ShapeFactory.instance) {
      ShapeFactory.instance = new ShapeFactory();
    }
    return ShapeFactory.instance;
  }

  public createRectangle(rectangle: RectangleConfig): RectangleShape {
    return {
      id: uuidv4(),
      type: 'rectangle',
      ...rectangle,
    };
  }

  public createCircle(circle: CircleConfig): CircleShape {
    return {
      id: uuidv4(),
      type: 'circle',
      ...circle,
    };
  }
}

export const shapeFactory: ShapeFactory = ShapeFactory.getInstance();
