# Курс 5

Серверная разработка express.js, для проекта MESTO

____

## Что использовалось

- [NodeJS](https://nodejs.org/en/)
- [Библиотека пакетов NPM](https://nodejs.org/en/download/)
- [MongoDB Compass](https://www.mongodb.com/products/compass)
- [Postman](https://www.postman.com/)

____

## Команды

- npm install - устанвока зависимостей
- npm run start - для запуска на локальном сервере
- npm run dev - develop запуск, hot reload

*Дефолтный url локального запуска - http://localhost:3000/
____

## Запросы к контроллеру User

### GET запрос

- запрос данных юзера осуществляется по url /users
- Поиск по id - users/:someid (24-символьный хэш id)

### POST запрос

<<<<<<< HEAD
- url - /users
=======
- адрес - /users
>>>>>>> 28a64d5bdc71e0c787cb0f85a81f0c2a35d7b217
- json объект: {"name": "My Name", "about": "about me", "avatar": "http://link.co"}

### PATCH запрос

Update информации в объекте происходит раздельно name & about, avatar.

#### Name

<<<<<<< HEAD
- name & about url - /users/me
=======
- name & about адрес - /users/me
>>>>>>> 28a64d5bdc71e0c787cb0f85a81f0c2a35d7b217
- json объект: {"name": "new name", "about": "my new inform"}

#### About

<<<<<<< HEAD
- avatar url - /users/me/avatar
=======
- avatar адрес - /users/me/avatar
>>>>>>> 28a64d5bdc71e0c787cb0f85a81f0c2a35d7b217
- json объект: {"avatar": "http://newavatar.co"}

____

## Запросы к контроллеру Card

### GET 
<<<<<<< HEAD
- запрос всех карточек по url  - /cards
=======
- запрос всех карточек по адресу - /cards
>>>>>>> 28a64d5bdc71e0c787cb0f85a81f0c2a35d7b217
- поиск одной карточки по id - /cards/:someid (24-символьный хэш id)

### POST запрос

<<<<<<< HEAD
- url - /cards
=======
- адрес - /cards
>>>>>>> 28a64d5bdc71e0c787cb0f85a81f0c2a35d7b217
- json объект: {"name": "card name", "link": "http://linkcardimg.co"}

### DELETE запрос *удаление карточки

<<<<<<< HEAD
- url - /cards/:someid

### PUT запрос на лайк

- url - /cards/:someid/likes

### DELETE запрос *удаление лайка с карточки

- url - /cards/:someid/likes
=======
- адрес - /cards/:someid

### PUT запрос на лайк

- адрес - /cards/:someid/likes

### DELETE запрос *удаление лайка с карточки

- адрес - /cards/:someid/likes
>>>>>>> 28a64d5bdc71e0c787cb0f85a81f0c2a35d7b217

____
