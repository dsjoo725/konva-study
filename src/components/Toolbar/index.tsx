import { useCreateShape } from '@/shared/design/hooks/useCreateShape';
import { DEFAULT_CIRCLE_CONFIG, DEFAULT_RECTANGLE_CONFIG } from '@/shared/design/constant';
import { useSelectedShapeIds, useShapes } from '@/shared/design/store';

import styles from './styles.module.scss';

const Toolbar = () => {
  const shapes = useShapes();
  const selectedIds = useSelectedShapeIds();
  const { createCircle, createRectangle } = useCreateShape();

  return (
    <div className={styles.layout}>
      <h2>Toolbar</h2>
      <button onClick={() => createRectangle(DEFAULT_RECTANGLE_CONFIG)}>사각형</button>
      <button onClick={() => createCircle(DEFAULT_CIRCLE_CONFIG)}>원</button>
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
    </div>
  );
};

export default Toolbar;
