# SoundNest — Backend

Это серверная часть проекта [soundnest.ru](https://soundnest.ru) — музыкальной платформы для размещения, прослушивания и распространения аудиоконтента.

## 🚀 Технологии

- **NestJS** — серверный фреймворк на TypeScript
- **MongoDB + Mongoose** — база данных
- **Serve Static** — раздача фронтенда через сервер
- **Jest** — тестирование
- **ESLint + Prettier** — контроль качества и форматирование кода

## 📁 Структура

| Путь            | Описание                                         |
| --------------- | ------------------------------------------------ |
| `src/`          | Исходный код приложения                          |
| `static/`       | Фронтенд-часть (копируется в `dist/` при сборке) |
| `dist/`         | Собранный проект                                 |
| `test/`         | Юнит- и e2e-тесты                                |
| `package.json`  | Метаданные проекта и список зависимостей         |
| `tsconfig.json` | Конфигурация TypeScript                          |

## 📦 Установка

```bash
git clone https://github.com/your-username/music-platform-server.git
cd soundnest-backend
npm install

| Команда              | Описание                                   |
| -------------------- | ------------------------------------------ |
| `npm run start`      | Запуск сервера                             |
| `npm run start:dev`  | Запуск в режиме разработки (watch mode)    |
| `npm run build`      | Сборка проекта и копирование static-файлов |
| `npm run start:prod` | Запуск собранного проекта                  |
| `npm run lint`       | Линтинг кода                               |
| `npm run format`     | Форматирование кода                        |
| `npm run test`       | Запуск всех тестов                         |
| `npm run test:watch` | Тесты в watch-режиме                       |
| `npm run test:cov`   | Покрытие кода тестами                      |
| `npm run test:e2e`   | End-to-end тесты                           |

npm run build
npm run start:prod

Статические файлы из папки static/ копируются в dist/static при сборке.

Используется @nestjs/serve-static для раздачи фронтенда.

Проект ориентирован на модульную архитектуру NestJS.