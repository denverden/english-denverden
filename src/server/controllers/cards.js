import mongoose from 'mongoose';
import Card from '../models/card';

exports.cardsGetAll = (req, res) => {
  Card.find()
    .then(records => {
      const response = {
        count: records.length,
        cards: records.map(record => {
          return {
            _id: record._id,
            word: record.word,
            translation: record.translation,
            image: record.image,
            audio: record.audio,
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};

exports.cardsCreate = (req, res) => {
  const card = new Card({
    _id: new mongoose.Types.ObjectId(),
    word: req.body.word,
    translation: req.body.translation,
    image: req.body.image,
    audio: req.body.audio,
  });
  card
    .save()
    .then(record => {
      res.status(201).json({
        message: 'Created card success!',
        createdCard: {
          _id: record._id,
          translation: record.translation,
          image: record.image,
          audio: record.audio,
        },
      });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};

exports.cardsGetOne = (req, res) => {
  Card.findById(req.params.id)
    .then(record => {
      if (record) {
        res.status(200).json(record);
      } else {
        res.status(404).json({ message: 'No valid entry found for provided ID' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};

exports.cardsUpdate = (req, res) => {
  const card = new Card({
    word: req.body.word,
    translation: req.body.translation,
    image: req.body.image,
    audio: req.body.audio,
  });
  Card.findByIdAndUpdate(req.params.id, card)
    .then(() => {
      res.status(200).json({
        message: 'Card updated success!',
        updateCard: {
          _id: req.params.id,
        },
      });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};

exports.cardsDelete = (req, res) => {
  Card.remove({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        message: 'Card deleted success!',
        deletedCard: {
          _id: req.params.id,
        },
      });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};
