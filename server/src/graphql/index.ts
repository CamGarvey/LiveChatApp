import { connectionPlugin, makeSchema } from 'nexus';
import path from 'path';
import * as allTypes from './schema';

export const schema = makeSchema({
  types: allTypes,
  plugins: [connectionPlugin()],
  outputs: {
    typegen: path.join(process.cwd(), 'src', 'nexus.d.ts'),
    schema: path.join(process.cwd(), 'src', 'graphql', 'schema.graphql'),
  },
  features: {
    abstractTypeStrategies: {
      resolveType: false,
    },
  },
  contextType: {
    export: 'IContext',
    module: path.join(process.cwd(), 'src', 'graphql', 'context.interface.ts'),
  },
});
