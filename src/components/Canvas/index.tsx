import { Stage } from 'react-konva';
import { useRef } from 'react';
import Konva from 'konva';

import styles from './styles.module.scss';
import useContainerDimensions from './hooks/useContainerDimensions';
import ShapesLayer from './ui/ShapesLayer';
import OverlayLayer from './ui/OverlayLayer';

const Canvas = () => {
  const { containerRef, dimensions } = useContainerDimensions();
  const stageRef = useRef<Konva.Stage>(null);

  return (
    <div className={styles.layout} ref={containerRef}>
      <Stage
        ref={stageRef}
        width={dimensions.width}
        height={dimensions.height}
        scaleX={0.5}
        scaleY={0.5}
      >
        <ShapesLayer x={100} y={100} />
        <OverlayLayer stageRef={stageRef} x={100} y={100} scale={0.5} />
      </Stage>
    </div>
  );
};

export default Canvas;
