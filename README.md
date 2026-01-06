<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Photobooth backend

## Prerequisites

- **Node.js**: >= 20.x
- **pnpm**: đã cài global (`npm i -g pnpm`)
- **PostgreSQL**: có 1 database trống (ví dụ `photobooth`)
- **Git**: để chạy Husky hooks

## Cài đặt dependencies

```bash
pnpm install
```

## Cấu hình môi trường

Tạo file `.env` (có thể copy từ `env.example`):

```bash
cp env.example .env
```

Các biến chính:

- **PORT**: cổng API (mặc định `3000`)
- **DB_HOST**, **DB_PORT**, **DB_USERNAME**, **DB_PASSWORD**, **DB_NAME**
- **DB_SYNC**: nên để `false` ở môi trường thật, dùng migration để sync schema

## Chạy PostgreSQL bằng Docker Compose

- Docker compose file: `deploy/docker-compose.yml`
- Data của PostgreSQL được mount vào thư mục local `data/postgres` (đã được `.gitignore`)

Chạy Postgres:

```bash
cd deploy
docker compose up -d
```

Dừng Postgres:

```bash
cd deploy
docker compose down
```

Sau khi container chạy, API có thể kết nối bằng các biến DB_* trong `.env` (mặc định `DB_HOST=postgres`).

## Chạy ứng dụng

```bash
# development
pnpm start

# watch mode
pnpm start:dev

# production mode (sau khi build)
pnpm build
pnpm start:prod
```

Swagger UI:

- Truy cập: `http://localhost:3000/docs`

## Kiểm tra mã nguồn

```bash
# lint + auto-fix
pnpm lint

# unit tests
pnpm test

# e2e tests
pnpm test:e2e
```

### Husky

- Hook **pre-push** sẽ tự chạy `pnpm lint` trước khi `git push`.

## Cấu trúc database & entities

- Tất cả entities đặt trong: `src/entities`
- Ví dụ: `src/entities/user.entity.ts` (`User` table `users`)
- Module feature (ví dụ Users) import entity qua `TypeOrmModule.forFeature([User])`

Kết nối DB cấu hình trong:

- `src/database/database.module.ts` (NestJS module)
- `src/database/data-source.ts` (TypeORM DataSource dùng cho migration)

## Migration (TypeORM)

Scripts trong `package.json`:

```json
"migration:generate": "ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:generate src/migrations/$npm_config_name -d src/database/data-source.ts",
"migration:run": "ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:run -d src/database/data-source.ts",
"migration:revert": "ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:revert -d src/database/data-source.ts"
```

### Tạo migration mới từ entities

Sau khi sửa/ thêm entity trong `src/entities`:

```bash
pnpm migration:generate --name=CreateUsers
```

File migration sẽ được tạo trong `src/migrations`.

### Chạy migration lên database

```bash
pnpm migration:run
```

### Undo migration (revert)

```bash
pnpm migration:revert
```

Lệnh này sẽ **rollback migration gần nhất**. Có thể chạy nhiều lần để quay về các phiên bản schema trước đó.

