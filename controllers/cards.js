const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send({ data: cards }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (card !== null) {
        res.send({ data: card });
      } else {
        res.status(404).send({ message: 'card has not found' });
      }
    })
    .catch(() => res.status(404).send({ message: 'card does not exist' }));
};

// eslint-disable-next-line no-unused-vars
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $addToSet: { likes: req.user._id },
    },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'card`s not found' });
      } else {
        res.status(200).send(card);
      }
    })
    .catch(() => res.status(500).send({ message: 'somthing wrong' }));
};

module.exports.deleteLikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $pull: { likes: req.user._id },
    },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'card`s not found' });
      } else {
        res.status(200).send(card);
      }
    })
    .catch(() => res.status(404).send({ message: 'somthing wrong' }));
};
