export const getUserAvatar = (username: string) =>
  `${import.meta.env.VITE_APP_AVATAR_BASE_URL}/api/avataaars/${username}e.svg`;

export const getChatAvatar = (chatName: string) =>
  `${import.meta.env.VITE_AVATAR_BASE_URL}/api/jdenticon/${chatName}.svg`;

export const AVATAR_SIZES = {
  xs: 16,
  sm: 26,
  md: 38,
  lg: 56,
  xl: 84,
};
