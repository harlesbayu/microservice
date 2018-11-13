const Series = require('../models/series')
const seriesTag = require('../helpers/seriesTag')

module.exports = {

  create: function (req,res) {

    // let dataTag = seriesTag(req.body.tag)

    let dataMovie = new Series ({
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
          message: `create tv series ${req.body.title} success`,
          data: response
        })
      }).catch((err) => {
        res.status(500).json({
          message: `create tv series ${req.body.title} failed`,
          errors: err
        })
      });

  },

  findAll: function(req,res) {

    Series.find()
      .then((response) => {
        res.status(201).json({
          info: 'tv found successfully',
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

    Series.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        overview: req.body.overview,
        posterPath: req.body.posterPath,
        popularity: req.body.popularity,
        rating: req.body.rating,
        tag: dataTag,
        status: req.body.status,
        secondId: req.body.secondId
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

    Series.findByIdAndDelete(req.params.id)
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