# Кинотеатр - бронирование билетов

Простое веб-приложение для бронирования билетов в кинотеатр. Можно смотреть расписание, выбирать места и управлять своими заказами.

## Что использовалось

- React 18 + TypeScript
- Vite для сборки
- React Router для навигации
- Redux Toolkit + RTK Query для состояния и API
- React Hook Form для форм
- SCSS для стилей
- Vitest + React Testing Library для тестов

## Как запустить

```bash
npm install
npm run dev
```

Приложение откроется на http://localhost:3000

## API

Бэкенд должен быть запущен на порту 3022.
Swagger: http://localhost:3022/api-docs

## Тесты

```bash
npm test              # запустить все тесты
npm run test:watch    # запустить в watch режиме
```

## Структура

```
src/
├── app/              # настройка приложения
├── pages/            # страницы
├── features/         # фичи (auth, movies, etc)
└── shared/           # общие компоненты и утилиты
    ├── ui/
    ├── types/
    ├── constants/
    └── hooks/

__tests__/            # тесты
├── features/
├── pages/
└── shared/
