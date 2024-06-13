import { createStore } from '@/shared/@common/createStore';

export type PaperStore = {
  width: number;
  height: number;
  actions: {};
};

// eslint-disable-next-line @rushstack/typedef-var
const usePaperStore = createStore<PaperStore>((set) => ({
  width: 812,
  height: 1218,
  actions: {},
}));

export const useDesignActions = () => usePaperStore((state) => state.actions);
export const usePaper = () =>
  usePaperStore((state) => ({ width: state.width, height: state.height }));
