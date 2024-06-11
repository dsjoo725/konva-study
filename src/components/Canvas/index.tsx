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
  const scale = 0.8;

  return (
    <div className={styles.layout} ref={containerRef}>
      <Stage
        ref={stageRef}
        width={dimensions.width}
        height={dimensions.height}
        scaleX={scale}
        scaleY={scale}
      >
        <ShapesLayer x={100} y={100} />
        <OverlayLayer stageRef={stageRef} x={100} y={100} scale={scale} />
      </Stage>
    </div>
  );
};

export default Canvas;
