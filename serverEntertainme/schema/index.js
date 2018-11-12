const { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLString } = require('graphql')
const MovieType  = require('./MovieType')
const SeriesType = require('./SeriesType')
const { findAllMovie, findAllSeries, createDataMovie } = require('../controllers/entertainmeController')



const query = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      movies: {
        type: new GraphQLList(MovieType),
        resolve: async () => {
          let movies = await findAllMovie()
          return movies.data
        }
      },
      series: {
        type: new GraphQLList(SeriesType),
        resolve: async () => {
          let tv = await findAllSeries()
          return tv.data
        }
      }
    }
})


const mutation = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    createMovie: {
      type: MovieType,
      args: {
        title: { type: GraphQLString },
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
      },
      resolve: async (_parent, args, _context) => {

        try {
          let response = await createDataMovie(args)
          return response.data
        } catch (err) {
          return err
        }
         
      }
    },
  }
})


const schema = new GraphQLSchema({
  query, mutation
})

module.exports = schema