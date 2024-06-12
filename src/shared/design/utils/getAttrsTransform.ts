import Konva from 'konva';

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
