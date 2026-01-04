import { createContext, useContext, useState } from "react";
import { createStore, useStore } from "zustand";

export type MirrorItem = {
  id: string;
  rect: DOMRect;
  element: HTMLElement;
  visible: boolean;
  borderRadius: number;
  props: GlassProps;
};

export type GlassProps = {
  tintColor?: string;
  tintStrength?: number;
  distortion?: number;
  blur?: number;
};

export type MirrorConfig = {
  backgroundImage: string;
  renderBackground: boolean;
};

interface MirrorState {
  items: Record<string, MirrorItem>;
  config: MirrorConfig;
  register: (id: string, element: HTMLElement, props: GlassProps) => void;
  unregister: (id: string) => void;
  update: (
    id: string,
    rect: DOMRect,
    borderRadius: number,
    props: GlassProps
  ) => void;
}

type MirrorStore = ReturnType<typeof createMirrorStore>;

const createMirrorStore = (initialConfig: MirrorConfig) =>
  createStore<MirrorState>((set) => ({
    items: {},
    config: initialConfig,
    register: (id, element, props) =>
      set((state) => ({
        items: {
          ...state.items,
          [id]: {
            id,
            element,
            rect: element.getBoundingClientRect(),
            visible: true,
            borderRadius: 0,
            props,
          },
        },
      })),
    unregister: (id) =>
      set((state) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [id]: _removed, ...rest } = state.items;
        return { items: rest };
      }),
    update: (id, rect, borderRadius, props) =>
      set((state) => {
        const item = state.items[id];
        if (
          !item ||
          (item.rect.x === rect.x &&
            item.rect.y === rect.y &&
            item.rect.width === rect.width &&
            item.rect.height === rect.height &&
            item.borderRadius === borderRadius &&
            item.props === props) // Simple reference check mostly
        ) {
          return state;
        }
        return {
          items: {
            ...state.items,
            [id]: { ...item, rect, borderRadius, props },
          },
        };
      }),
  }));

const MirrorContext = createContext<MirrorStore | null>(null);

export const MirrorProvider = ({
  children,
  config,
}: {
  children: React.ReactNode;
  config: MirrorConfig;
}) => {
  const [store] = useState(() => createMirrorStore(config));
  return (
    <MirrorContext.Provider value={store}>{children}</MirrorContext.Provider>
  );
};

export const useMirrorStore = <T,>(selector: (state: MirrorState) => T): T => {
  const store = useContext(MirrorContext);
  if (!store) throw new Error("Missing MirrorProvider");
  return useStore(store, selector);
};
