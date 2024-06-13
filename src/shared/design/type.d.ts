export type BaseShape = {
  id: string;
  shapeType: ShapeType;
  x: number;
  y: number;
  rotation: number;
};

export type ShapeType = 'rectangle' | 'circle';

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

export type Shape = RectangleShape | CircleShape;

export type BoundingBox = {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
};
