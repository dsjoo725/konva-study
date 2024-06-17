import { Layer } from 'react-konva';

import { useShapes } from '@/shared/design/store';

import Rectangle from './ui/Rectangle';
import Circle from './ui/Cirlce';
import Text from './ui/Text';

interface Props {
  x: number;
  y: number;
}
const ShapesLayer = ({ x, y }: Props) => {
  const shapes = useShapes();

  return (
    <Layer name="shape-layer" x={x} y={y}>
      {shapes.map((shape) => {
        switch (shape.shapeType) {
          case 'rectangle':
            return <Rectangle key={shape.id} rectangle={shape} />;
          case 'circle':
            return <Circle key={shape.id} circle={shape} />;
          case 'text':
            return <Text key={shape.id} text={shape} />;
          default:
            return null;
        }
      })}
    </Layer>
  );
};

export default ShapesLayer;
