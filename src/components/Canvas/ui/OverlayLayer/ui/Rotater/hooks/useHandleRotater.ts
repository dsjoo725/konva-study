import { KonvaEventObject } from 'konva/lib/Node';

import { ROTATION_ANCHOR_OFFSET } from '..';

import { BoundingBox } from '@/shared/design/type';
import { calculateAngle, degToRad, radToDeg } from '@/shared/@common/utils/math';
import { useDesignActions, useDesignBoundingBoxes } from '@/shared/design/store';
import { calculateRelativeTransform } from '@/shared/design/utils/calculateRelativeTransform';
import { getAttrsTransform } from '@/shared/design/utils/getAttrsTransform';
import Konva from 'konva';

const ROTATION_SNAPS: number[] = [0, 90, 180, 270];
const SNAP_TOL: number = 45;

/**
 * @name getSnap
 * @description
 * 주어진 회전 각도(라디안)를 가장 가까운 스냅 각도로 맞춥니다. 스냅 각도는 사전에 정의된 각도 집합에서 선택됩니다.
 * ```typescript
 * getSnap(
 *   // 회전 각도 (라디안 단위)
 *   rotationRad: number
 * ): number
 * ```
 * @example
 * getSnap(degToRad(10)) // 0°
 * getSnap(degToRad(80)) // 90°
 */
const getSnap = (rotationRad: number) => {
  const snapToleranceRad = degToRad(SNAP_TOL);
  const twoPi = Math.PI * 2;
  let snappedRot = rotationRad;

  for (const snapDeg of ROTATION_SNAPS) {
    const snapRad = degToRad(snapDeg);
    const absDiff = Math.abs(snapRad - rotationRad) % twoPi;
    const diff = Math.min(absDiff, twoPi - absDiff);

    if (diff < snapToleranceRad) {
      snappedRot = snapRad;
      break;
    }
  }

  return snappedRot;
};

/**
 * @name calculateRotatedCenter
 * @description
 * 주어진 바운딩 박스의 중심을 회전 각도를 고려하여 계산합니다.
 * ```typescript
 * calculateRotatedCenter(
 *   // 바운딩 박스 객체
 *   boundingBox: BoundingBox
 * ): { x: number, y: number }
 * ```
 * @example
 * calculateRotatedCenter({
 *   x: 0,
 *   y: 0,
 *   width: 10,
 *   height: 5,
 *   rotation: 45
 * })
 * // { x: ~5.36, y: ~2.68 }
 */
const calculateRotatedCenter = (boundingBox: BoundingBox) => {
  return {
    x:
      boundingBox.x +
      (boundingBox.width / 2) * Math.cos(degToRad(boundingBox.rotation)) +
      (boundingBox.height / 2) * Math.sin(-degToRad(boundingBox.rotation)),
    y:
      boundingBox.y +
      (boundingBox.height / 2) * Math.cos(degToRad(boundingBox.rotation)) +
      (boundingBox.width / 2) * Math.sin(degToRad(boundingBox.rotation)),
  };
};

/**
 * @name rotateAroundCenter
 * @description
 * 주어진 바운딩 박스를 중심점을 기준으로 주어진 각도만큼 회전시킵니다.
 * ```typescript
 * rotateAroundCenter(
 *   // 바운딩 박스 객체
 *   boundingBox: BoundingBox,
 *   // 회전 각도 (라디안 단위)
 *   rotateAngle: number
 * ): BoundingBox
 * ```
 * @example
 * rotateAroundCenter(
 *   { x: 0, y: 0, width: 10, height: 5, rotation: 0 },
 *   Math.PI / 4
 * )
 * // 회전된 바운딩 박스 객체
 * // { x: ~-2.5, y: ~2.5, width: 10, height: 5, rotation: 45 }
 */
const rotateAroundCenter = (boundingBox: BoundingBox, rotateAngle: number) => {
  const center = calculateRotatedCenter(boundingBox);

  const x =
    center.x +
    (boundingBox.x - center.x) * Math.cos(rotateAngle) -
    (boundingBox.y - center.y) * Math.sin(rotateAngle);
  const y =
    center.y +
    (boundingBox.x - center.x) * Math.sin(rotateAngle) +
    (boundingBox.y - center.y) * Math.cos(rotateAngle);

  return {
    ...boundingBox,
    x,
    y,
    rotation: radToDeg(degToRad(boundingBox.rotation) + rotateAngle),
  };
};

/**
 * @name calculateRotateAngle
 * @description
 * 주어진 점 (x, y), 바운딩 박스, 그리고 스케일을 고려하여 회전 각도를 계산합니다. 계산된 각도는 스냅 각도를 반영합니다.
 * ```typescript
 * calculateRotateAngle(
 *   // 점의 x 좌표
 *   x: number,
 *   // 점의 y 좌표
 *   y: number,
 *   // 바운딩 박스 객체
 *   boundingBox: BoundingBox,
 *   // 스케일 값
 *   scale: number
 * ): number
 * ```
 * @example
 * calculateRotateAngle(100, 150, { x: 50, y: 50, width: 100, height: 100, rotation: 0 }, 1)
 * // 특정 스냅 각도로 보정된 회전 각도 (라디안 단위)
 */
const calculateRotateAngle = (x: number, y: number, boundingBox: BoundingBox, scale: number) => {
  const offsetX = x - boundingBox.width / 2;
  const offsetY = y - boundingBox.height / 2 + ROTATION_ANCHOR_OFFSET / scale;

  const angle = calculateAngle(offsetX, offsetY);
  const currentAngle = degToRad(boundingBox.rotation);
  const snappedAngle = getSnap(angle + currentAngle);

  return snappedAngle - currentAngle;
};

const updateBoundingBoxesWithTransform = (
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
      rotation: attrs.rotation,
    };
  });
};

const updateSelectedShapesWithTransform = (
  selectedShapes: Konva.Shape[],
  transform: Konva.Transform,
) => {
  return selectedShapes.map((shape) => {
    const attrs = getAttrsTransform(shape, transform);
    return {
      id: shape.id(),
      x: attrs.x,
      y: attrs.y,
      rotation: attrs.rotation,
    };
  });
};

const setPosition = (target: Konva.Node, boundingBox: BoundingBox) => {
  target.x(boundingBox.width / 2);
  target.y(boundingBox.height);
};

export const useHandleRotater = (
  boundingBox: BoundingBox,
  selectedShapes: Konva.Shape[],
  scale: number,
) => {
  const boundingBoxes = useDesignBoundingBoxes();
  const { updateBoundingBoxes, updateSelectedShapesRotation } = useDesignActions();

  const handleDragMove = (e: KonvaEventObject<DragEvent>) => {
    const rotateAngle = calculateRotateAngle(e.target.x(), e.target.y(), boundingBox, scale);

    if (radToDeg(rotateAngle) === 0 || radToDeg(rotateAngle) === 360) {
      setPosition(e.target, boundingBox);
      return;
    }

    const rotatedBoundingBox = rotateAroundCenter(boundingBox, rotateAngle);
    const transform = calculateRelativeTransform(boundingBox, rotatedBoundingBox);

    const newShapes = updateSelectedShapesWithTransform(selectedShapes, transform);
    const newBoundingBoxes = updateBoundingBoxesWithTransform(e, boundingBoxes, transform);

    updateSelectedShapesRotation(newShapes);
    updateBoundingBoxes(newBoundingBoxes);

    setPosition(e.target, boundingBox);
  };

  return { handleDragMove };
};
