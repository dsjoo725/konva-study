import Konva from 'konva';
import { Group, Layer } from 'react-konva';

import { useUpdateBoundingBoxes } from './hooks/useUpdateBoundingBoxes';
import { useHandleTransformer } from './hooks/useHandleTransformer';

import Anchor from './ui/Anchor';
import BoundingBox from './ui/BoundingBox';
import Rotater from './ui/Rotater';
import SelectBox from './ui/SelectBox';

interface Props {
  stageRef: React.RefObject<Konva.Stage>;
  x: number;
  y: number;
  scale: number;
}
const OverlayLayer = ({ stageRef, x, y, scale }: Props) => {
  const { boundingBoxes, selectedShapesRef } = useUpdateBoundingBoxes(stageRef, x, y, scale);
  const { handleClick, handleDragStart, handleDragMove, handleDragEnd } = useHandleTransformer(
    selectedShapesRef.current,
  );

  return (
    <Layer x={x} y={y} name="overlay-layer">
      <Group
        draggable
        onDragStart={handleDragStart}
        onDragMove={handleDragMove}
        onDragEnd={handleDragEnd}
        onClick={handleClick}
      >
        {boundingBoxes.map((boundingBox, index) => (
          <BoundingBox key={index} index={index} boundingBox={boundingBox} scale={scale} />
        ))}
        {boundingBoxes[0] && (
          <Group x={boundingBoxes[0].x} y={boundingBoxes[0].y} rotation={boundingBoxes[0].rotation}>
            <Anchor
              name="top-left"
              x={0}
              y={0}
              selectedShapes={selectedShapesRef.current}
              scale={scale}
            />
            <Anchor
              name="top-right"
              x={boundingBoxes[0].width}
              y={0}
              selectedShapes={selectedShapesRef.current}
              scale={scale}
            />
            <Anchor
              name="bottom-left"
              x={0}
              y={boundingBoxes[0].height}
              selectedShapes={selectedShapesRef.current}
              scale={scale}
            />
            <Anchor
              name="bottom-right"
              x={boundingBoxes[0].width}
              y={boundingBoxes[0].height}
              selectedShapes={selectedShapesRef.current}
              scale={scale}
            />
            <Rotater
              boundingBox={boundingBoxes[0]}
              selectedShapes={selectedShapesRef.current}
              scale={scale}
            />
          </Group>
        )}
      </Group>
      <SelectBox scale={scale} />
    </Layer>
  );
};

export default OverlayLayer;
