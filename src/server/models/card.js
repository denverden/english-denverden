import mongoose from 'mongoose';

const cardSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  word: {
    type: String,
  },
  translation: {
    type: String,
  },
  image: {
    type: String,
  },
  audio: {
    type: String,
  },
});

module.exports = mongoose.model('Card', cardSchema);
