import { Text as KonvaText } from 'react-konva';

import { useHandleShape } from '@/shared/design/hooks/useHandleShape';
import { TextShape } from '@/shared/design/type';

interface Props {
  text: TextShape;
}
const Text = ({ text }: Props) => {
  const { handleDragEnd, handleClick } = useHandleShape();

  return (
    <KonvaText
      {...text}
      fontStyle={text.fontStyle.length === 0 ? 'normal' : text.fontStyle.join(' ')}
      draggable
      onDragEnd={handleDragEnd(text.id)}
      onClick={handleClick(text.id)}
    />
  );
};

export default Text;
