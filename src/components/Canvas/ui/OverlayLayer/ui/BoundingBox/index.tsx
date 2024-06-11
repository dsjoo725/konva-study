import { Rect } from 'react-konva';
import { BoundingBox as TBoundingBox } from '@/shared/design/type';

interface Props {
  boundingBox: TBoundingBox;
  scale: number;
}
const BoundingBox = ({ boundingBox, scale }: Props) => {
  return (
    <Rect
      x={boundingBox.x}
      y={boundingBox.y}
      width={boundingBox.width}
      height={boundingBox.height}
      rotation={boundingBox.rotation}
      stroke={'rgba(247, 107, 21, 1)'}
      strokeWidth={2 / scale}
    />
  );
};

export default BoundingBox;
