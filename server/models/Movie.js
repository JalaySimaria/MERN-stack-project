const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Movie', MovieSchema);
