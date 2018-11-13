const axios = require('axios')
const redis = require('redis'),
      client = redis.createClient()

module.exports = {

  findAllMovie: function(req,res) {  
    return new Promise((resolve, reject) => {
      client.get('entertainme/movies', (err,reply) => {
        if(reply) {
          resolve(JSON.parse(reply))
        } else {
          getDataMovie(resolve,reject)    
        } 
      })
    })
   
  },

  findAllSeries: function(req,res) {

    return new Promise((resolve, reject) => {
      client.get('entertainme/series', (err,reply) => {
        if(reply) {
          resolve(JSON.parse(reply))
        } else {
          getDataSeries(resolve, reject)
        } 
      })
    })
    
  },

  findOneMovie: function(movieId) {
    return new Promise((resolve, reject) => {
      let data = args
      axios({
        method: 'GET',
        url: `${process.env.URIMOVIE}/movies/${movieId}`,
      })
        .then((response) => {
          getDataMovie(resolve,reject) 
          resolve(response.data)
        }).catch((err) => {
          reject(err)
        });
    })
  },

  createDataMovie: function(args) {
    return new Promise((resolve, reject) => {
      let data = args
      axios({
        method: 'POST',
        url: `${process.env.URIMOVIE}/movies/create`,
        data
      })
        .then((response) => {
          getDataMovie(resolve,reject) 
          resolve(response.data)
        }).catch((err) => {
          reject(err)
        });
    })
  },

  createDataTv: function(req,res) {
    
    let data = req.body
    axios({
      method: 'POST',
      url: `${process.env.URITV}/tv/create`,
      data
    })
      .then((response) => {
        getDataSeries(req,res)
      }).catch((err) => {
        console.log(err)
      });
  }
 

}


function getDataMovie (resolve,reject) {
    axios({
      method: 'GET',
      url: `${process.env.URIMOVIE}/movies`
    })
    .then((response) => {
      client.set('movies', JSON.stringify(response.data), 'EX', 10)
      resolve(response.data)
    }).catch((err) => {
     reject(err)
    });

}

function getDataSeries (resolve,reject) {
 
    axios({
      method: 'GET',
      url: `${process.env.URITV}/tv`
    })
    .then((response) => {
      client.set('entertainme/series', JSON.stringify(response.data), 'EX', 10)
      resolve(response.data)
    }).catch((err) => {
      reject(err)
    });

}