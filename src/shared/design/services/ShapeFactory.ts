import { v4 as uuidv4 } from 'uuid';

import {
  CircleConfig,
  CircleShape,
  LineConfig,
  LineShape,
  RectangleConfig,
  RectangleShape,
  TextConfig,
  TextShape,
} from '@/shared/design/type';

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
      shapeType: 'rectangle',
      ...rectangle,
    };
  }

  public createCircle(circle: CircleConfig): CircleShape {
    return {
      id: uuidv4(),
      shapeType: 'circle',
      ...circle,
    };
  }

  public createText(text: TextConfig): TextShape {
    return {
      id: uuidv4(),
      shapeType: 'text',
      ...text,
    };
  }

  public createLine(line: LineConfig): LineShape {
    return {
      id: uuidv4(),
      shapeType: 'line',
      ...line,
    };
  }
}

export const shapeFactory: ShapeFactory = ShapeFactory.getInstance();
