export interface MembersModified {
  __typename: 'MembersAdded' | 'MembersRemoved';
  byUserId: string;
  memberIds: string[];
}
