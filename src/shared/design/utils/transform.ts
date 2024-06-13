import Konva from 'konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { Transform } from 'konva/lib/Util';

import { BoundingBox, Shape, ShapeType } from '@/shared/design/type';
import { degToRad } from '@/shared/@common/utils/math';

const createTransform = (boundingBox: BoundingBox, baseSize: number) => {
  const transform = new Transform();
  transform.translate(boundingBox.x, boundingBox.y);
  transform.rotate(degToRad(boundingBox.rotation));
  transform.scale(boundingBox.width / baseSize, boundingBox.height / baseSize);
  return transform;
};

/**
 * @name calculateRelativeTransform
 * @description
 * 새로운 바운딩 박스와 이전 바운딩 박스를 사용하여 상대 변환 행렬을 계산합니다.
 * ```typescript
 * calculateRelativeTransform(
 *   // 새로운 바운딩 박스 객체
 *   newBoundingBox: BoundingBox,
 *   // 이전 바운딩 박스 객체
 *   oldBoundingBox: BoundingBox
 * ): Transform
 * ```
 * @example
 * calculateRelativeTransform(
 *   { x: 0, y: 0, width: 20, height: 10, rotation: 45 },
 *   { x: 0, y: 0, width: 10, height: 5, rotation: 0 }
 * )
 * // 상대 변환 행렬을 반환합니다.
 */
export const calculateRelativeTransform = (
  newBoundingBox: BoundingBox,
  oldBoundingBox: BoundingBox,
) => {
  const BASE_SIZE = 10000000;

  const oldTransform = createTransform(oldBoundingBox, BASE_SIZE);
  const newTransform = createTransform(newBoundingBox, BASE_SIZE);

  const relativeTransform = oldTransform.multiply(newTransform.invert());

  return relativeTransform;
};

const getLocalTransform = (shape: Konva.Shape): Konva.Transform => {
  const transform = shape.getTransform().copy();
  transform.translate(shape.offsetX(), shape.offsetY());
  return transform;
};

const calculateNewTransform = (
  transform: Konva.Transform,
  localTransform: Konva.Transform,
): Konva.Transform => {
  const newTransform = new Konva.Transform();
  newTransform.multiply(transform).multiply(localTransform);

  return newTransform;
};

export const getAttrsTransform = (shape: Konva.Shape, transform: Konva.Transform) => {
  const localTransform = getLocalTransform(shape);
  const newTransform = calculateNewTransform(transform, localTransform);

  return newTransform.decompose();
};

export const updateShapesWithTransform = (
  shapes: Konva.Shape[],
  transform: Konva.Transform,
): Partial<Shape>[] => {
  return shapes.map((shape) => {
    const attrs = getAttrsTransform(shape, transform);

    const offsetX = shape.strokeWidth() * (attrs.scaleX - 1);
    const offsetY = shape.strokeWidth() * (attrs.scaleY - 1);

    const type: ShapeType = shape.getAttr('shapeType');
    switch (type) {
      case 'rectangle':
        const rect = shape as Konva.Rect;
        return {
          id: rect.id(),
          x: attrs.x - offsetX / 2,
          y: attrs.y - offsetY / 2,
          width: rect.width() * attrs.scaleX + offsetX,
          height: rect.height() * attrs.scaleY + offsetY,
          rotation: attrs.rotation,
        };
      case 'circle':
        const cirlce = shape as Konva.Ellipse;
        return {
          id: cirlce.id(),
          x: attrs.x - offsetX / 2,
          y: attrs.y - offsetY / 2,
          radiusX: cirlce.radiusX() * attrs.scaleX + offsetX,
          radiusY: cirlce.radiusY() * attrs.scaleY + offsetY,
          rotation: attrs.rotation,
        };
    }
  });
};

export const updateBoundingBoxesWithTransform = (
  e: KonvaEventObject<DragEvent>,
  boundingBoxes: BoundingBox[],
  transform: Konva.Transform,
) => {
  const stage = e.target.getStage();
  return boundingBoxes.map((boundingBox, index) => {
    const shape = stage?.findOne(`.boundingBox-${index}`);
    if (!(shape instanceof Konva.Shape)) return boundingBox;

    const attrs = getAttrsTransform(shape, transform);

    return {
      ...boundingBox,
      x: attrs.x,
      y: attrs.y,
      width: boundingBox.width * attrs.scaleX,
      height: boundingBox.height * attrs.scaleY,
      rotation: attrs.rotation,
    };
  });
};
