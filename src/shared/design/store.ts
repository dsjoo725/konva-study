import { createStore } from '@/shared/@common/createStore';
import { BoundingBox, Shape } from './type';

export type DesignStore = {
  shapes: Shape[];
  selectedIds: string[];
  boundingBoxes: BoundingBox[];
  actions: {
    addShapes: (shapes: Shape[]) => void;
    updateShapePosition: (id: string, x: number, y: number) => void;
    addSelectedIds: (ids: string[]) => void;
    updateSelectedIds: (ids: string[]) => void;
    updateBoundingBoxes: (boundingBoxes: BoundingBox[]) => void;
    updateBoundingBoxesPosition: (deltaX: number, deltaY: number) => void;
    updateSelectedShapesPosition: (deltaX: number, deltaY: number) => void;
  };
};

// eslint-disable-next-line @rushstack/typedef-var
const useDesignStore = createStore<DesignStore>((set) => ({
  shapes: [],
  selectedIds: [],
  boundingBoxes: [],

  actions: {
    addShapes: (shapes) => set((state) => ({ shapes: [...state.shapes, ...shapes] })),

    updateShapePosition: (id, x, y) =>
      set((state) => ({
        shapes: state.shapes.map((shape) => (shape.id === id ? { ...shape, x, y } : shape)),
      })),

    addSelectedIds: (ids) =>
      set((state) => ({
        selectedIds: [...state.selectedIds, ...ids.filter((id) => !state.selectedIds.includes(id))],
      })),

    updateSelectedIds: (ids) => set(() => ({ selectedIds: ids })),

    updateBoundingBoxes: (boundingBoxes) => set(() => ({ boundingBoxes })),

    updateBoundingBoxesPosition: (deltaX, deltaY) =>
      set((state) => ({
        boundingBoxes: state.boundingBoxes.map((boundingBox) => ({
          ...boundingBox,
          x: boundingBox.x + deltaX,
          y: boundingBox.y + deltaY,
        })),
      })),

    updateSelectedShapesPosition: (deltaX, deltaY) =>
      set((state) => ({
        shapes: state.shapes.map((shape) =>
          state.selectedIds.includes(shape.id)
            ? { ...shape, x: shape.x + deltaX, y: shape.y + deltaY }
            : shape,
        ),
      })),
  },
}));

export const useDesignActions = () => useDesignStore((state) => state.actions);
export const useDesignShapes = () => useDesignStore((state) => state.shapes);
export const useDesignSelectedIds = () => useDesignStore((state) => state.selectedIds);
export const useDesignBoundingBoxes = () => useDesignStore((state) => state.boundingBoxes);
