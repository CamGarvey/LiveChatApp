/**
 * Builds a description from a list of users.
 * ie. user1, user2 and 5 others...
 * @param users
 * @returns
 */
export const buildUserDescription = (users: { username: string }[]) => {
  const usernames = users.map((x) => x.username);

  if (usernames.length <= 2) {
    return usernames.join(' and ');
  }

  const remaining = usernames.length - 2;
  return usernames.slice(0, 2).join(', ') + ` and ${remaining} other${remaining > 1 ? 's' : ''}`;
};
