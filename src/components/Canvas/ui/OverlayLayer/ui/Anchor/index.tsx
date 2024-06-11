import { Rect } from 'react-konva';
import { useHandleAnchor } from './hooks/useHandleAnchor';

interface Props {
  name: string;
  x: number;
  y: number;
  scale: number;
}
const Anchor = ({ name, x, y, scale }: Props) => {
  const { handleDragMove } = useHandleAnchor();
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
      onDragMove={handleDragMove}
    />
  );
};

export default Anchor;
