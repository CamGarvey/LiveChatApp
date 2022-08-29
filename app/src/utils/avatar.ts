export const getUserAvatar = (username: string) =>
  `${process.env.REACT_APP_AVATAR_BASE_URL}/api/avataaars/${username}e.svg`;

export const getChatAvatar = (chatName: string) =>
  `${process.env.REACT_APP_AVATAR_BASE_URL}/api/jdenticon/${chatName}.svg`;
