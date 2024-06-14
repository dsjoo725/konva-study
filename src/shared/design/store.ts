import { createStore } from '@/shared/@common/createStore';
import { BoundingBox, Shape } from './type';

export type DesignStore = {
  shapes: Shape[];
  selectedShapeIds: string[];
  boundingBoxes: BoundingBox[];
  actions: {
    addShapes: (shapes: Shape[]) => void;
    removeShapes: (ids: string[]) => void;
    updateShapePosition: (id: string, x: number, y: number) => void;
    updateShapeAttributes: (attributes: (Partial<Shape> & { id: string })[]) => void;
    moveSelectedShapes: (deltaX: number, deltaY: number) => void;
    addSelectedShapeIds: (ids: string[]) => void;
    removeSelectedShapeIds: (ids: string[]) => void;
    setSelectedShapeIds: (ids: string[]) => void;
    setBoundingBoxes: (boundingBoxes: BoundingBox[]) => void;
    moveBoundingBoxes: (deltaX: number, deltaY: number) => void;
  };
};

// eslint-disable-next-line @rushstack/typedef-var
const useDesignStore = createStore<DesignStore>((set) => ({
  shapes: [],
  selectedShapeIds: [],
  boundingBoxes: [],

  actions: {
    // 도형 추가
    addShapes: (shapes) =>
      set((state) => ({
        shapes: [...state.shapes, ...shapes],
      })),

    // 도형 삭제
    removeShapes: (ids: string[]) =>
      set((state) => ({
        shapes: state.shapes.filter((shape) => !ids.includes(shape.id)),
        selectedShapeIds: state.selectedShapeIds.filter((id) => !ids.includes(id)),
      })),

    // 도형 위치 업데이트
    updateShapePosition: (id, x, y) =>
      set((state) => ({
        shapes: state.shapes.map((shape) => (shape.id === id ? { ...shape, x, y } : shape)),
      })),

    // 도형 속성 업데이트
    updateShapeAttributes: (attributes) =>
      set((state) => ({
        shapes: state.shapes.map((shape) => {
          const updatedShape = attributes.find((attr) => attr.id === shape.id);
          return updatedShape ? { ...shape, ...updatedShape } : shape;
        }),
      })),

    // 선택된 도형 이동
    moveSelectedShapes: (deltaX, deltaY) =>
      set((state) => ({
        shapes: state.shapes.map((shape) =>
          state.selectedShapeIds.includes(shape.id)
            ? { ...shape, x: shape.x + deltaX, y: shape.y + deltaY }
            : shape,
        ),
      })),

    // 선택된 도형 ID 추가
    addSelectedShapeIds: (ids) =>
      set((state) => ({
        selectedShapeIds: [
          ...state.selectedShapeIds,
          ...ids.filter((id) => !state.selectedShapeIds.includes(id)),
        ],
      })),

    // 선택된 도형 ID 제거
    removeSelectedShapeIds: (ids) =>
      set((state) => ({
        selectedShapeIds: state.selectedShapeIds.filter((id) => !ids.includes(id)),
      })),

    // 선택된 도형 ID 설정
    setSelectedShapeIds: (ids) =>
      set(() => ({
        selectedShapeIds: ids,
      })),

    // 바운딩 박스 설정
    setBoundingBoxes: (boundingBoxes) =>
      set(() => ({
        boundingBoxes,
      })),

    // 바운딩 박스 이동
    moveBoundingBoxes: (deltaX, deltaY) =>
      set((state) => ({
        boundingBoxes: state.boundingBoxes.map((boundingBox) => ({
          ...boundingBox,
          x: boundingBox.x + deltaX,
          y: boundingBox.y + deltaY,
        })),
      })),
  },
}));

export const useDesignActions = () => useDesignStore((state) => state.actions);
export const useShapes = () => useDesignStore((state) => state.shapes);
export const useSelectedShapeIds = () => useDesignStore((state) => state.selectedShapeIds);
export const useBoundingBoxes = () => useDesignStore((state) => state.boundingBoxes);
