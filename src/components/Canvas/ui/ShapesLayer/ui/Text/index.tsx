import { Text as KonvaText } from 'react-konva';

import { useHandleShape } from '@/shared/design/hooks/useHandleShape';
import { TextAlign, TextShape } from '@/shared/design/type';
import { Html } from 'react-konva-utils';

import { useCanvas } from '@/shared/canvas/store';
import { useHandleText } from './hooks/useHandleText';

interface Props {
  text: TextShape;
}
const Text = ({ text }: Props) => {
  const canvas = useCanvas();
  const { handleDragEnd, handleClick } = useHandleShape();
  const { textRef, inputValue, handleBlur, handleFocus, handleKeyDown, handleChange } =
    useHandleText(text);

  const alignOffset = (align: TextAlign) => {
    if (!textRef.current) return 0;

    switch (align) {
      case 'left':
        return 0;
      case 'center':
        return textRef.current.width() / 2;
      case 'right':
        return textRef.current.width();
      default:
        return 0;
    }
  };

  return (
    <>
      <KonvaText
        ref={textRef}
        {...text}
        fontStyle={text.fontStyle.length === 0 ? 'normal' : text.fontStyle.join(' ')}
        offsetX={alignOffset(text.align)}
        lineHeight={1.2}
        draggable
        onDragEnd={handleDragEnd(text.id)}
        onClick={handleClick(text.id)}
        visible={!text.isEdit}
      />
      {text.isEdit && textRef.current && (
        <Html
          divProps={{
            style: {
              top: `${text.y * canvas.scale}px`,
              left: `${text.x * canvas.scale - alignOffset(text.align) * canvas.scale}px`,
            },
          }}
        >
          <textarea
            value={inputValue}
            spellCheck={false}
            autoFocus
            style={{
              boxSizing: 'content-box',
              outline: '2px solid rgb(255, 130, 100)',
              border: 'none',
              background: 'none',
              overflow: 'hidden',
              resize: 'none',
              width: `${textRef.current.width() * canvas.scale}px`,
              height: `${textRef.current.height() * canvas.scale}px`,
              lineHeight: textRef.current.lineHeight(),
              fontSize: `${textRef.current.fontSize() * canvas.scale}px`,
              fontFamily: textRef.current.fontFamily(),
              fontWeight: textRef.current.fontStyle().includes('bold') ? 'bold' : 'normal',
              fontStyle: textRef.current.fontStyle().includes('italic') ? 'italic' : 'normal',
              textAlign: textRef.current.align() as TextAlign,
              transform: `rotateZ(${textRef.current?.rotation()}deg) scaleX(${1 / canvas.scale}) scaleY(${1 / canvas.scale})`,
              transformOrigin: 'left top',
            }}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
          />
        </Html>
      )}
    </>
  );
};

export default Text;
