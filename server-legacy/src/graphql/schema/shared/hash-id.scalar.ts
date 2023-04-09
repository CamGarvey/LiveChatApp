import { scalarType } from 'nexus';
import { Kind } from 'graphql';
import hashids from 'hashids';

const hash = new hashids(
  process.env.HASH_SALT,
  parseInt(process.env.HASH_MIN_LENGTH)
);

export const HashIdScalar = scalarType({
  name: 'HashId',
  asNexusMethod: 'hashId',
  parseValue(value: any) {
    const [id] = hash.decode(value);
    return id;
  },
  serialize(value: any) {
    return hash.encode(value);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      const [id] = hash.decode(ast.value);
      return id;
    }
    return null;
  },
});
