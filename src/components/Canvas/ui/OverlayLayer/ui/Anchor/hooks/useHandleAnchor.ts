import Konva from 'konva';
import { KonvaEventObject } from 'konva/lib/Node';

import { useBoundingBoxes, useDesignActions } from '@/shared/design/store';
import { BoundingBox } from '@/shared/design/type';
import {
  calculateRelativeTransform,
  transformBoundingBoxes,
  transformShapeAttributes,
} from '@/shared/design/utils/transform';
import { calculateDistance, calculateSinCos } from '@/shared/@common/utils/math';

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
    width: bottomRight.x() - topLeft.x(),
    height: bottomRight.y() - topLeft.y(),
    rotation: boundingBox.rotation,
  };
};

const setPosition = (topLeft: Konva.Node, bottomRight: Konva.Node, boundingBox: BoundingBox) => {
  topLeft.position({ x: 0, y: 0 });
  bottomRight.position({ x: boundingBox.width, y: boundingBox.height });
};

const calculateOffset =
  (sin: number, cos: number) => (x1: number, y1: number, x2: number, y2: number) => {
    const distance = calculateDistance(x1, y1, x2, y2);

    return { x: distance * cos, y: distance * sin };
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

    const { sin, cos } = calculateSinCos(boundingBoxes[0]);

    const offsetCalculator = calculateOffset(sin, cos);

    let offset = { x: 0, y: 0 };
    let x = 0;
    let y = 0;

    // 각 앵커의 위치를 기반으로 topLeft와 bottomRight 위치를 업데이트합니다.
    switch (anchorName) {
      case 'top-left-anchor':
        x = Math.min(anchor.x(), bottomRight.x() - MIN_WIDTH);
        y = Math.min(anchor.y(), bottomRight.y() - MIN_HEIGHT);

        offset = offsetCalculator(x, y, bottomRight.x(), bottomRight.y());

        anchor.position({ x: bottomRight.x() - offset.x, y: bottomRight.y() - offset.y });
        break;
      case 'top-right-anchor':
        x = Math.max(anchor.x(), topLeft.x() + MIN_WIDTH);
        y = Math.min(anchor.y(), bottomRight.y() - MIN_HEIGHT);

        offset = offsetCalculator(x, y, topLeft.x(), bottomRight.y());

        bottomRight.x(topLeft.x() + offset.x);
        topLeft.y(bottomRight.y() - offset.y);
        anchor.position({ x: boundingBoxes[0].width, y: 0 });
        break;
      case 'bottom-left-anchor':
        x = Math.min(anchor.x(), bottomRight.x() - MIN_WIDTH);
        y = Math.max(anchor.y(), topLeft.y() + MIN_HEIGHT);

        offset = offsetCalculator(x, y, bottomRight.x(), topLeft.y());

        topLeft.x(bottomRight.x() - offset.x);
        bottomRight.y(topLeft.y() + offset.y);
        anchor.position({ x: 0, y: boundingBoxes[0].height });
        break;
      case 'bottom-right-anchor':
        x = Math.max(anchor.x(), topLeft.x() + MIN_WIDTH);
        y = Math.max(anchor.y(), topLeft.y() + MIN_HEIGHT);

        offset = offsetCalculator(x, y, topLeft.x(), topLeft.y());

        anchor.position({ x: topLeft.x() + offset.x, y: topLeft.y() + offset.y });
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
    const newBoundingBoxes = transformBoundingBoxes(e, boundingBoxes, transform);
    const attrs = transformShapeAttributes(selectedShapes, transform);

    setBoundingBoxes(newBoundingBoxes);
    updateShapeAttributes(attrs);

    setPosition(topLeft, bottomRight, newBoundingBox);
  };

  return { handleDragMove };
};
