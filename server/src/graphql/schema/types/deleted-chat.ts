import { objectType } from 'nexus';
import { DateScalar } from './scalars';

export const DeletedChat = objectType({
  name: 'DeletedChat',
  definition: (t) => {
    t.implements('IChat');
  },
});
