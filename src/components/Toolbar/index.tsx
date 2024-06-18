import { useCreateShape } from '@/shared/design/hooks/useCreateShape';
import {
  DEFAULT_CIRCLE_CONFIG,
  DEFAULT_RECTANGLE_CONFIG,
  DEFAULT_TEXT_CONFIG,
} from '@/shared/design/constant';
import { useDesignActions, useSelectedShapeIds, useShapes } from '@/shared/design/store';

import styles from './styles.module.scss';

const Toolbar = () => {
  const shapes = useShapes();
  const selectedIds = useSelectedShapeIds();
  const { createCircle, createRectangle, createText } = useCreateShape();
  const { updateShapeAttributes } = useDesignActions();

  return (
    <div className={styles.layout}>
      <h2>Toolbar</h2>
      <button onClick={() => createRectangle(DEFAULT_RECTANGLE_CONFIG)}>사각형</button>
      <button onClick={() => createCircle(DEFAULT_CIRCLE_CONFIG)}>원</button>
      <button onClick={() => createText(DEFAULT_TEXT_CONFIG)}>텍스트</button>
      <div>전체</div>
      <ul>
        {shapes.map((shape) => (
          <li key={shape.id}>
            {`type: ${shape.shapeType}`}
            <br />
            {`x: ${shape.x}`}
            <br />
            {`y: ${shape.y}`}
            <br />
            {`rotation: ${shape.rotation}`}
          </li>
        ))}
      </ul>
      <div>선택한 도형</div>
      <ul>
        {selectedIds.map((id) => (
          <li key={id}>{id}</li>
        ))}
      </ul>
      <input />

      <button
        onClick={() => {
          updateShapeAttributes([{ id: selectedIds[0], align: 'left' }]);
        }}
      >
        left
      </button>
      <button
        onClick={() => {
          updateShapeAttributes([{ id: selectedIds[0], align: 'center' }]);
        }}
      >
        center
      </button>
      <button
        onClick={() => {
          updateShapeAttributes([{ id: selectedIds[0], align: 'right' }]);
        }}
      >
        right
      </button>
    </div>
  );
};

export default Toolbar;
