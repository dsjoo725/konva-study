import { create, StateCreator } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

/**
 * @name createStore
 * @description
 * Zustand 상태 관리를 위한 기본 store를 생성합니다.
 * Immer와 Devtools 미들웨어가 적용되어 있습니다.
 * ```typescript
 * createStore(
 *   // Zustand 상태 초기화를 위한 함수
 *   initializer: StateCreator<T, [['zustand/devtools', never], ['zustand/immer', never]]>
 * ): ZustandStore<T>
 * ```
 * @example
 * const useStore = createStore((set) => ({
 *   count: 0,
 *   actions: {
 *     increment: () => set((state) => { state.count += 1; }),
 *   },
 * }));
 */
export const createStore = <T extends object>(
  initializer: StateCreator<T, [['zustand/devtools', never], ['zustand/immer', never]]>,
) =>
  create<T, [['zustand/devtools', never], ['zustand/immer', never]]>(devtools(immer(initializer)));

/**
 * @name createLocalStore
 * @description
 * 로컬 스토리지를 활용하는 Zustand 상태 관리를 위한 store를 생성합니다.
 * Immer, Devtools, 그리고 Persist 미들웨어가 적용되어 있습니다.
 * ```typescript
 * createLocalStore(
 *   // 로컬 스토리지에 저장할 이름
 *   name: string,
 *   // Zustand 상태 초기화를 위한 함수
 *   initializer: StateCreator<
 *     T,
 *     [['zustand/devtools', never], ['zustand/persist', unknown], ['zustand/immer', never]]
 *   >
 * ): ZustandStore<T>
 * ```
 * @example
 * const useLocalStore = createLocalStore('myStore', (set) => ({
 *   count: 0,
 *   actions: {
 *     increment: () => set((state) => { state.count += 1; }),
 *   },
 * }));
 */
export const createLocalStore = <T extends object>(
  name: string,
  initializer: StateCreator<
    T,
    [['zustand/devtools', never], ['zustand/persist', unknown], ['zustand/immer', never]]
  >,
) =>
  create<T, [['zustand/devtools', never], ['zustand/persist', unknown], ['zustand/immer', never]]>(
    devtools(
      persist(immer(initializer), {
        name,
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => {
          if (state && 'actions' in state) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { actions, ...rest } = state;
            return rest;
          }
          return state;
        },
      }),
    ),
  );
