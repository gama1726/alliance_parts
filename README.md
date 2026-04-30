# Alliance Parts Landing

React/Vite лендинг для магазина автозапчастей Alliance Parts.

## Запуск

1. Установите Node.js LTS с npm.
2. Положите логотип в `public/alliance-logo.png`.
3. Установите зависимости:

```bash
npm install
```

4. Запустите dev-сервер:

```bash
npm run dev
```

5. Для production-сборки:

```bash
npm run build
```

## Backend Profiles

- `backend` запускается на `http://127.0.0.1:8080`.
- По умолчанию активен профиль `dev` (H2 + `schema.sql`/`data.sql`).
- Контракт API версионирован: основной префикс `http://127.0.0.1:8080/api/v1`.
- Legacy-префикс `http://127.0.0.1:8080/api` временно сохранен для обратной совместимости.

## Frontend API Base

- Если `VITE_API_BASE_URL` не задан, фронтенд использует `http://127.0.0.1:8080/api/v1`.
- Для переопределения создайте `.env.local` в корне:

```bash
VITE_API_BASE_URL=http://127.0.0.1:8080/api/v1
```

### Backend dev

```bash
cd backend
.\mvnw.cmd spring-boot:run
```

### Backend prod

Перед запуском задайте переменные окружения:

- `DB_URL`
- `DB_USER`
- `DB_PASSWORD`

Запуск:

```bash
cd backend
.\mvnw.cmd spring-boot:run -Dspring-boot.run.profiles=prod
```
