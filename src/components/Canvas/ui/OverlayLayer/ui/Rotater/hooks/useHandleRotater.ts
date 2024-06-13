import Konva from 'konva';
import { KonvaEventObject } from 'konva/lib/Node';

import { BoundingBox } from '@/shared/design/type';
import { calculateAngle, degToRad, radToDeg } from '@/shared/@common/utils/math';
import { useDesignActions, useBoundingBoxes } from '@/shared/design/store';
import { calculateRelativeTransform } from '@/shared/design/utils/transform';
import { ROTATION_ANCHOR_OFFSET } from '@/shared/design/constant';
import { transformBoundingBoxes, transformShapeAttributes } from '@/shared/design/utils/transform';

const ROTATION_SNAPS: number[] = [0, 90, 180, 270];
const SNAP_TOL: number = 45;

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

const calculateRotateAngle = (x: number, y: number, boundingBox: BoundingBox, scale: number) => {
  const offsetX = x - boundingBox.width / 2;
  const offsetY = y - boundingBox.height / 2 + ROTATION_ANCHOR_OFFSET / scale;

  const angle = calculateAngle(offsetX, offsetY);
  const currentAngle = degToRad(boundingBox.rotation);
  const snappedAngle = getSnap(angle + currentAngle);

  return snappedAngle - currentAngle;
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
  const boundingBoxes = useBoundingBoxes();
  const { setBoundingBoxes, updateShapeAttributes } = useDesignActions();

  const handleDragMove = (e: KonvaEventObject<DragEvent>) => {
    const rotateAngle = calculateRotateAngle(e.target.x(), e.target.y(), boundingBox, scale);
    const angleInDegrees = radToDeg(rotateAngle);

    // 회전 각도가 0도 또는 360도인 경우, 위치만 설정하고 반환합니다.
    if (angleInDegrees === 0 || angleInDegrees === 360) {
      setPosition(e.target, boundingBox);
      return;
    }

    // 바운딩 박스를 회전 중심을 기준으로 회전시킵니다.
    const rotatedBoundingBox = rotateAroundCenter(boundingBox, rotateAngle);
    // 상대적인 변환을 계산합니다.
    const transform = calculateRelativeTransform(boundingBox, rotatedBoundingBox);

    // 바운딩 박스들에 변환을 적용합니다.
    const newBoundingBoxes = transformBoundingBoxes(e, boundingBoxes, transform);
    // 선택된 도형들에 변환을 적용합니다.
    const attrs = transformShapeAttributes(selectedShapes, transform);

    setBoundingBoxes(newBoundingBoxes);
    updateShapeAttributes(attrs);

    setPosition(e.target, boundingBox);
  };

  return { handleDragMove };
};
