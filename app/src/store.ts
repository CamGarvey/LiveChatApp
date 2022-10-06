import create from 'zustand';

type Store = {
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
  closeDrawer: () => void;
  openDrawer: () => void;
};

const useStore = create<Store>((set) => ({
  isDrawerOpen: false,
  toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
  closeDrawer: () => set(() => ({ isDrawerOpen: false })),
  openDrawer: () => set(() => ({ isDrawerOpen: true })),
}));

export const useDrawer = () => ({
  isOpen: useStore((state) => state.isDrawerOpen),
  toggle: useStore((state) => state.toggleDrawer),
  open: useStore((state) => state.openDrawer),
  close: useStore((state) => state.closeDrawer),
});

