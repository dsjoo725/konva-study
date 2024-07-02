import Konva from 'konva';

import { Circle, Rect } from 'react-konva';
import { useHandleAnchor } from './hooks/useHandleAnchor';
import { useHandleLineAnchor } from './hooks/useHandleLineAnchor';

interface Props {
  name: string;
  x: number;
  y: number;
  selectedShapes: Konva.Shape[];
  scale: number;
}
const Anchor = ({ name, x, y, selectedShapes, scale }: Props) => {
  const { handleDragMove: handleDragMoveShape } = useHandleAnchor(selectedShapes);
  const { handleDragMove: handleDragMoveLine } = useHandleLineAnchor(selectedShapes);

  if (name === 'left' || name === 'right')
    return (
      <Circle
        name={`${name}-anchor`}
        x={x}
        y={y}
        radius={5 / scale}
        stroke={'rgba(247, 107, 21, 1)'}
        strokeWidth={2 / scale}
        fill="white"
        draggable
        onDragMove={handleDragMoveLine}
      />
    );

  return (
    <Rect
      name={`${name}-anchor`}
      x={x}
      y={y}
      width={10 / scale}
      height={10 / scale}
      offsetX={5 / scale}
      offsetY={5 / scale}
      stroke={'rgba(247, 107, 21, 1)'}
      strokeWidth={2 / scale}
      cornerRadius={1 / scale}
      fill="white"
      draggable
      onDragMove={handleDragMoveShape}
    />
  );
};

export default Anchor;
