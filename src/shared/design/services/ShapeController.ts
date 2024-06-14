import { v4 as uuidv4 } from 'uuid';
import { DebouncedFunc, debounce } from 'lodash';
import { BoundingBox, Shape } from '@/shared/design/type';

class ShapeController {
  private static instance: ShapeController;

  // 같은 위치에 붙여넣기하는 것을 방지하기 위해 오프셋을 사용합니다.
  private offset: number = 10;
  // 일정 시간이 지나면 offset을 초기화합니다.
  private setOffset: DebouncedFunc<() => void> = debounce(() => {
    this.offset = 10;
  }, 1000);

  private constructor() {}

  public static getInstance(): ShapeController {
    if (!ShapeController.instance) {
      ShapeController.instance = new ShapeController();
    }
    return ShapeController.instance;
  }

  // 모두 선택
  public selectAll(shapes: Shape[], setSelectedShapeIds: (ids: string[]) => void) {
    const ids = shapes.map((shape) => shape.id);
    setSelectedShapeIds(ids);
  }

  // 복사하기
  public copy(shapes: Shape[], selectedShapeIds: string[]) {
    const selectedShapes = shapes.filter((shape) => selectedShapeIds.includes(shape.id));
    const data = JSON.stringify(selectedShapes);

    navigator.clipboard.writeText(data).catch((err) => {
      console.error('복사에 실패했습니다:', err);
    });
  }

  // 붙여넣기
  public paste(addShapes: (shapes: Shape[]) => void, setSelectedShapeIds: (ids: string[]) => void) {
    navigator.clipboard
      .readText()
      .then((clipboardText) => {
        try {
          const data: Shape[] = JSON.parse(clipboardText);
          const newShapes = data.map((shape) => ({
            ...shape,
            id: uuidv4(),
            x: shape.x + this.offset,
            y: shape.y + this.offset,
          }));
          addShapes(newShapes);
          setSelectedShapeIds(newShapes.map((shape) => shape.id));

          this.offset += 10;
          this.setOffset();
        } catch (err) {
          console.error('붙여넣기에 실패했습니다:', err);
        }
      })
      .catch((err) => {
        console.error('클립보드 읽기에 실패했습니다:', err);
      });
  }

  // 자르기
  public cut(shapes: Shape[], selectedShapeIds: string[], removeShapes: (ids: string[]) => void) {
    const selectedShapes = shapes.filter((shape) => selectedShapeIds.includes(shape.id));
    const data = JSON.stringify(selectedShapes);

    navigator.clipboard
      .writeText(data)
      .then(() => {
        removeShapes(selectedShapeIds);
      })
      .catch((err) => {
        console.error('잘라내기에 실패했습니다:', err);
      });
  }

  // 복제하기
  public duplicate(
    shapes: Shape[],
    selectedShapeIds: string[],
    addShapes: (shapes: Shape[]) => void,
    setSelectedShapeIds: (ids: string[]) => void,
  ) {
    const selectedShapes = shapes.filter((shape) => selectedShapeIds.includes(shape.id));
    const newShapes = selectedShapes.map((shape) => ({
      ...shape,
      id: uuidv4(),
      x: shape.x + this.offset,
      y: shape.y + this.offset,
    }));
    addShapes(newShapes);
    setSelectedShapeIds(newShapes.map((shape) => shape.id));
  }

  public delete(selectedShapeIds: string[], removeShapes: (ids: string[]) => void) {
    removeShapes(selectedShapeIds);
  }

  public move(
    moveSelectedShapes: (deltaX: number, deltaY: number) => void,
    moveBoundingBoxes: (deltaX: number, deltaY: number) => void,
    deltaX: number,
    deltaY: number,
  ) {
    moveSelectedShapes(deltaX, deltaY);
    moveBoundingBoxes(deltaX, deltaY);
  }
}

export const shapeController: ShapeController = ShapeController.getInstance();
