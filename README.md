# OweIt

Split expenses with friends.

| Part | Stack | Folder |
|------|-------|--------|
| API | Spring Boot 4.1, Java 25, PostgreSQL 18, Flyway | `backend/` |
| Web | React 19, TypeScript, Vite 8 | `frontend/` |

## Prerequisites

- JDK 25+
- Node 24+
- Docker Desktop (running)

## Run locally

```sh
# Terminal 1: API on :8080 (starts Postgres in Docker automatically)
cd backend
./mvnw spring-boot:run

# Terminal 2: web on :5173 (proxies /api and /actuator to :8080)
cd frontend
npm install
npm run dev
```

Open http://localhost:5173. "API status: UP" means everything is connected.

## Test

```sh
# backend (spins up a throwaway Postgres via Testcontainers)
cd backend
./mvnw verify

# frontend
cd frontend
npm run lint
npm run build
```

## Database changes

Never edit tables by hand. Add a new file in `backend/src/main/resources/db/migration/`,
e.g. `V1__create_users.sql`. Flyway applies it on startup. Never change a migration that has already run.

## Production config

Set these environment variables (Spring reads them automatically):

- `SPRING_DATASOURCE_URL` (e.g. `jdbc:postgresql://host:5432/oweit`)
- `SPRING_DATASOURCE_USERNAME`
- `SPRING_DATASOURCE_PASSWORD`

Health check: `GET /actuator/health` (`/actuator/health/liveness` and `/readiness` for probes).
