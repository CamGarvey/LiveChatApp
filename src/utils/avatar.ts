export const getUserAvatar = (username: string) =>
  `${process.env.REACT_APP_AVATAR_BASE_URL}/api/avataaars/${username}e.svg`;

export const getChatAvatar = (chatName: string) =>
  `${process.env.REACT_APP_AVATAR_BASE_URL}/api/jdenticon/${chatName}.svg`;

export const AVATAR_SIZES = {
  xs: 16,
  sm: 26,
  md: 38,
  lg: 56,
  xl: 84,
};
