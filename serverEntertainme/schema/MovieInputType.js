const {GraphQLString, GraphQLList, GraphQLInputObjectType, GraphQLID  } = require('graphql')

const MovieInputType = new GraphQLInputObjectType({
  name: 'UserInputType',
  description: 'User payload definition',
  fields: () => ({
    title: {
      type: GraphQLString,
    },
  }),
});

module.exports = MovieInputType