import { useCreateShape } from '@/shared/design/hooks';
import { DEFAULT_CIRCLE_CONFIG, DEFAULT_RECTANGLE_CONFIG } from '@/shared/design/constant';

import styles from './styles.module.scss';
import { useDesignSelectedIds, useDesignShapes } from '@/shared/design/store';

const Toolbar = () => {
  const shapes = useDesignShapes();
  const selectedIds = useDesignSelectedIds();
  const { createCircle, createRectangle } = useCreateShape();

  return (
    <div className={styles.layout}>
      <h2>Toolbar</h2>
      <button onClick={() => createRectangle(DEFAULT_RECTANGLE_CONFIG)}>사각형</button>
      <button onClick={() => createCircle(DEFAULT_CIRCLE_CONFIG)}>원</button>
      <div>전체</div>
      <ul>
        {shapes.map((shape) => (
          <li key={shape.id}>{`type: ${shape.type} / x: ${shape.x} / y: ${shape.y}`}</li>
        ))}
      </ul>
      <div>선택한 도형</div>
      <ul>
        {selectedIds.map((id) => (
          <li key={id}>{id}</li>
        ))}
      </ul>
    </div>
  );
};

export default Toolbar;
