import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDb1768107061484 implements MigrationInterface {
  name = 'InitDb1768107061484';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`);
    await queryRunner.query(
      `CREATE TABLE "admin_wallets" ("id" SERIAL NOT NULL, "amount" numeric(15,2) NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_46f07875e68ec5c6cd6dd8b4f23" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_role_enum" AS ENUM('USER', 'ADMIN', 'SUPER_ADMIN')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_status_enum" AS ENUM('ACTIVE', 'DEACTIVE')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "full_name" character varying, "username" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'USER', "status" "public"."users_status_enum" NOT NULL DEFAULT 'ACTIVE', "admin_wallet_id" integer, "address" character varying, "phoneNumber" character varying, "canUpdatePricing" boolean NOT NULL DEFAULT false, "canUpdateWallet" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."cameras_status_enum" AS ENUM('ACTIVE', 'INACTIVE', 'MAINTENANCE')`,
    );
    await queryRunner.query(
      `CREATE TABLE "cameras" ("id" SERIAL NOT NULL, "model" character varying NOT NULL, "status" "public"."cameras_status_enum" NOT NULL DEFAULT 'ACTIVE', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_88b40b9817f9f422121f861e1e8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."printers_status_enum" AS ENUM('ACTIVE', 'INACTIVE', 'MAINTENANCE')`,
    );
    await queryRunner.query(
      `CREATE TABLE "printers" ("id" SERIAL NOT NULL, "model" character varying NOT NULL, "paper_remaining" integer NOT NULL DEFAULT '0', "status" "public"."printers_status_enum" NOT NULL DEFAULT 'ACTIVE', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_036bb976f205339f632e2eb0642" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."photobooths_status_enum" AS ENUM('ACTIVE', 'INACTIVE', 'MAINTENANCE')`,
    );
    await queryRunner.query(
      `CREATE TABLE "photobooths" ("id" SERIAL NOT NULL, "location" character varying NOT NULL, "description" character varying, "name" character varying NOT NULL, "status" "public"."photobooths_status_enum" NOT NULL DEFAULT 'ACTIVE', "camera_id" integer NOT NULL, "printer_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_05a67b7ff9c0b91c9321ced733a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."discounts_day_type_enum" AS ENUM('WEEKDAY', 'WEEKEND', 'HOLIDAY')`,
    );
    await queryRunner.query(
      `CREATE TABLE "discounts" ("id" SERIAL NOT NULL, "price" numeric(15,0) NOT NULL, "min_amount" numeric(15,0), "discount_percent" numeric(5,0), "from_date" TIMESTAMP NOT NULL DEFAULT '"2026-01-11T04:51:02.440Z"', "to_date" TIMESTAMP, "day_type" "public"."discounts_day_type_enum", "is_permanent" boolean NOT NULL DEFAULT false, "photobooth_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_66c522004212dc814d6e2f14ecc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."photo_sessions_layout_type_enum" AS ENUM('2', '4', '6')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."photo_sessions_status_enum" AS ENUM('FINISH', 'ON_GOING')`,
    );
    await queryRunner.query(
      `CREATE TABLE "photo_sessions" ("id" SERIAL NOT NULL, "uuid" character varying NOT NULL DEFAULT gen_random_uuid(), "language" character varying, "layout_type" "public"."photo_sessions_layout_type_enum" NOT NULL, "print_count" integer NOT NULL DEFAULT '1', "status" "public"."photo_sessions_status_enum" NOT NULL DEFAULT 'ON_GOING', "expired_at" TIMESTAMP, "photobooth_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_4893a126c97e28e56c7b357418c" UNIQUE ("uuid"), CONSTRAINT "PK_f19a6be0f5b2b7700942bed0d68" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9830f0c01e5d0c120353075804" ON "photo_sessions" ("photobooth_id") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."orders_method_enum" AS ENUM('MOMO_QR', 'PAYMENT_CODE')`,
    );
    await queryRunner.query(
      `CREATE TABLE "orders" ("id" SERIAL NOT NULL, "method" "public"."orders_method_enum" NOT NULL, "amount" numeric(15,0) NOT NULL, "discount_id" integer, "discount_amount" numeric(15,0) NOT NULL DEFAULT '0', "total_amount" numeric(15,0) NOT NULL, "user_id" integer NOT NULL, "photo_session_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a922b820eeef29ac1c6800e826" ON "orders" ("user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_742ea98ee83876eb7ecf307436" ON "orders" ("photo_session_id") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."payments_status_enum" AS ENUM('PENDING', 'COMPLETED', 'FAILED', 'CANCELLED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "payments" ("id" SERIAL NOT NULL, "amount" numeric(15,2) NOT NULL, "status" "public"."payments_status_enum" NOT NULL DEFAULT 'PENDING', "provider" character varying NOT NULL, "provider_payment_id" character varying NOT NULL, "request_payload" character varying, "response_payload" character varying, "paid_at" TIMESTAMP, "total_amount" numeric(15,0) NOT NULL, "order_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."transactions_type_enum" AS ENUM('DEPOSITE', 'WITHDRAW')`,
    );
    await queryRunner.query(
      `CREATE TABLE "transactions" ("id" SERIAL NOT NULL, "amount" numeric(15,2) NOT NULL, "type" "public"."transactions_type_enum" NOT NULL, "from_account_id" integer, "account_name" character varying, "balance_before" numeric(15,0) NOT NULL DEFAULT '0', "balance_after" numeric(15,0) NOT NULL DEFAULT '0', "status" character varying NOT NULL, "description" character varying, "user_id" integer, "admin_wallet_id" integer, "payment_id" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."print_jobs_status_enum" AS ENUM('PENDING', 'PRINTING', 'COMPLETED', 'FAILED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "print_jobs" ("id" SERIAL NOT NULL, "print_count" integer NOT NULL DEFAULT '1', "status" "public"."print_jobs_status_enum" NOT NULL DEFAULT 'PENDING', "photo_session_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a581cb9acbf52d919f86445434e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "pricings" ("id" SERIAL NOT NULL, "pricing" numeric(15,0) NOT NULL, "print_count" integer, "price_label" character varying, "from_print_count" integer, "photobooth_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_30c670ed2cd925e024eb3a2a1c8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "payment_codes" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "amount" numeric(15,0) NOT NULL, "used_amount" numeric(15,0) NOT NULL DEFAULT '0', "expired_at" TIMESTAMP NOT NULL, "admin_wallet_id" integer NOT NULL, "created_by_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c9e39996dbc0780a573aba0a0af" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_47f40ad62ffc4adce07107af3b" ON "payment_codes" ("created_by_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "frames" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "type" character varying, "url" character varying NOT NULL, "local_path" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_24f76d02278950b00a73dd6d363" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."files_type_enum" AS ENUM('VIDEO', 'IMAGE')`,
    );
    await queryRunner.query(
      `CREATE TABLE "files" ("id" SERIAL NOT NULL, "photo_session_id" integer NOT NULL, "local_path" character varying NOT NULL, "frame_id" integer, "type" "public"."files_type_enum" NOT NULL, "is_permanent" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_197f84a1390da0bcf0f663aba5d" FOREIGN KEY ("admin_wallet_id") REFERENCES "admin_wallets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "photobooths" ADD CONSTRAINT "FK_656646b0ec65553106895223be6" FOREIGN KEY ("camera_id") REFERENCES "cameras"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "photobooths" ADD CONSTRAINT "FK_cf4c87af95d47c1c0f183bb9a81" FOREIGN KEY ("printer_id") REFERENCES "printers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "discounts" ADD CONSTRAINT "FK_4b02aa8e7213075a339dfa506ac" FOREIGN KEY ("photobooth_id") REFERENCES "photobooths"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "photo_sessions" ADD CONSTRAINT "FK_9830f0c01e5d0c120353075804d" FOREIGN KEY ("photobooth_id") REFERENCES "photobooths"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_742ea98ee83876eb7ecf307436e" FOREIGN KEY ("photo_session_id") REFERENCES "photo_sessions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_555d48c77395dc43554c7067ed6" FOREIGN KEY ("discount_id") REFERENCES "discounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_a922b820eeef29ac1c6800e826a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "payments" ADD CONSTRAINT "FK_b2f7b823a21562eeca20e72b006" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD CONSTRAINT "FK_464da95dc8a05470b2b158d4df6" FOREIGN KEY ("payment_id") REFERENCES "payments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD CONSTRAINT "FK_e9acc6efa76de013e8c1553ed2b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD CONSTRAINT "FK_d440fbb7ec50712b1e0064884a9" FOREIGN KEY ("admin_wallet_id") REFERENCES "admin_wallets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "print_jobs" ADD CONSTRAINT "FK_5a80987c65e6dd3ab23e3b3373b" FOREIGN KEY ("photo_session_id") REFERENCES "photo_sessions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "pricings" ADD CONSTRAINT "FK_5eea88c9025a64ff849a6707e59" FOREIGN KEY ("photobooth_id") REFERENCES "photobooths"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment_codes" ADD CONSTRAINT "FK_8d3563cb2aa281742cf27be2755" FOREIGN KEY ("admin_wallet_id") REFERENCES "admin_wallets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "files" ADD CONSTRAINT "FK_1c926f76c87c6c94af704f5e929" FOREIGN KEY ("frame_id") REFERENCES "frames"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "files" ADD CONSTRAINT "FK_16c63b4c2ef890dbaa77fe1e01d" FOREIGN KEY ("photo_session_id") REFERENCES "photo_sessions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "files" DROP CONSTRAINT "FK_16c63b4c2ef890dbaa77fe1e01d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "files" DROP CONSTRAINT "FK_1c926f76c87c6c94af704f5e929"`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment_codes" DROP CONSTRAINT "FK_8d3563cb2aa281742cf27be2755"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pricings" DROP CONSTRAINT "FK_5eea88c9025a64ff849a6707e59"`,
    );
    await queryRunner.query(
      `ALTER TABLE "print_jobs" DROP CONSTRAINT "FK_5a80987c65e6dd3ab23e3b3373b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP CONSTRAINT "FK_d440fbb7ec50712b1e0064884a9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP CONSTRAINT "FK_e9acc6efa76de013e8c1553ed2b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP CONSTRAINT "FK_464da95dc8a05470b2b158d4df6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "payments" DROP CONSTRAINT "FK_b2f7b823a21562eeca20e72b006"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "FK_a922b820eeef29ac1c6800e826a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "FK_555d48c77395dc43554c7067ed6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "FK_742ea98ee83876eb7ecf307436e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "photo_sessions" DROP CONSTRAINT "FK_9830f0c01e5d0c120353075804d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "discounts" DROP CONSTRAINT "FK_4b02aa8e7213075a339dfa506ac"`,
    );
    await queryRunner.query(
      `ALTER TABLE "photobooths" DROP CONSTRAINT "FK_cf4c87af95d47c1c0f183bb9a81"`,
    );
    await queryRunner.query(
      `ALTER TABLE "photobooths" DROP CONSTRAINT "FK_656646b0ec65553106895223be6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_197f84a1390da0bcf0f663aba5d"`,
    );
    await queryRunner.query(`DROP TABLE "files"`);
    await queryRunner.query(`DROP TYPE "public"."files_type_enum"`);
    await queryRunner.query(`DROP TABLE "frames"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_47f40ad62ffc4adce07107af3b"`,
    );
    await queryRunner.query(`DROP TABLE "payment_codes"`);
    await queryRunner.query(`DROP TABLE "pricings"`);
    await queryRunner.query(`DROP TABLE "print_jobs"`);
    await queryRunner.query(`DROP TYPE "public"."print_jobs_status_enum"`);
    await queryRunner.query(`DROP TABLE "transactions"`);
    await queryRunner.query(`DROP TYPE "public"."transactions_type_enum"`);
    await queryRunner.query(`DROP TABLE "payments"`);
    await queryRunner.query(`DROP TYPE "public"."payments_status_enum"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_742ea98ee83876eb7ecf307436"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a922b820eeef29ac1c6800e826"`,
    );
    await queryRunner.query(`DROP TABLE "orders"`);
    await queryRunner.query(`DROP TYPE "public"."orders_method_enum"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9830f0c01e5d0c120353075804"`,
    );
    await queryRunner.query(`DROP TABLE "photo_sessions"`);
    await queryRunner.query(`DROP TYPE "public"."photo_sessions_status_enum"`);
    await queryRunner.query(
      `DROP TYPE "public"."photo_sessions_layout_type_enum"`,
    );
    await queryRunner.query(`DROP TABLE "discounts"`);
    await queryRunner.query(`DROP TYPE "public"."discounts_day_type_enum"`);
    await queryRunner.query(`DROP TABLE "photobooths"`);
    await queryRunner.query(`DROP TYPE "public"."photobooths_status_enum"`);
    await queryRunner.query(`DROP TABLE "printers"`);
    await queryRunner.query(`DROP TYPE "public"."printers_status_enum"`);
    await queryRunner.query(`DROP TABLE "cameras"`);
    await queryRunner.query(`DROP TYPE "public"."cameras_status_enum"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    await queryRunner.query(`DROP TABLE "admin_wallets"`);
  }
}
