import { Layer } from 'react-konva';

import { useDesignActions, useShapes } from '@/shared/design/store';

import Rectangle from './ui/Rectangle';
import Circle from './ui/Cirlce';
import Text from './ui/Text';
import Konva from 'konva';
import { useEffect, useRef } from 'react';
import Line from './ui/Line';

interface Props {
  x: number;
  y: number;
}
const ShapesLayer = ({ x, y }: Props) => {
  const shapes = useShapes();
  const { setShapeLayer } = useDesignActions();
  const shapeLayerRef = useRef<Konva.Layer>(null);

  useEffect(() => {
    if (!shapeLayerRef.current) return;

    setShapeLayer(shapeLayerRef.current);
  });

  return (
    <Layer name="shape-layer" ref={shapeLayerRef} x={x} y={y}>
      {shapes.map((shape) => {
        switch (shape.shapeType) {
          case 'rectangle':
            return <Rectangle key={shape.id} rectangle={shape} />;
          case 'circle':
            return <Circle key={shape.id} circle={shape} />;
          case 'text':
            return <Text key={shape.id} text={shape} />;
          case 'line':
            return <Line key={shape.id} line={shape} />;
          default:
            return null;
        }
      })}
    </Layer>
  );
};

export default ShapesLayer;
