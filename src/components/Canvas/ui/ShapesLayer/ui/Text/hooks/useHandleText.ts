import { useDesignActions } from '@/shared/design/store';
import { TextShape } from '@/shared/design/type';
import Konva from 'konva';
import { ChangeEvent, FocusEvent, KeyboardEvent, useRef, useState } from 'react';

export const useHandleText = (text: TextShape) => {
  const { switchTextEdit, setSelectedShapeIds } = useDesignActions();

  const textRef = useRef<Konva.Text>(null);
  const [inputValue, setInputValue] = useState(text.text);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    textRef.current?.text(e.target.value);
    setInputValue(e.target.value);
  };

  const handleFocus = (e: FocusEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    textarea.setSelectionRange(textarea.value.length, textarea.value.length);
  };

  const handleBlur = () => {
    switchTextEdit(text.id);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Escape') {
      setSelectedShapeIds([text.id]);
      (e.target as HTMLTextAreaElement).blur();
    }

    e.stopPropagation();
  };

  return { textRef, inputValue, handleBlur, handleFocus, handleKeyDown, handleChange };
};
