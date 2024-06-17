import { useRef } from 'react';
import Konva from 'konva';
import { Vector2d } from 'konva/lib/types';
import { KonvaEventObject } from 'konva/lib/Node';
import { useDesignActions, useSelectedShapeIds } from '@/shared/design/store';

export const useHandleTransformer = (selectedShapes: Konva.Shape[]) => {
  const {
    setSelectedShapeIds,
    addSelectedShapeIds,
    removeSelectedShapeIds,
    moveBoundingBoxes,
    moveSelectedShapes,
    switchTextEdit,
  } = useDesignActions();
  const selectedIDs = useSelectedShapeIds();
  const startPoints = useRef<Vector2d | null>(null);

  const handleDragStart = (e: KonvaEventObject<DragEvent>) => {
    // 앵커를 드래그할 때는 전체 도형을 이동하지 않기 위해 이후 처리를 중지합니다.
    if (e.target.name().includes('anchor')) return;

    startPoints.current = e.target.position();
  };

  const handleDragMove = (e: KonvaEventObject<DragEvent>) => {
    if (!startPoints.current) return;

    const { x: newX, y: newY } = e.target.position();
    const { x: oldX, y: oldY } = startPoints.current;

    const deltaX = newX - oldX;
    const deltaY = newY - oldY;

    // 선택된 모든 도형을 새 위치로 이동시킵니다.
    selectedShapes.forEach((shape) => {
      const shapeX = shape.x() + deltaX;
      const shapeY = shape.y() + deltaY;
      shape.position({ x: shapeX, y: shapeY });
    });

    startPoints.current = { x: newX, y: newY };
  };

  const handleDragEnd = (e: KonvaEventObject<DragEvent>) => {
    if (!startPoints.current) return;

    const { x, y } = e.target.position();
    // 도형 및 바운딩 박스의 위치를 업데이트합니다.
    moveSelectedShapes(x, y);
    moveBoundingBoxes(x, y);

    startPoints.current = null;
    // 드래그 대상의 위치를 초기화합니다.
    e.target.x(0);
    e.target.y(0);
  };

  const handleClick = (e: KonvaEventObject<DragEvent>) => {
    const stage = e.target.getStage();
    const pointerPosition = stage?.getPointerPosition();
    const shapeLayer = stage?.findOne('.shape-layer');

    if (!pointerPosition || !(shapeLayer instanceof Konva.Layer)) return;

    // 포인터 위치나 도형 레이어가 유효하지 않으면 처리를 중지합니다.
    const { x, y } = pointerPosition;
    const targetShape = shapeLayer.getIntersection({ x, y });

    // 포인터 위치에 도형이 없으면 처리를 중지합니다.
    if (!targetShape) return;

    const targetShapeId = targetShape.id();
    const isShapeSelected = selectedIDs.includes(targetShapeId);
    const isCtrlOrShiftPressed = e.evt.ctrlKey || e.evt.shiftKey;

    // 선택된 도형을 관리합니다.
    if (isShapeSelected) {
      if (isCtrlOrShiftPressed) {
        // Ctrl 또는 Shift 키가 눌려 있는 경우 선택된 도형을 선택 목록에서 제거합니다.
        removeSelectedShapeIds([targetShapeId]);
      } else if (selectedIDs.length > 1) {
        // 다른 도형이 선택되어 있는 경우 해당 도형만 선택합니다.
        setSelectedShapeIds([targetShapeId]);
      } else if (targetShape instanceof Konva.Text) {
        // 선택된 텍스트인 경우 텍스트 편집 모드로 전환합니다.
        switchTextEdit(targetShapeId);
      }
    } else {
      if (isCtrlOrShiftPressed) {
        // Ctrl 또는 Shift 키가 눌려 있는 경우 도형을 선택 목록에 추가합니다.
        addSelectedShapeIds([targetShapeId]);
      } else {
        // 도형을 단독으로 선택합니다.
        setSelectedShapeIds([targetShapeId]);
      }
    }
  };

  return { handleDragStart, handleDragMove, handleDragEnd, handleClick };
};
