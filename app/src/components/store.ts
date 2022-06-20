import create from 'zustand';
import { FriendStatus } from '../graphql/generated/graphql';
import { ModalType } from '../models';

type Store = {
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
  isCreateChannelModalOpen: boolean;
  openCreateChannelModal: () => void;
  closeCreateChannelModal: () => void;
  isUserSearchModalOpen: boolean;
  openUserSearchModal: () => void;
  closeUserSearchModal: () => void;
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

  isUserSearchModalOpen: false,
  openUserSearchModal: () => set(() => ({ isUserSearchModalOpen: true })),
  closeUserSearchModal: () => set(() => ({ isUserSearchModalOpen: false })),
}));

export const useIsDrawerOpen = () => useStore((state) => state.isDrawerOpen);
export const useToggleDrawer = () => useStore((state) => state.toggleDrawer);

export const useOpenModal = (modal: ModalType) =>
  useStore((state) => {
    switch (modal) {
      case ModalType.CreateChannel:
        return state.openCreateChannelModal;
      case ModalType.UserSeach:
        return state.openUserSearchModal;
      default:
        return () => {};
    }
  });

export const useCloseModal = (modal: ModalType) =>
  useStore((state) => {
    switch (modal) {
      case ModalType.CreateChannel:
        return state.closeCreateChannelModal;
      case ModalType.UserSeach:
        return state.closeUserSearchModal;
      default:
        return () => {};
    }
  });

export const useIsModalOpen = (modal: ModalType) =>
  useStore((state) => {
    switch (modal) {
      case ModalType.CreateChannel:
        return state.isCreateChannelModalOpen;
      case ModalType.UserSeach:
        return state.isUserSearchModalOpen;
      default:
        return false;
    }
  });
