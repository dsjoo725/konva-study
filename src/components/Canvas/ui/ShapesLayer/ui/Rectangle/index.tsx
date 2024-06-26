import { Rect } from 'react-konva';

import { useHandleShape } from '@/shared/design/hooks/useHandleShape';
import { RectangleShape } from '@/shared/design/type';

interface Props {
  rectangle: RectangleShape;
}
const Rectangle = ({ rectangle }: Props) => {
  const { handleDragEnd, handleClick } = useHandleShape();

  return (
    <Rect
      {...rectangle}
      draggable
      onDragEnd={handleDragEnd(rectangle.id)}
      onClick={handleClick(rectangle.id)}
    />
  );
};

export default Rectangle;
