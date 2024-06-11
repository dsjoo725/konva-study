import { KonvaEventObject } from 'konva/lib/Node';

export const useHandleAnchor = () => {
  const handleDragMove = (e: KonvaEventObject<DragEvent>) => {
    const anchorName = e.target.name();

    const topLeft = e.target.getParent()?.findOne('.top-left-anchor');
    const bottomRight = e.target.getParent()?.findOne('.bottom-right-anchor');

    if (!topLeft || !bottomRight) return;

    switch (anchorName) {
      case 'top-right-anchor':
        topLeft.y(e.target.y());
        bottomRight.x(e.target.x());
        break;
      case 'bottom-left-anchor':
        topLeft.x(e.target.x());
        bottomRight.y(e.target.y());
    }
  };

  return { handleDragMove };
};
