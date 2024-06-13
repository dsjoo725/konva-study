import { useDesignActions } from '@/shared/design/store';
import { KonvaEventObject } from 'konva/lib/Node';

export const useHandleShape = () => {
  const { updateShapePosition, setSelectedShapeIds, addSelectedShapeIds } = useDesignActions();

  const handleDragEnd = (id: string) => (e: KonvaEventObject<DragEvent>) => {
    const { x, y } = e.target.position();
    // 드래그 종료 시 도형의 위치를 업데이트합니다.
    updateShapePosition(id, x, y);

    // Shift 또는 Ctrl 키가 눌려 있는 경우 선택된 도형 목록에 추가합니다.
    // 그렇지 않으면 선택된 도형 목록을 현재 도형만 포함하도록 업데이트합니다.
    if (e.evt.shiftKey || e.evt.ctrlKey) {
      addSelectedShapeIds([id]);
    } else {
      setSelectedShapeIds([id]);
    }
  };

  const handleClick = (id: string) => (e: KonvaEventObject<DragEvent>) => {
    // Shift 또는 Ctrl 키가 눌려 있는 경우 선택된 도형 목록에 추가합니다.
    // 그렇지 않으면 선택된 도형 목록을 현재 도형만 포함하도록 업데이트합니다.
    if (e.evt.shiftKey || e.evt.ctrlKey) {
      addSelectedShapeIds([id]);
    } else {
      setSelectedShapeIds([id]);
    }
  };

  return { handleDragEnd, handleClick };
};
