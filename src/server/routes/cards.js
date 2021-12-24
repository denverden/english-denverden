import express from 'express';
import Card from '../controllers/cards';

const router = express.Router();

router.get('/', Card.cardsGetAll);

router.post('/', Card.cardsCreate);

router.get('/:id', Card.cardsGetOne);

router.patch('/:id', Card.cardsUpdate);

router.delete('/:id', Card.cardsDelete);

module.exports = router;
