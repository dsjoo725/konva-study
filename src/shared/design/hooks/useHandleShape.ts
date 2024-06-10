import { useDesignActions } from '@/shared/design/store';
import { KonvaEventObject } from 'konva/lib/Node';

export const useHandleShape = () => {
  const { updateShapePosition, updateSelectedIds, addSelectedIds } = useDesignActions();

  const handleDragEnd = (id: string) => (e: KonvaEventObject<DragEvent>) => {
    const { x, y } = e.target.position();
    updateShapePosition(id, x, y);

    if (e.evt.shiftKey || e.evt.ctrlKey) {
      addSelectedIds([id]);
    } else {
      updateSelectedIds([id]);
    }
  };

  const handleClick = (id: string) => (e: KonvaEventObject<DragEvent>) => {
    if (e.evt.shiftKey || e.evt.ctrlKey) {
      addSelectedIds([id]);
    } else {
      updateSelectedIds([id]);
    }
  };

  return { handleDragEnd, handleClick };
};
