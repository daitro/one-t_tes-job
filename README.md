# Тестовое задание для компании 1T </br>

В проекте корневая папка приложения это серверная часть, написанная на *node.js* без подключения к БД. </br>
В корневой папке есть папка **client** - это frontend-часть, собранная с помощью сервиса Vue CLI и написанная на Vue.
Ниже представлены команды для установки и запуска приложения в режиме разработки.

## Установка зависимостей

Установка серверной части
```
npm install
```
Установка frontend-части
```
npm client:install
```

### Запуск приложения в режиме разработки
Запуск сервера
```
npm run serve
```
Запуск frontend-части
```
npm run client
```
Одновременный запуск серверной и frontend частей 
```
npm run dev
```

### Сборка frontend-части и запуск сервера в prod режиме 
Сборка frontend-части
```
npm run client:build
```
Запуск в production
```
npm run start
```
