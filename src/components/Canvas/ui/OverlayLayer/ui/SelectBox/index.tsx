import { Rect } from 'react-konva';

interface Props {
  scale: number;
}
const SelectBox = ({ scale }: Props) => {
  return (
    <Rect
      name="select-box"
      fill="rgba(247, 107, 21, 0.1)"
      stroke="rgb(247, 107, 21, 1)"
      scaleX={1 / scale}
      scaleY={1 / scale}
    />
  );
};

export default SelectBox;
