const Card = require('../models/card');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user;

  Card.create({ name, link, owner })
    .then((card) => res.status(200).send({ data: card }))
    // eslint-disable-next-line no-unused-vars
    .catch((e) => {
      const err = new Error('validation link failed');
      err.statusCode = 400;

      next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.id)
    .orFail(() => new Error('card has not found'))
    .then((card) => {
      if (card.owner.toString() === req.user._id) {
        Card.findByIdAndRemove(req.params.id)
          .then((findCard) => {
            if (findCard !== null) res.send({ data: findCard });
          })
          .catch(next);
      } else {
        const err = new Error('forbidden');
        err.statusCode = 403;
        next(err);
      }
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $addToSet: { likes: req.user._id },
    },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        const err = new Error('card`s not found');
        err.statusCode = 404;
        next(err);
      } else {
        res.status(200).send(card);
      }
    })
    .catch(next);
};

module.exports.deleteLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $pull: { likes: req.user._id },
    },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        const err = new Error('card`s not found');
        err.statusCode = 404;
        next(err);
      } else {
        res.status(200).send(card);
      }
    })
    .catch(next);
};
