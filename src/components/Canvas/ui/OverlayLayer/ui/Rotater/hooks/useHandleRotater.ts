import { KonvaEventObject } from 'konva/lib/Node';

export const useHandleRotater = () => {
  const handleDragMove = (e: KonvaEventObject<DragEvent>) => {};

  return { handleDragMove };
};
