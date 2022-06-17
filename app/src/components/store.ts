import create from 'zustand';

type Store = {
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
  isCreateChannelModalOpen: boolean;
  openCreateChannelModal: () => void;
  closeCreateChannelModal: () => void;
};

const useStore = create<Store>((set) => ({
  isDrawerOpen: false,
  toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
  isCreateChannelModalOpen: false,
  openCreateChannelModal: () =>
    set(() => ({
      isCreateChannelModalOpen: true,
    })),
  closeCreateChannelModal: () =>
    set(() => ({ isCreateChannelModalOpen: false })),
}));

export const useIsDrawerOpen = () => useStore((state) => state.isDrawerOpen);
export const useToggleDrawer = () => useStore((state) => state.toggleDrawer);

export const useIsCreateChannelModalOpen = () =>
  useStore((state) => state.isCreateChannelModalOpen);

export const useOpenCreateChannelModal = () =>
  useStore((state) => state.openCreateChannelModal);
export const useCloseCreateChannelModal = () =>
  useStore((state) => state.closeCreateChannelModal);
