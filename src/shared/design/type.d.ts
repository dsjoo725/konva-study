export type BaseShape = {
  id: string;
  shapeType: ShapeType;
  x: number;
  y: number;
  rotation: number;
};

export type ShapeType = 'rectangle' | 'circle' | 'text';

export type RectangleShape = BaseShape & {
  shapeType: 'rectangle';
  width: number;
  height: number;
  stroke: 'black';
  strokeWidth: number;
  fill: 'white';
};
export type RectangleConfig = Omit<RectangleShape, 'id' | 'shapeType'>;

export type CircleShape = BaseShape & {
  shapeType: 'circle';
  radiusX: number;
  radiusY: number;
  stroke: 'black';
  strokeWidth: number;
  fill: 'white';
};
export type CircleConfig = Omit<CircleShape, 'id' | 'shapeType'>;

export type FontStyle = 'italic' | 'bold';
export type TextAlign = 'left' | 'center' | 'right';

export type TextShape = BaseShape & {
  shapeType: 'text';
  fontFamily: string;
  fontSize: number;
  fontStyle: FontStyle[];
  text: string;
  align: TextAlign;
  isReverse: boolean;
  isEdit: boolean;
};
export type TextConfig = Omit<TextShape, 'id' | 'shapeType'>;

export type Shape = RectangleShape | CircleShape | TextShape;

export type BoundingBox = {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
};
