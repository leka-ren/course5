const Card = require('../models/card');
const NotFound = require('../customErrors/notFound');
const BadRequest = require('../customErrors/badRequest');
const ForbiddenError = require('../customErrors/forbiddenError');

const CardsErrorfound = new NotFound('card has not found');

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
      next(new BadRequest('validation link failed'));
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.id)
    .orFail(() => CardsErrorfound)
    .then((card) => {
      if (card.owner.toString() === req.user._id) {
        Card.findByIdAndRemove(req.params.id)
          .then((findCard) => {
            if (findCard !== null) res.send({ data: findCard });
          })
          .catch(next);
      } else {
        next(new ForbiddenError('forbidden'));
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
        next(CardsErrorfound);
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
        next(CardsErrorfound);
      } else {
        res.status(200).send(card);
      }
    })
    .catch(next);
};
