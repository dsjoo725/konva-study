import Konva from 'konva';
import { ReactNode } from 'react';
import { Group } from 'react-konva';

import { useHandleTransformer } from './hooks/useHandleTransformer';

interface Props {
  selectedShapes: Konva.Shape[];
  children: ReactNode;
}
const Transformer = ({ selectedShapes, children }: Props) => {
  const { handleClick, handleDragEnd, handleDragMove, handleDragStart } =
    useHandleTransformer(selectedShapes);

  return (
    <Group
      draggable
      onDragStart={handleDragStart}
      onDragMove={handleDragMove}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
    >
      {children}
    </Group>
  );
};

export default Transformer;
