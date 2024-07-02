import { Line as KonvaLine } from 'react-konva';

import { useHandleShape } from '@/shared/design/hooks/useHandleShape';
import { LineShape } from '@/shared/design/type';

interface Props {
  line: LineShape;
}
const Line = ({ line }: Props) => {
  const { handleDragEnd, handleClick } = useHandleShape();

  return (
    <KonvaLine
      {...line}
      hitStrokeWidth={Math.max(line.strokeWidth, 16)}
      draggable
      onDragEnd={handleDragEnd(line.id)}
      onClick={handleClick(line.id)}
    />
  );
};

export default Line;
