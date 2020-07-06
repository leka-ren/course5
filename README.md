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

____

## Запросы к контроллеру User

### GET запрос

- запрос данных юзера осуществляется по url /users
- Поиск по id - users/:someid (24-символьный хэш id)

### POST запрос

- адрес - /users
- json объект: {"name": "My Name", "about": "about me", "avatar": "http://link.co"}

### PATCH запрос

Update информации в объекте происходит раздельно name & about, avatar.

#### Name

- name & about адрес - /users/me
- json объект: {"name": "new name", "about": "my new inform"}

#### About

- avatar адрес - /users/me/avatar
- json объект: {"avatar": "http://newavatar.co"}

____

## Запросы к контроллеру Card

### GET 
- запрос всех карточек по адресу - /cards
- поиск одной карточки по id - /cards/:someid (24-символьный хэш id)

### POST запрос

- адрес - /cards
- json объект: {"name": "card name", "link": "http://linkcardimg.co"}

### DELETE запрос *удаление карточки

- адрес - /cards/:someid

### PUT запрос на лайк

- адрес - /cards/:someid/likes

### DELETE запрос *удаление лайка с карточки

- адрес - /cards/:someid/likes

____
