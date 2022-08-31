import create from 'zustand';

type Store = {
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
};

const useStore = create<Store>((set) => ({
  isDrawerOpen: false,
  toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
}));

export const useDrawer = () => ({
  isOpen: useStore((state) => state.isDrawerOpen),
  toggle: useStore((state) => state.toggleDrawer),
});
