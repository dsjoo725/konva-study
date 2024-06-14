import { shapeController } from '@/shared/design/services/ShapeController';
import {
  useBoundingBoxes,
  useDesignActions,
  useSelectedShapeIds,
  useShapes,
} from '@/shared/design/store';
import { KeyboardEvent } from 'react';

const extractKey = (e: KeyboardEvent<HTMLDivElement>): string => {
  const keys = [];

  if (e.ctrlKey || e.metaKey) keys.push('ctrl');
  if (e.shiftKey) keys.push('shift');
  if (e.altKey) keys.push('alt');

  keys.push(e.key.toLowerCase());

  return keys.join('+');
};

export const useHandleKeyboard = () => {
  const shapes = useShapes();
  const selectedShapeIds = useSelectedShapeIds();
  const { setSelectedShapeIds, addShapes, removeShapes, moveSelectedShapes, moveBoundingBoxes } =
    useDesignActions();

  const handleKeydown = (e: KeyboardEvent<HTMLDivElement>) => {
    // 키 조합은 반드시 'ctrl', 'shift', 'alt' 순으로 작성해야 합니다.
    const keyActions: { [key: string]: () => void } = {
      'ctrl+a': () => {
        shapeController.selectAll(shapes, setSelectedShapeIds);
      },
      'ctrl+c': () => {
        shapeController.copy(shapes, selectedShapeIds);
      },
      'ctrl+v': () => {
        shapeController.paste(addShapes, setSelectedShapeIds);
      },
      'ctrl+x': () => {
        shapeController.cut(shapes, selectedShapeIds, removeShapes);
      },
      'ctrl+d': () => {
        shapeController.duplicate(shapes, selectedShapeIds, addShapes, setSelectedShapeIds);
      },
      'ctrl+z': () => {
        console.log('되돌리기');
      },
      'ctrl+y': () => {
        console.log('다시실행');
      },
      'ctrl+shift+z': () => {
        console.log('다시실행');
      },
      delete: () => {
        shapeController.delete(selectedShapeIds, removeShapes);
      },
      arrowup: () => {
        shapeController.move(moveSelectedShapes, moveBoundingBoxes, 0, -1);
      },
      arrowdown: () => {
        shapeController.move(moveSelectedShapes, moveBoundingBoxes, 0, 1);
      },
      arrowleft: () => {
        shapeController.move(moveSelectedShapes, moveBoundingBoxes, -1, 0);
      },
      arrowright: () => {
        shapeController.move(moveSelectedShapes, moveBoundingBoxes, 1, 0);
      },
      'shift+arrowup': () => {
        shapeController.move(moveSelectedShapes, moveBoundingBoxes, 0, -10);
      },
      'shift+arrowdown': () => {
        shapeController.move(moveSelectedShapes, moveBoundingBoxes, 0, 10);
      },
      'shift+arrowleft': () => {
        shapeController.move(moveSelectedShapes, moveBoundingBoxes, -10, 0);
      },
      'shift+arrowright': () => {
        shapeController.move(moveSelectedShapes, moveBoundingBoxes, 10, 0);
      },
    };

    const hotKey = extractKey(e);
    if (keyActions[hotKey]) {
      e.preventDefault();
      keyActions[hotKey]();
    }
  };

  return { handleKeydown };
};
