import { Layer, Rect } from 'react-konva';
import { usePaper } from '@/shared/paper/store';

interface Props {
  x: number;
  y: number;
}
export const BackgroudLayer = ({ x, y }: Props) => {
  const paper = usePaper();

  return (
    <Layer x={x} y={y} name="background-layer">
      <Rect
        name="bg-paper"
        x={0}
        y={0}
        width={paper.width}
        height={paper.height}
        fill="white"
        cornerRadius={4}
      />
    </Layer>
  );
};
