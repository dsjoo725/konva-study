import Konva from 'konva';
import { Group, Layer, Rect } from 'react-konva';

import { useUpdateBoundingBoxes } from './hooks/useUpdateBoundingBoxes';
import { useHandleBoundingBoxes } from './hooks/useHandleBoundingBox';

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
          <Rect
            key={index}
            x={boundingBox.x}
            y={boundingBox.y}
            width={boundingBox.width}
            height={boundingBox.height}
            stroke={'rgba(247, 107, 21, 1)'}
            strokeWidth={2 / scale}
          />
        ))}
      </Group>
    </Layer>
  );
};

export default OverlayLayer;
