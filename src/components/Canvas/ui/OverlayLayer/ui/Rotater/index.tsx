import { useRef } from 'react';
import { Image } from 'react-konva';
import Konva from 'konva';

import { useHandleRotater } from './hooks/useHandleRotater';

import { BoundingBox } from '@/shared/design/type';
import { ROTATION_ANCHOR_OFFSET, ROTATION_ANCHOR_SIZE } from '@/shared/design/constant';

interface Props {
  boundingBox: BoundingBox;
  selectedShapes: Konva.Shape[];
  scale: number;
}
const Rotater = ({ boundingBox, selectedShapes, scale }: Props) => {
  const { handleDragMove } = useHandleRotater(boundingBox, selectedShapes, scale);

  const imgRef = useRef<HTMLImageElement>(document.createElement('img'));
  imgRef.current.src = '/rotater.svg';

  return (
    <Image
      name="rotation-anchor"
      image={imgRef.current}
      x={boundingBox.width / 2}
      y={boundingBox.height}
      scaleX={1 / scale}
      scaleY={1 / scale}
      offsetX={ROTATION_ANCHOR_SIZE / 2}
      offsetY={ROTATION_ANCHOR_SIZE / 2 - ROTATION_ANCHOR_OFFSET}
      draggable
      onDragMove={handleDragMove}
    />
  );
};

export default Rotater;
