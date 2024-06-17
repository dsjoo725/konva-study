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

const getAttrsTransform = (shape: Konva.Shape, transform: Konva.Transform) => {
  const localTransform = getLocalTransform(shape);
  const newTransform = calculateNewTransform(transform, localTransform);

  return newTransform.decompose();
};

/**
 * @name transformShapeAttributes
 * @description
 * 주어진 도형들의 위치, 크기 및 회전 각도를 주어진 변환 객체를 사용하여 업데이트합니다. 선 두께에 따른 오차를 보정합니다.
 * ```typescript
 * transformShapeAttributes(
 *   // 변환할 Konva 도형들의 배열
 *   shapes: Konva.Shape[],
 *   // 적용할 Konva 변환 객체
 *   transform: Konva.Transform
 * ): (Partial<Shape> & { id: string })[]
 * ```
 * @example
 * transformShapeAttributes([shape1, shape2], transform);
 * // 변환된 도형들의 속성 배열을 반환합니다.
 * // [
 * //   { id: 'shape1', x: newX1, y: newY1, width: newWidth1, height: newHeight1, rotation: newRotation1 },
 * //   { id: 'shape2', x: newX2, y: newY2, radiusX: newRadiusX, radiusY: newRadiusY, rotation: newRotation2 },
 * // ]
 */
export const transformShapeAttributes = (
  shapes: Konva.Shape[],
  transform: Konva.Transform,
): (Partial<Shape> & { id: string })[] => {
  return shapes.map((shape) => {
    const attrs = getAttrsTransform(shape, transform);

    // 선 두께에 따른 오차를 계산합니다.
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
      case 'text':
        const text = shape as Konva.Text;
        return {
          id: text.id(),
          x: attrs.x - offsetX / 2,
          y: attrs.y - offsetY / 2,
          fontSize: text.fontSize() * attrs.scaleX,
          rotation: attrs.rotation,
        };
      default:
        return {
          id: shape.id(),
          x: attrs.x - offsetX / 2,
          y: attrs.y - offsetY / 2,
          rotation: attrs.rotation,
        };
    }
  });
};

/**
 * @name transformBoundingBoxes
 * @description
 * 변환 객체를 사용하여 주어진 바운딩 박스 배열의 위치, 크기 및 회전 각도를 업데이트합니다.
 * ```typescript
 * transformBoundingBoxes(
 *   // Konva 드래그 이벤트 객체
 *   e: KonvaEventObject<DragEvent>,
 *   // 바운딩 박스 배열
 *   boundingBoxes: BoundingBox[],
 *   // Konva 변환 객체
 *   transform: Konva.Transform
 * ): BoundingBox[]
 * ```
 * @example
 * transformBoundingBoxes(event, transform, [
 *   { x: 0, y: 0, width: 10, height: 5, rotation: 0 },
 *   { x: 10, y: 10, width: 15, height: 10, rotation: 0 },
 * ])
 * // 업데이트된 바운딩 박스 배열
 * // [
 * //   { x: newX1, y: newY1, width: newWidth1, height: newHeight1, rotation: newRotation1 },
 * //   { x: newX2, y: newY2, width: newWidth2, height: newHeight2, rotation: newRotation2 },
 * // ]
 */
export const transformBoundingBoxes = (
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
