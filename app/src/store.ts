import create from 'zustand';

type Store = {
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
  chatId: string;
  setChatId: (chatId: string) => void;
};

const useStore = create<Store>((set) => ({
  isDrawerOpen: false,
  toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
  chatId: null,
  setChatId: (chatId: string) => set(() => ({ chatId })),
}));

export const useDrawer = () => ({
  isOpen: useStore((state) => state.isDrawerOpen),
  toggle: useStore((state) => state.toggleDrawer),
});
export const useChatId = () => ({
  chatId: useStore((state) => state.chatId),
  setChatId: useStore((state) => state.setChatId),
});
