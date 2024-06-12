import { Transform } from 'konva/lib/Util';
import { degToRad } from '@/shared/@common/utils/math';
import { BoundingBox } from '@/shared/design/type';

const createTransform = (boundingBox: BoundingBox, baseSize: number) => {
  const transform = new Transform();
  transform.translate(boundingBox.x, boundingBox.y);
  transform.rotate(degToRad(boundingBox.rotation));
  transform.scale(boundingBox.width / baseSize, boundingBox.height / baseSize);
  return transform;
};

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
