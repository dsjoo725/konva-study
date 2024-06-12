import { useRef } from 'react';
import { Image } from 'react-konva';

import { BoundingBox } from '@/shared/design/type';
import { useHandleRotater } from './hooks/useHandleRotater';

export const ROTATION_ANCHOR_OFFSET: number = 28;
export const ROTATION_ANCHOR_SIZE: number = 28;

interface Props {
  boundingBox: BoundingBox;
  scale: number;
}
const Rotater = ({ boundingBox, scale }: Props) => {
  const { handleDragMove } = useHandleRotater(boundingBox, scale);

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
