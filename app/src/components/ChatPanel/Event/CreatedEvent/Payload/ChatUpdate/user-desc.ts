export const userDesc = (users: { username: string }[]) => {
  const usernames = users.map((x) => x.username);
  if (usernames.length <= 2) return usernames.join(' and ');
  const remaining = usernames.length - 2;
  return (
    usernames.slice(0, 2).join(' and ') +
    ` and ${remaining} other${remaining > 1 ? 's' : ''}`
  );
};
