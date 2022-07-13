import { connectionPlugin, fieldAuthorizePlugin, makeSchema } from 'nexus';
import path from 'path';
import * as allTypes from './schema';

console.log({ FoundTypes: allTypes });

export const schema = makeSchema({
  types: allTypes,

  plugins: [connectionPlugin(), fieldAuthorizePlugin()],
  outputs: {
    typegen: path.join(process.cwd(), 'src', 'nexus.d.ts'),
    schema: path.join(process.cwd(), 'src', 'graphql', 'schema.graphql'),
  },
  contextType: {
    export: 'IContext',
    module: path.join(process.cwd(), 'src', 'graphql', 'context.interface.ts'),
  },
});
