import {
  randEmail,
  randFirstName,
  randLastName,
  randUserName,
} from '@ngneat/falso';

let users: { email: string; name: string; username: string }[] = [];

for (let i = 0; i < 200; i++) {
  const firstName = randFirstName();
  const lastName = randLastName();
  users.push({
    email: randEmail({ firstName, lastName }),
    username: randUserName({ firstName, lastName }),
    name: `${firstName} ${lastName}`,
  });
}

console.log(users);

export default users;
