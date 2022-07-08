import create from 'zustand';
import { ChatInfo } from '../models';

type Store = {
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
  chat: ChatInfo;
};

const useStore = create<Store>((set) => ({
  isDrawerOpen: false,
  toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
  chat: null,
}));

export const useIsDrawerOpen = () => useStore((state) => state.isDrawerOpen);
export const useToggleDrawer = () => useStore((state) => state.toggleDrawer);
export const useChat = () => useStore((store) => store.chat);
export const useSetChat = () => (chat: ChatInfo) => useStore.setState({ chat });
