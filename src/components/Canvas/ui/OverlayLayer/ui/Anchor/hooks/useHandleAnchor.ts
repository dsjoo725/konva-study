import Konva from 'konva';
import { KonvaEventObject } from 'konva/lib/Node';

import { useBoundingBoxes, useDesignActions } from '@/shared/design/store';
import { BoundingBox } from '@/shared/design/type';
import {
  calculateRelativeTransform,
  transformBoundingBoxes,
  transformShapeAttributes,
} from '@/shared/design/utils/transform';

const MIN_WIDTH = 10 as const;
const MIN_HEIGHT = 10 as const;

const calculateNewBoundingBox = (
  topLeft: Konva.Node,
  bottomRight: Konva.Node,
  boundingBox: BoundingBox,
  overlayLayer?: Konva.Node,
) => {
  return {
    x: topLeft.getAbsolutePosition(overlayLayer).x,
    y: topLeft.getAbsolutePosition(overlayLayer).y,
    width: Math.max(bottomRight.x() - topLeft.x(), MIN_WIDTH),
    height: Math.max(bottomRight.y() - topLeft.y(), MIN_HEIGHT),
    rotation: boundingBox.rotation,
  };
};

const setPosition = (topLeft: Konva.Node, bottomRight: Konva.Node, boundingBox: BoundingBox) => {
  topLeft.position({ x: 0, y: 0 });
  bottomRight.position({ x: boundingBox.width, y: boundingBox.height });
};

export const useHandleAnchor = (selectedShapes: Konva.Shape[]) => {
  const boundingBoxes = useBoundingBoxes();
  const { setBoundingBoxes, updateShapeAttributes } = useDesignActions();

  const handleDragMove = (e: KonvaEventObject<DragEvent>) => {
    const anchor = e.target;
    const anchorName = anchor.name();

    const topLeft = anchor.getParent()?.findOne('.top-left-anchor');
    const bottomRight = anchor.getParent()?.findOne('.bottom-right-anchor');

    if (!topLeft || !bottomRight) return;

    // 최소 크기일때 도형이 계속 움직이는 것을 방지합니다.
    const topLeftMinX = Math.min(anchor.x(), bottomRight.x() - MIN_WIDTH);
    const topLeftMinY = Math.min(anchor.y(), bottomRight.y() - MIN_HEIGHT);

    // 각 앵커의 위치를 기반으로 topLeft와 bottomRight 위치를 업데이트합니다.
    switch (anchorName) {
      case 'top-left-anchor':
        anchor.position({ x: topLeftMinX, y: topLeftMinY });
        break;
      case 'top-right-anchor':
        bottomRight.x(anchor.x());
        topLeft.y(topLeftMinY);
        anchor.position({ x: boundingBoxes[0].width, y: 0 });
        break;
      case 'bottom-left-anchor':
        topLeft.x(topLeftMinX);
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
      boundingBoxes[0],
      overlayLayer,
    );

    const transform = calculateRelativeTransform(boundingBoxes[0], newBoundingBox);

    // 바운딩 박스들에 변환을 적용합니다.
    const newBoundingBoxes = transformBoundingBoxes(e, boundingBoxes, transform);
    // 선택된 도형들에 변환을 적용합니다.
    const attrs = transformShapeAttributes(selectedShapes, transform);

    setBoundingBoxes(newBoundingBoxes);
    updateShapeAttributes(attrs);

    setPosition(topLeft, bottomRight, newBoundingBox);
  };

  return { handleDragMove };
};
