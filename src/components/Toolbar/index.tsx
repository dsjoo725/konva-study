import { useCreateShape } from '@/shared/design/hooks/useCreateShape';
import {
  DEFAULT_CIRCLE_CONFIG,
  DEFAULT_RECTANGLE_CONFIG,
  DEFAULT_TEXT_CONFIG,
} from '@/shared/design/constant';
import { useDesignActions } from '@/shared/design/store';

import styles from './styles.module.scss';
import { TextAlign } from '@/shared/design/type';
import Konva from 'konva';
import { useSelectedShapes } from '@/shared/design/hooks/useSelectedShapes';

const Toolbar = () => {
  const { createCircle, createRectangle, createText } = useCreateShape();
  const { updateShapeAttributes } = useDesignActions();
  const { konva } = useSelectedShapes();

  const updateAlign = (align: TextAlign) => {
    const textAlignAttributes = konva.selectedShapes
      .filter((shape): shape is Konva.Text => shape instanceof Konva.Text)
      .map((shape) => ({
        id: shape.id(),
        align,
      }));

    updateShapeAttributes(textAlignAttributes);
  };

  return (
    <div className={styles.layout}>
      <h2>Toolbar</h2>
      <button onClick={() => createRectangle(DEFAULT_RECTANGLE_CONFIG)}>사각형</button>
      <button onClick={() => createCircle(DEFAULT_CIRCLE_CONFIG)}>원</button>
      <button onClick={() => createText(DEFAULT_TEXT_CONFIG)}>텍스트</button>

      <button onClick={() => updateAlign('left')}>left</button>
      <button onClick={() => updateAlign('center')}>center</button>
      <button onClick={() => updateAlign('right')}>right</button>
    </div>
  );
};

export default Toolbar;
