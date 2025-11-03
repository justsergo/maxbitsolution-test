# Кинотеатр - бронирование билетов (тестовое)

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
npm test
```

## Структура проекта (Feature-Based Architecture)

```
src/
├── app/                    # Конфигурация приложения
├── features/               # Бизнес-логика по фичам
│   ├── auth/
│   ├── movies/
│   ├── booking/
│   ├── cinemas/
│   └── tickets/
├── pages/                  # Страницы
│   ├── LoginPage/
│   ├── RegisterPage/
│   ├── MoviesPage/
│   ├── MovieDetailPage/
│   ├── CinemasPage/
│   ├── CinemaSessionsPage/
│   ├── BookingPage/
│   └── MyTicketsPage/
└── shared/                 # Общие ресурсы
    ├── ui/
    ├── constants/
    ├── hooks/
    ├── types/
    └── utils/

__tests__/                  # Тесты
├── features/
└── pages/
```

## Ключевые технические решения

### Состояние и API
- **Redux Toolkit** - управление состоянием
- **RTK Query** - кеширование и синхронизация данных
- **JWT токены** - хранение в `sessionStorage` (так как нету cookie с бэкенда)

### Валидация и формы
- **React Hook Form** - управление формами
- **Кастомная валидация** - для регистрации и входа

### Стили
- **SCSS** - препроцессор CSS
- **BEM методология** - именование классов
- **Модульность** - стили рядом с компонентами
