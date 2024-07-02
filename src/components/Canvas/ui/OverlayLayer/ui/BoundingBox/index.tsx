import { Line, Rect } from 'react-konva';
import { BoundingBox as TBoundingBox } from '@/shared/design/type';

interface Props {
  index: number;
  boundingBox: TBoundingBox;
  scale: number;
}
const BoundingBox = ({ index, boundingBox, scale }: Props) => {
  if (boundingBox.points)
    return (
      <Line
        x={boundingBox.x}
        y={boundingBox.y}
        points={boundingBox.points}
        rotation={boundingBox.rotation}
        stroke={'rgba(247, 107, 21, 0.5)'}
        strokeWidth={10 / scale}
      />
    );

  return (
    <Rect
      name={`boundingBox-${index}`}
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
