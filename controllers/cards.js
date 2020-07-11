const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send({ data: cards }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user;

  Card.create({ name, link, owner })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'validation link failed' });
      } else {
        res.status(500).send({ message: 'somthing wrong' });
      }
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findById(req.params.id)
    .orFail()
    .then((card) => {
      if (card.owner.toString() === req.user._id) {
        Card.findByIdAndRemove(req.params.id)
          .then((findCard) => {
            if (findCard !== null) res.send({ data: findCard });
          })
          .catch(() => {
            res.status(500).send({ message: 'something wrong' });
          });
      } else {
        res.status(403).send({ message: 'forbidden' });
      }
    })
    .catch((e) => {
      if (e.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'card has not found' });
      } else {
        res.status(500).send({ message: 'something wrong' });
      }
    });
};

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
