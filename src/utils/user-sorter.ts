type User = {
  __typename?: 'Friend' | 'Me' | 'Stranger' | undefined;
};

export const sortRelationship = (a: User, b: User): number => {
  if (a.__typename === 'Me') return -1;
  if (b.__typename === 'Me') return 1;
  if (a.__typename === 'Friend') return -1;
  if (b.__typename === 'Friend') return 1;
  return 0;
};
