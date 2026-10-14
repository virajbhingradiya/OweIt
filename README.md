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

## Auth (Clerk)

Sign-up / log-in (email + username + password, or Google) is handled by [Clerk](https://clerk.com).
The frontend shows Clerk's modals; the backend verifies Clerk's session token on every `/api` request.

One-time setup:

1. Create an application at https://dashboard.clerk.com.
2. **Configure > User & authentication**: enable Email, Username, Password; under SSO connections enable Google.
3. **API keys**: copy the Publishable key and the Frontend API URL.
4. `frontend/.env.local` (copy from `frontend/.env.example`): `VITE_CLERK_PUBLISHABLE_KEY=pk_test_...`
5. `backend/.env` (copy from `backend/.env.example`): `CLERK_ISSUER=https://<your-app>.clerk.accounts.dev`

Both files are git-ignored. The publishable key is public by design; the Clerk secret key is not needed.

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
- `CLERK_ISSUER` (production Clerk instance's Frontend API URL)
- `CLERK_AUTHORIZED_PARTIES` (your site's origin, e.g. `https://oweit.app`)

Health check: `GET /actuator/health` (`/actuator/health/liveness` and `/readiness` for probes).
