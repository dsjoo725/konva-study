import { Ellipse } from 'react-konva';

import { useHandleShape } from '@/shared/design/hooks';
import { CircleShape } from '@/shared/design/type';

interface Props {
  circle: CircleShape;
}
const Circle = ({ circle }: Props) => {
  const { handleDragEnd, handleClick } = useHandleShape();

  return (
    <Ellipse
      {...circle}
      offsetX={-circle.radiusX}
      offsetY={-circle.radiusY}
      draggable
      onDragEnd={handleDragEnd(circle.id)}
      onClick={handleClick(circle.id)}
    />
  );
};

export default Circle;
