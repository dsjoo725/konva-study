import { RectangleConfig, CircleConfig } from './type';

export const DEFAULT_RECTANGLE_CONFIG: RectangleConfig = {
  x: 200,
  y: 200,
  width: 100,
  height: 200,
  stroke: 'black',
  strokeWidth: 4,
  fill: 'white',
  rotation: 45,
};

export const DEFAULT_CIRCLE_CONFIG: CircleConfig = {
  x: 0,
  y: 0,
  radiusX: 100,
  radiusY: 100,
  stroke: 'black',
  strokeWidth: 4,
  fill: 'white',
  rotation: 0,
};
