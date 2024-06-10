export type BaseShape = {
  id: string;
  type: ShapeType;
  x: number;
  y: number;
};

export type ShapeType = 'rectangle' | 'circle';

export type RectangleShape = BaseShape & {
  type: 'rectangle';
  width: number;
  height: number;
  stroke: 'black';
  strokeWidth: number;
  fill: 'white';
};
export type RectangleConfig = Omit<RectangleShape, 'id' | 'type'>;

export type CircleShape = BaseShape & {
  type: 'circle';
  radiusX: number;
  radiusY: number;
  stroke: 'black';
  strokeWidth: number;
  fill: 'white';
};
export type CircleConfig = Omit<CircleShape, 'id' | 'type'>;

export type Shape = RectangleShape | CircleShape;

export type BoundingBox = {
  x: number;
  y: number;
  width: number;
  height: number;
};
