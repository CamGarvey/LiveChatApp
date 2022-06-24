import create from 'zustand';
import { ChannelInfo } from '../models';

type Store = {
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
  channel: ChannelInfo;
};

const useStore = create<Store>((set) => ({
  isDrawerOpen: false,
  toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
  channel: null,
}));

export const useIsDrawerOpen = () => useStore((state) => state.isDrawerOpen);
export const useToggleDrawer = () => useStore((state) => state.toggleDrawer);
export const useChannel = () => useStore((store) => store.channel);
export const useSetChannel = () => (channel: ChannelInfo) =>
  useStore.setState({ channel });
