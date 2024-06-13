import { useRef } from 'react';
import { KonvaEventObject } from 'konva/lib/Node';
import { Vector2d } from 'konva/lib/types';
import Konva from 'konva';
import { useDesignActions } from '@/shared/design/store';

export const useHandleStage = () => {
  const { updateSelectedIds } = useDesignActions();
  const startPoints = useRef<Vector2d | null>(null);

  const handleMouseDown = (e: KonvaEventObject<DragEvent>) => {
    const stage = e.target.getStage();
    if (!stage) return;

    const isStageClicked = e.target === stage;
    const pointerPosition = stage.getPointerPosition();
    if (!isStageClicked || !pointerPosition) return;

    startPoints.current = pointerPosition;

    const selectBox = stage.findOne('.select-box');
    if (selectBox) {
      selectBox.setAbsolutePosition(startPoints.current);
      selectBox.visible(true);
    }
  };

  const handleMouseMove = (e: KonvaEventObject<DragEvent>) => {
    if (!startPoints.current) return;

    const stage = e.target.getStage();
    if (!stage) return;

    const pointerPosition = stage.getPointerPosition();
    if (!pointerPosition) return;

    const selectBox = stage.findOne('.select-box');
    if (selectBox) {
      selectBox.width(pointerPosition.x - startPoints.current.x);
      selectBox.height(pointerPosition.y - startPoints.current.y);
    }
  };

  const handleMouseUp = (e: KonvaEventObject<DragEvent>) => {
    if (!startPoints.current) return;

    const stage = e.target.getStage();
    if (!stage) return;

    const selectBox = stage.findOne('.select-box');
    if (!selectBox) return;

    const shapeLayer = stage.findOne('.shape-layer');
    if (shapeLayer instanceof Konva.Layer) {
      const selectBoxRect = selectBox.getClientRect();
      const selectedIds = shapeLayer.children
        .filter((shape) => Konva.Util.haveIntersection(selectBoxRect, shape.getClientRect()))
        .map((shape) => shape.id());

      updateSelectedIds(selectedIds);
    }

    selectBox.width(0);
    selectBox.height(0);
    startPoints.current = null;
  };

  return { handleMouseDown, handleMouseMove, handleMouseUp };
};
