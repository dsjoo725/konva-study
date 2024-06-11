import Konva from 'konva';
import { Group, Layer } from 'react-konva';

import { useUpdateBoundingBoxes } from './hooks/useUpdateBoundingBoxes';
import { useHandleBoundingBoxes } from './hooks/useHandleBoundingBox';
import Anchor from './ui/Anchor';
import BoundingBox from './ui/BoundingBox';
import Rotater from './ui/Rotater';

interface Props {
  stageRef: React.RefObject<Konva.Stage>;
  x: number;
  y: number;
  scale: number;
}
const OverlayLayer = ({ stageRef, x, y, scale }: Props) => {
  const { boundingBoxes, selectedShapes } = useUpdateBoundingBoxes(stageRef, x, y, scale);
  const { handleDragStart, handleDragMove, handleDragEnd } = useHandleBoundingBoxes(selectedShapes);

  return (
    <Layer x={x} y={y}>
      <Group
        draggable
        onDragStart={handleDragStart}
        onDragMove={handleDragMove}
        onDragEnd={handleDragEnd}
      >
        {boundingBoxes.map((boundingBox, index) => (
          <BoundingBox key={index} boundingBox={boundingBox} scale={scale} />
        ))}
        {boundingBoxes[0] && (
          <Group x={boundingBoxes[0].x} y={boundingBoxes[0].y} rotation={boundingBoxes[0].rotation}>
            <Anchor name="top-left" x={0} y={0} scale={scale} />
            <Anchor name="top-right" x={boundingBoxes[0].width} y={0} scale={scale} />
            <Anchor name="bottom-left" x={0} y={boundingBoxes[0].height} scale={scale} />
            <Anchor
              name="bottom-right"
              x={boundingBoxes[0].width}
              y={boundingBoxes[0].height}
              scale={scale}
            />
            <Rotater boundingBox={boundingBoxes[0]} scale={scale} />
          </Group>
        )}
      </Group>
    </Layer>
  );
};

export default OverlayLayer;
