import { RectangleConfig, CircleConfig } from './type';

export const DEFAULT_RECTANGLE_CONFIG: RectangleConfig = {
  x: 200,
  y: 200,
  width: 100,
  height: 200,
  stroke: 'black',
  strokeWidth: 20,
  fill: 'white',
  rotation: 0,
};

export const DEFAULT_CIRCLE_CONFIG: CircleConfig = {
  x: 200,
  y: 200,
  radiusX: 100,
  radiusY: 100,
  stroke: 'black',
  strokeWidth: 2,
  fill: 'white',
  rotation: 0,
};

export const ROTATION_ANCHOR_OFFSET = 28 as const;
export const ROTATION_ANCHOR_SIZE = 28 as const;
