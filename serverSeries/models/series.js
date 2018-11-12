const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SeriesSchema = new Schema({
  title: String,
  overview: String,
  posterPath: String,
  popularity: String,
  rating: String,
  tag: [{text: {type: String}}],
  status: String,
  secondId: String
},{
  timestamps: true
});

const Series = mongoose.model('Series', SeriesSchema);

module.exports = Series