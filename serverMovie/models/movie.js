const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  title: String,
  overview: String,
  posterPath: String,
  popularity: String,
  rating: String,
  tag: [{type: String}],
  status: String,
  secondId: String,
  backgroundPath: String,
  releaseDate: String
},{
  timestamps: true
});

const Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie