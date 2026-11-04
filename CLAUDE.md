# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

SIH3 BBWS Serayu Opak — portal "Satu Data" for hidrologi, hidrometeorologi & hidrogeologi data (pos AWLR/ARR/MAT, timeseries pengukuran, dokumen publikasi, walidata). UI text and domain naming are Indonesian; keep that convention.

Decoupled monorepo:
- `backend/` — Laravel 11 (PHP 8.3), pure REST API under `/api/v1`, plus legacy Filament v3 admin at `/admin`. Has its own `CLAUDE.md`/`AGENTS.md` (Laravel Boost bootstrap).
- `frontend/` — Next.js 16 App Router, React 19, TypeScript, Tailwind v4, TanStack Table, Recharts. **Next 16 has breaking changes vs. training data — read `frontend/node_modules/next/dist/docs/` before writing Next code** (see `frontend/AGENTS.md`).
- `docs/` — plans/specs/QA notes. `laporan/` — academic report (Markdown chapters → DOCX via pandoc scripts `build*.sh`); not app code.

## Commands

Backend (`cd backend`):
- Setup: `composer install && cp .env.example .env && php artisan key:generate && php artisan migrate --seed && php artisan storage:link`
- Dev server: `php artisan serve` (http://localhost:8000)
- Tests: `php artisan test`; single test: `php artisan test --filter=PosApiTest` (or `--filter=method_name`)
- `.env.example` and `phpunit.xml` both use `DB_CONNECTION=mysql` — tests need a reachable MySQL test DB.
- Seeder creates 13 pos, timeseries data, 6 walidata, dokumen, and admin `admin@bbwsserayuopak.id` / `password`.

Frontend (`cd frontend`):
- `npm run dev` (http://localhost:3000), `npm run build` (also the type check), `npm run lint`
- Tests: `npm test` (Node built-in runner on `lib/*.test.ts`); single file: `node --test lib/status.test.ts`
- API base: `NEXT_PUBLIC_API_URL` (default `http://localhost:8000/api/v1`)

## Architecture

**API** (`backend/routes/api.php`): public read endpoints (telemetry summary, pos catalog/detail/timeseries/export, dokumen, walidata) and admin CRUD behind middleware `auth.api_token`. Auth is a custom bearer token: `AuthController@login` issues a token stored in `users.api_token`; `App\Http\Middleware\AuthenticateApiToken` looks it up (not Sanctum). Note `POST /dokumen/{id}` exists as a multipart-update alias for PUT.

- Controllers live in `app/Http/Controllers/Api/`. Core models: `Pos`, `Pengukuran` (timeseries), `Walidata`, `Dokumen`, `User`.
- Exports (`ExportController`) stream xlsx/csv via FastExcel/OpenSpout without buffering — preserve the streaming approach for large/batch exports.
- CSV import of pengukuran goes through `app/Services/PengukuranImportService.php`.

**Frontend**:
- All backend calls go through `frontend/lib/api.ts` (axios client). It contains `FALLBACK_*` mock datasets used automatically when the backend is offline — when changing API shapes, update `lib/types.ts` and the fallback data together.
- Admin panel is in the frontend (`app/admin/*`, login at `/admin/login`), replacing the Filament UI; session handled by `lib/auth-context.tsx` storing the token client-side (see `readmeadmin.md`).
- `app/api/export/` is a Next route proxy for export downloads.
- Domain helpers in `lib/` (status thresholds Normal/Waspada/Siaga/Awas in `status.ts`, `jenis.ts`, `datetime.ts`, `flood-routing.ts`); reusable UI in `components/` (shadcn-style `ui/`, plus feature folders).
- Design tokens: Deep Navy `#0f172a` primary, Warm Amber `#f59e0b` accent. The portal is intentionally map-free (table-based Data Explorer).
