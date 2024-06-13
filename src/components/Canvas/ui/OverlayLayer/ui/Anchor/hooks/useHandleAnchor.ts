import Konva from 'konva';
import { KonvaEventObject } from 'konva/lib/Node';

import { useDesignActions, useDesignBoundingBoxes } from '@/shared/design/store';
import { calculateRelativeTransform } from '@/shared/design/utils/transform';
import { BoundingBox } from '@/shared/design/type';
import {
  updateBoundingBoxesWithTransform,
  updateSelectedShapesWithTransform,
} from '@/shared/design/utils/transform';

const MIN_WIDTH = 10 as const;
const MIN_HEIGHT = 10 as const;

const calculateNewBoundingBox = (
  topLeft: Konva.Node,
  bottomRight: Konva.Node,
  rotation: number,
  overlayLayer?: Konva.Node,
) => {
  return {
    x: topLeft.getAbsolutePosition(overlayLayer).x,
    y: topLeft.getAbsolutePosition(overlayLayer).y,
    width: bottomRight.x() - topLeft.x(),
    height: bottomRight.y() - topLeft.y(),
    rotation: rotation,
  };
};

const setPosition = (topLeft: Konva.Node, bottomRight: Konva.Node, boundingBox: BoundingBox) => {
  topLeft.position({ x: 0, y: 0 });
  bottomRight.position({ x: boundingBox.width, y: boundingBox.height });
};

export const useHandleAnchor = (selectedShapes: Konva.Shape[]) => {
  const boundingBoxes = useDesignBoundingBoxes();
  const { updateBoundingBoxes, updateSelectedShapes } = useDesignActions();

  const handleDragMove = (e: KonvaEventObject<DragEvent>) => {
    const anchor = e.target;
    const anchorName = anchor.name();

    const topLeft = anchor.getParent()?.findOne('.top-left-anchor');
    const bottomRight = anchor.getParent()?.findOne('.bottom-right-anchor');

    if (!topLeft || !bottomRight) return;

    // 각 앵커의 위치를 기반으로 topLeft와 bottomRight 위치를 업데이트합니다.
    switch (anchorName) {
      case 'top-left-anchor':
        break;
      case 'top-right-anchor':
        topLeft.y(anchor.y());
        bottomRight.x(anchor.x());
        anchor.position({ x: boundingBoxes[0].width, y: 0 });
        break;
      case 'bottom-left-anchor':
        topLeft.x(anchor.x());
        bottomRight.y(anchor.y());
        anchor.position({ x: 0, y: boundingBoxes[0].height });
        break;
      case 'bottom-right-anchor':
        break;
    }

    const overlayLayer = e.target.getStage()?.findOne('.overlay-layer');
    // 앵커를 기준으로 새로운 경계 상자를 계산합니다.
    const newBoundingBox = calculateNewBoundingBox(
      topLeft,
      bottomRight,
      boundingBoxes[0].rotation,
      overlayLayer,
    );

    if (newBoundingBox.width < MIN_WIDTH || newBoundingBox.height < MIN_HEIGHT) {
      setPosition(topLeft, bottomRight, boundingBoxes[0]);
      return;
    }

    const transform = calculateRelativeTransform(boundingBoxes[0], newBoundingBox);

    // 선택된 도형들에 변환을 적용합니다.
    const newShapes = updateSelectedShapesWithTransform(selectedShapes, transform);
    // 바운딩 박스들에 변환을 적용합니다.
    const newBoundingBoxes = updateBoundingBoxesWithTransform(e, boundingBoxes, transform);

    updateBoundingBoxes(newBoundingBoxes);
    updateSelectedShapes(newShapes);

    setPosition(topLeft, bottomRight, newBoundingBox);
  };

  return { handleDragMove };
};
