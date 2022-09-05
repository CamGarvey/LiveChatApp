module.exports = {
  client: {
    service: 'graphchat',
    localSchemaFile: '../server/graphql/schema.graphql',
    excludes: ['**/generated/**'],
  },
};
