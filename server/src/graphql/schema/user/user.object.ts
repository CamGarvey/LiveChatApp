import { objectType } from 'nexus';

export const Friend = objectType({
  name: 'Friend',
  definition: (t) => {
    t.implements('UserInterface', 'KnownUserInterface');
  },
});

export const Me = objectType({
  name: 'Me',
  definition: (t) => {
    t.implements('UserInterface', 'KnownUserInterface');
  },
});

export const Stranger = objectType({
  name: 'Stranger',
  definition: (t) => {
    t.implements('UserInterface');
  },
});
