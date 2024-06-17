import { Stage } from 'react-konva';
import { useRef } from 'react';
import Konva from 'konva';

import styles from './styles.module.scss';

import ShapesLayer from './ui/ShapesLayer';
import OverlayLayer from './ui/OverlayLayer';
import { useHandleStage } from './hooks/useHandleStage';
import { BackgroudLayer } from './ui/BackgroudLayer';
import { useHandleKeyboard } from './hooks/useHandleKeyboard';
import { useUpdateCanvas } from './hooks/useUpdateCanvas';
import { usePaper } from '@/shared/paper/store';

const Canvas = () => {
  const paper = usePaper();

  const { handleMouseDown, handleMouseMove, handleMouseUp } = useHandleStage();
  const { handleKeydown } = useHandleKeyboard();
  const { canvas, containerRef, x, y } = useUpdateCanvas(paper);

  const stageRef = useRef<Konva.Stage>(null);

  return (
    <div className={styles.layout} ref={containerRef} tabIndex={0} onKeyDown={handleKeydown}>
      <Stage
        ref={stageRef}
        width={canvas.width}
        height={canvas.height}
        scaleX={canvas.scale}
        scaleY={canvas.scale}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <BackgroudLayer x={x} y={y} />
        <ShapesLayer x={x} y={y} />
        <OverlayLayer stageRef={stageRef} x={x} y={y} scale={canvas.scale} />
      </Stage>
    </div>
  );
};

export default Canvas;
