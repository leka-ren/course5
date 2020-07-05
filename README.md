# PROJECT 13

Серверная разработка express.js

____

## Что использовалось

- [Библиотека пакетов NPM](https://nodejs.org/en/download/)

____

## Команды

- npm install - устанвока зависимостей
- npm run start - для запуска на локальном сервере
- npm run dev - develop запуск, hot reload

____

## Форматы запросов для User

### GET запрос

- запрос данных юзера осуществляется по адресу http://somehost:0000/users
- Поиск по id - http://somehost:0000/users/:someid (24-символьный хэш id)

### POST запрос

- адрес - http://somehost:0000/users
- json объект: {"name": "My Name", "about": "about me", "avatar": "http://link.co"}

### PATCH запрос

Update информации в объекте происходит раздельно name & about, avatar.

#### Name

- name & about адрес - http://somehost:0000/users/me
- json объект: {"name": "new name", "about": "my new inform"}

#### About

- avatar адрес - http://somehost:0000/users/me/avatar
- json объект: {"avatar": "http://newavatar.co"}

____

## Форматы для запросов Card

#### GET 
- запрос всех карточек по адресу - http://somehost:0000/cards
- поиск одной карточки по id - http://somehost:0000/cards/:someid (24-символьный хэш id)

#### POST запрос

- адрес - http://somehost:0000/cards/
- json объект: {"name": "card name", "link": "http://linkcardimg.co"}

#### DELETE запрос *удаление карточки

- адрес - http://somehost:0000/cards/:someid

#### PUT запрос на лайк

- адрес - http://somehost:0000/cards/:someid/likes

#### DELETE запрос *удаление лайка с карточки

- адрес - http://somehost:0000/cards/:someid/likes

____
