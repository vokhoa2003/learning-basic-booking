## Purpose

Short, actionable guidance for AI coding agents working on this repository (NestJS v11 + TypeORM). Focus on what to change, where, and which commands to run.

## Big picture

- This is a modular NestJS application. Each feature lives in its own folder under `src/` (example: `src/product`, `src/user`, `src/bookings`, `src/services`).
- Modules follow the standard Nest pattern: `*.module.ts` wires `controller`, `service`, `entities`, and `dto` folders.
- TypeORM is used for persistence. DB configuration is centralized in `src/database/typeorm.config.ts` and `src/database/typeorm.module.config.ts`.
- Authentication uses JWT: see `src/auth/jwt.strategy.ts` and `src/auth/jwt.guard.ts`. Authorization is role-based: `src/authorization/roles.decorator.ts` and `src/authorization/roles.guard.ts`.

## Key files to read first

- `src/app.module.ts` — application wiring and global imports
- `src/main.ts` — app bootstrap options
- `src/database/typeorm.config.ts` — DB connection settings (migrations are configured here)
- `src/auth/jwt.strategy.ts` — JWT payload and validation logic
- `src/authorization/roles.guard.ts` — role-based access control pattern
- `src/common/entities/base.entity.ts` — base fields (id, timestamps, etc.) used by entities
- Example feature: `src/product/product.controller.ts`, `src/product/entities/product.entity.ts`, `src/product/dto/*`

## Conventions and patterns (do this exactly)

- File layout: each module folder contains controller, service, dto/, and entities/ subfolders. Follow existing names: `CreateXDto`, `UpdateXDto`.
- DTOs use `class-validator` decorators and `class-transformer` where needed. Mirror existing DTO style.
- Entities extend the base entity where appropriate (`src/common/entities/base.entity.ts`) and use TypeORM decorators.
- Use dependency injection via constructor parameters (Nest style). Register new providers in the module file.
- When adding DB columns or changing entities, also generate a TypeORM migration (see Migration workflow below).

## Migration & DB workflow (exact commands)

- TypeORM helper: `npm run typeorm` (wrapper using `typeorm-ts-node-commonjs`).
- Generate a migration (project uses an npm-config variable):
  - Example: `npm run migration:generate --name=AddProductPrice`
    - This sets `npm_config_name` which the script uses to create `src/database/migrations/<timestamp>-AddProductPrice.ts`.
  - If that doesn't work on your shell, set the env var explicitly: `set npm_config_name=AddProductPrice; npm run migration:generate` (Windows PowerShell/CMD).

- Run migrations: `npm run migration:run`
- Revert last migration: `npm run migration:revert`

## Build, run, lint, test (commands from package.json)

- Install: `npm install`
- Build: `npm run build` (uses `nest build`)
- Start (dev): `npm run start:dev` (watch)
- Start production: `npm run start:prod` (runs `node dist/main`)
- Lint & fix: `npm run lint`
- Unit tests: `npm run test` (jest + ts-jest)
- E2E tests: `npm run test:e2e` (`test/jest-e2e.json` root)
- Test debug (useful example): `npm run test:debug` — runs jest with `ts-node/register` and `tsconfig-paths/register` for path alias resolution

## Testing patterns

- Unit tests live next to code as `*.spec.ts` (e.g., `product.controller.spec.ts`). Follow existing mock patterns.
- E2E tests are configured via `test/jest-e2e.json` and assume a running app or bootstrapped testing module.

## API & Authorization behavior to preserve

- Authentication: JWT tokens validated by `jwt.strategy.ts`; guards expect user object on request.
- Authorization: `@Roles(...)` decorator + `roles.guard.ts` gate access.
- Controllers typically accept DTOs (`CreateXDto`, `UpdateXDto`) and return entity or DTO-shaped responses. Keep controller signatures consistent.

## Things NOT to change lightly

- `src/database/typeorm.config.ts` and migration files — changing DB config or migration filenames breaks CI and local dev migration flow.
- Public API surface (controller routes) — clients/tests depend on these routes.

## Small examples (follow these patterns)

- Add a new module: copy the structure from `src/product` or `src/user`.
- DTO example: `class CreateProductDto { @IsString() name: string; @IsNumber() price: number; }`
- Controller example: `@Get(':id') async findOne(@Param('id') id: string) { return this.service.findOne(+id); }`

## Search-first rules for the agent

- If you need to change DB schema, search `src/database` and `src/database/migrations` and update/create a migration.
- For auth changes, check `src/auth/*` and `src/authorization/*` first.
- For global wiring, inspect `src/app.module.ts` and `src/main.ts`.

## When committing changes

- Keep commits small and focused. If you change entities, include the generated migration file in the same PR.

---

If anything in this summary is unclear or you want more examples (module scaffolding, sample migration content, or test harness examples), tell me which area to expand and I will iterate.
