const Movie = require('../models/movie')
const movietag = require('../helpers/movietag')
var ObjectID = require('mongodb').ObjectId; 

module.exports = {

  create: function (req,res) {

    // let dataTag = movietag(req.body.tag)

    let dataMovie = new Movie ({
      title: req.body.title,
      overview: req.body.overview,
      posterPath: req.body.posterPath,
      popularity: req.body.popularity,
      rating: req.body.rating,
      tag: req.body.tag,
      status: req.body.status,
      backgroundPath: req.body.backgroundPath,
      releaseDate: req.body.releaseDate,
      secondId: req.body.secondId
    })

    dataMovie.save()
      .then((response) => {
        res.status(201).json({
          message: `create movie ${req.body.title} success`,
          data: response
        })
      }).catch((err) => {
        res.status(500).json({
          message: `create movie ${req.body.title} failed`,
          errors: err
        })
      });

  },

  findAll: function(req,res) {

    Movie.find()
      .then((response) => {
        res.status(201).json({
          info: 'movie found successfully',
          data: response
        })
      }).catch((err) => {
        res.status(500).json({
          errors: err
        })
      });

  },

  update: function(req,res) {

    let dataTag = movietag(req.body.tag)

    Movie.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        overview: req.body.overview,
        posterPath: req.body.posterPath,
        popularity: req.body.popularity,
        rating: req.body.rating,
        tag: dataTag,
        status: req.body.status
      })
      .then((response) => {
        res.status(201).json({
          response
        })
      }).catch((err) => {
        res.status(500).json({
          err
        })
      });

  },

  delete: function (req,res) {

    Movie.findByIdAndDelete(req.params.id)
      .then((response) => {
        res.status(201).json({
          message: `delete movie ${response.title} success`
        })
      }).catch((err) => {
        res.status(500).json({
          err
        })
      });
  }

}