const axios = require('axios')
const redis = require('redis'),
      client = redis.createClient()
const uriMovie = 'http://localhost:3001'
const uriTv = 'http://localhost:3002'

module.exports = {

  findAll: function(req,res) {

    client.get('entertainme', (err,reply) => {
      if(reply) {
        res.status(201).json(JSON.parse(reply))
      } else if (reply === null)  {
          getDataMovie(req,res)   
      } else {}
    })
   
  },


  createDataMovie: function(req,res) {
    let data = req.body
    axios({
      method: 'POST',
      url: `${process.env.URIMOVIE}/movies`,
      data
    })
      .then((response) => {
        getDataMovie(req,res)
      }).catch((err) => {
        // console.log(err)
      });
  },

  createDataTv: function(req,res) {
    let data = req.body
    axios({
      method: 'POST',
      url: `${process.env.URITV}/tv`,
      data
    })
      .then((response) => {
        getDataMovie(req,res)
      }).catch((err) => {
        // console.log(err)
      });
  }
 

}


function getDataMovie (req,res) {

    let movies = axios({
      method: 'GET',
      url: `${process.env.URIMOVIE}/movies`
    })

    let tv =  axios({
        method: 'GET',
        url: `${process.env.URITV}/tv`
      })

    Promise.all([movies, tv])
    .then((response) => {
      
      let data = {
        movies: response[0].data,
        tv: response[1].data
      }

      client.set('entertainme', JSON.stringify(data), 'EX', 10)
      res.status(201).json(data)

    }).catch((err) => {});

}