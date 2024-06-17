import { createLocalStore } from '@/shared/@common/createStore';

export interface CanvasStore {
  width: number;
  height: number;
  scale: number;

  actions: {
    updateCanvas: (width: number, height: number, scale: number) => void;
  };
}

// eslint-disable-next-line @rushstack/typedef-var
const useCanvasStore = createLocalStore<CanvasStore>('canvas', (set) => ({
  width: 0,
  height: 0,
  scale: 1,

  actions: {
    updateCanvas: (width, height, scale) => {
      set({ width, height, scale });
    },
  },
}));

export const useCanvasActions = () => useCanvasStore((state) => state.actions);
export const useCanvas = () =>
  useCanvasStore((state) => ({
    width: state.width,
    height: state.height,
    scale: state.scale,
  }));
