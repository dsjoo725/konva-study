import { RectangleConfig, CircleConfig, TextConfig, LineConfig } from './type';

export const DEFAULT_RECTANGLE_CONFIG: RectangleConfig = {
  x: 200,
  y: 200,
  width: 100,
  height: 100,
  stroke: 'black',
  strokeWidth: 2,
  fill: 'white',
  rotation: 0,
};

export const DEFAULT_CIRCLE_CONFIG: CircleConfig = {
  x: 200,
  y: 200,
  radiusX: 50,
  radiusY: 50,
  stroke: 'black',
  strokeWidth: 2,
  fill: 'white',
  rotation: 0,
};

export const DEFAULT_LINE_CONFIG: LineConfig = {
  x: 200,
  y: 200,
  rotation: 0,
  stroke: 'black',
  strokeWidth: 2,
  points: [0, 0, 100, 100],
};

export const DEFAULT_TEXT_CONFIG: TextConfig = {
  x: 200,
  y: 200,
  align: 'left',
  fontFamily: 'Arial',
  fontSize: 32,
  fontStyle: [],
  isReverse: false,
  isEdit: false,
  rotation: 0,
  text: 'Text Object',
};

export const ROTATION_ANCHOR_OFFSET = 28 as const;
export const ROTATION_ANCHOR_SIZE = 28 as const;
