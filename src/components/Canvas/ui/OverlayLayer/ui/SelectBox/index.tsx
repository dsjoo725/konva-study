import { Rect } from 'react-konva';

const SelectBox = () => {
  return (
    <Rect
      name="selectbox"
      fill="rgba(247, 107, 21, 0.1)"
      stroke="rgb(247, 107, 21, 1)"
      visible={false}
    />
  );
};

export default SelectBox;
