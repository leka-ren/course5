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
### Get запрос
- запрос всех карточек осуществляется по адресу http://somehost:0000/users.
- Поиск по id - http://somehost:0000/users/:someid (24-симольный хэш id).
### Post запрос
- адрес - http://somehost:0000/users/
- json объект: {"name": "My Name", "about": "about me", "avatar": "http://link.co"}
### Patch запрос 
Update информации в объекте происходит раздельно name & about, avatar.
#### Name
- name & about адрес - http://somehost:0000/users/me
- json объект: {"name": "new name", "about": "mu new inform"}
#### About
- avatar адрес - http://somehost:0000/users/me/avatar
- json объект: {"avatar": "http://newavatar.co"}
____
