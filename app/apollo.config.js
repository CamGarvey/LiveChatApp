module.exports = {
  client: {
    name: 'graphchat',
    service: 'graphchat',
    localSchemaFile: '../server/graphql/schema.graphql',
    excludes: ['**/generated/**'],
  },
};
