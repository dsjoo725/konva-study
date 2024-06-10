import { Layer } from 'react-konva';

import { useDesignShapes } from '@/shared/design/store';

import Rectangle from './ui/Rectangle';
import Circle from './ui/Cirlce';

interface Props {
  x: number;
  y: number;
}
const ShapesLayer = ({ x, y }: Props) => {
  const shapes = useDesignShapes();

  return (
    <Layer x={x} y={y}>
      {shapes.map((shape) => {
        switch (shape.type) {
          case 'rectangle':
            return <Rectangle key={shape.id} rectangle={shape} />;
          case 'circle':
            return <Circle key={shape.id} circle={shape} />;
          default:
            return null;
        }
      })}
    </Layer>
  );
};

export default ShapesLayer;
