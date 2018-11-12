const gql = require('graphql')

const newsSchema = require('../models/newsModel')
const requestSender = require('../helpers/requestSender')
const endPointNews = require('../EndPointList/news')
const RedisController = require('./redisController')

const { getAllNewsUrl, getNewsById, createNewsUrl, deleteNewsUrl, updateNewsUrl } = endPointNews
const { redisGetter, redisSetter, redisGetterAndSetter } = RedisController

const query = new gql.GraphQLObjectType({
    name: 'rootQuery',
    fields: {
      news: {
        type: new gql.GraphQLList(newsSchema),
        resolve: async () => {
          
          let isReallyError = true
          let fixData = []

          return await redisGetter('newsAllData')
            .then(data => {
              if (data === null) {
                return requestSender(getAllNewsUrl, 'get')
              } else {
                console.log('data loaded from redis')

                fixData = JSON.parse(data)
  
                isReallyError = false
                throw new Error()
              }
            })
            .then(({ data : { data }})  => {
              redisSetter('newsAllData', data)
              return data
            })
            .catch(err => {
              if (!isReallyError) {
                return fixData
              }
              return err
            })
        }
      },
      newsById : {
        type: newsSchema,
        args: {
          _id: {
            type: gql.GraphQLID
          },
          title: {
            type: gql.GraphQLString
          },
        },
        resolve: async (_parent, args, _context) => {
          
          return await requestSender(getNewsById + '/' + args._id, 'get')
            .then(({ data: { data } }) => {
              return data
            })
            .catch(err => {
              return err
            })
        }
      } 
    }
})

const mutation = new gql.GraphQLObjectType({
    name: 'rootMutation',
    fields: {
      createNews: {
        type: newsSchema,
        args: {
          title: {
            type: gql.GraphQLString,
          },
          body: {
            type: gql.GraphQLString
          },
          token: {
            type: gql.GraphQLString
          }
        },
        resolve: async (_parent, args, _context) => {
          
          let { token, title, body } = args

          return await requestSender(createNewsUrl, 'post', { title, body }, { token: token } )
            .then(({data}) => {
              redisGetterAndSetter(getAllNewsUrl, 'newsAllData')
              return data
            })
            .catch(err => {
              return err
            })
        }
      },
      updateNews: {
        type: newsSchema,
        args: {
          _id: {
            type: gql.GraphQLID
          },
          title: {
            type: gql.GraphQLString,
          },
          body: {
            type: gql.GraphQLString
          },
          token: {
            type: gql.GraphQLString
          }
        },
        resolve: async (_parent, args, _context) => {
          
          let { _id, token, title, body } = args

          return await requestSender(updateNewsUrl + '/' + _id, 'put', { title, body }, { token: token } )
            .then(({data}) => {
              redisGetterAndSetter(getAllNewsUrl, 'newsAllData')
              return data
            })
            .catch(err => {
              return err
            })
        }
      },
      deleteNews: {
        type: newsSchema,
        args: {
          _id: {
            type: gql.GraphQLID
          },
          token: {
            type: gql.GraphQLString
          }
        },
        resolve: async (_parent, args, _context) => {
          
          let { _id, token } = args
          return await requestSender(deleteNewsUrl + '/' + _id, 'delete', null, { token: token } )
            .then(({data}) => {
              redisGetterAndSetter(getAllNewsUrl, 'newsAllData')
              return data
            })
            .catch(err => {
              return err
            })
        }
      }
    }
})

const newsController = new gql.GraphQLSchema({
  query, mutation
})

module.exports = newsController