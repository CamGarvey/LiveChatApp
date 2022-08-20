import create from 'zustand';

type Store = {
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
};

const useStore = create<Store>((set) => ({
  isDrawerOpen: false,
  toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
  chat: null,
}));

export const useIsDrawerOpen = () => useStore((state) => state.isDrawerOpen);
export const useToggleDrawer = () => useStore((state) => state.toggleDrawer);
