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

## Запросы к контроллеру User

### GET запрос

- запрос данных юзера осуществляется по url /users
- Поиск по id - users/:someid (24-символьный хэш id)

### POST запрос

- url - /users
- json объект: {"name": "My Name", "about": "about me", "avatar": "http://link.co"}

### PATCH запрос

Update информации в объекте происходит раздельно name & about, avatar.

#### Name

- name & about url - /users/me
- json объект: {"name": "new name", "about": "my new inform"}

#### About

- avatar url - /users/me/avatar
- json объект: {"avatar": "http://newavatar.co"}

____

## Запросы к контроллеру Card

### GET 
- запрос всех карточек по url  - /cards
- поиск одной карточки по id - /cards/:someid (24-символьный хэш id)

### POST запрос

- url - /cards
- json объект: {"name": "card name", "link": "http://linkcardimg.co"}

### DELETE запрос *удаление карточки

- url - /cards/:someid

### PUT запрос на лайк

- url - /cards/:someid/likes

### DELETE запрос *удаление лайка с карточки

- url - /cards/:someid/likes

____
