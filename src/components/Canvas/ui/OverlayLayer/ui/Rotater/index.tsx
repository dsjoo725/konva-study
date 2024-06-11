import { useRef } from 'react';
import { Image } from 'react-konva';

import { BoundingBox } from '@/shared/design/type';
import { useHandleRotater } from './hooks/useHandleRotater';

const ROTATION_ANCHOR_OFFSET: number = 12;

interface Props {
  boundingBox: BoundingBox;
  scale: number;
}
const Rotater = ({ boundingBox, scale }: Props) => {
  const { handleDragMove } = useHandleRotater();

  const imgRef = useRef<HTMLImageElement>(document.createElement('img'));
  imgRef.current.src = '/rotater.svg';

  return (
    <Image
      name="rotater-anchor"
      image={imgRef.current}
      x={boundingBox.x + boundingBox.width / 2}
      y={
        boundingBox.y +
        boundingBox.height +
        (imgRef.current.height / 2 + ROTATION_ANCHOR_OFFSET) / scale
      }
      scaleX={1 / scale}
      scaleY={1 / scale}
      offsetX={imgRef.current.width / 2}
      offsetY={imgRef.current.height / 2}
      draggable
      onDragMove={handleDragMove}
    />
  );
};

export default Rotater;
