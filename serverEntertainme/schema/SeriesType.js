const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList} = require('graphql')

const SeriesType = new GraphQLObjectType({
  name: 'SeriesType', 
  fields: {
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    overview: { type: GraphQLString },
    posterPath: { type: GraphQLString },
    popularity: { type: GraphQLString },
    tag: { type: new GraphQLList(GraphQLString) },
    rating: { type: GraphQLString },
    status: { type: GraphQLString },
    secondId: { type: GraphQLString },
    backgroundPath: { type: GraphQLString },
    releaseDate: { type: GraphQLString }
  }
})

module.exports = SeriesType