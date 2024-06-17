import { Text as KonvaText } from 'react-konva';

import { useHandleShape } from '@/shared/design/hooks/useHandleShape';
import { TextShape } from '@/shared/design/type';
import { Html } from 'react-konva-utils';
import { useDesignActions } from '@/shared/design/store';
import { useCanvas } from '@/shared/canvas/store';
import Konva from 'konva';
import { useRef } from 'react';

interface Props {
  text: TextShape;
}
const Text = ({ text }: Props) => {
  const canvas = useCanvas();
  const { handleDragEnd, handleClick } = useHandleShape();
  const { switchTextEdit } = useDesignActions();

  const textRef = useRef<Konva.Text>(null);

  return (
    <>
      <KonvaText
        ref={textRef}
        {...text}
        fontStyle={text.fontStyle.length === 0 ? 'normal' : text.fontStyle.join(' ')}
        draggable
        onDragEnd={handleDragEnd(text.id)}
        onClick={handleClick(text.id)}
        visible={!text.isEdit}
      />
      {text.isEdit && (
        <Html
          divProps={{
            style: { top: `${text.y * canvas.scale}px`, left: `${text.x * canvas.scale}px` },
          }}
        >
          <textarea
            value={text.text}
            spellCheck={false}
            autoFocus
            style={{
              border: 'none',
              outline: 'none',
              background: 'none',
              overflow: 'hidden',
              resize: 'none',
              width: `${textRef.current?.width()}px`,
              height: `${textRef.current?.height()}px`,
              fontSize: `${textRef.current?.fontSize()}px`,
              fontFamily: textRef.current?.fontFamily(),
              lineHeight: textRef.current?.lineHeight(),
            }}
            onBlur={() => {
              switchTextEdit(text.id);
            }}
          />
        </Html>
      )}
    </>
  );
};

export default Text;
