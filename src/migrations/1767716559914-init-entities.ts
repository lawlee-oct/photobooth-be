import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitEntities1767716559914 implements MigrationInterface {
  name = 'InitEntities1767716559914';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "admin_resources" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" numeric(15,2) NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_53a5618397970c1679ff9161cf3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_role_enum" AS ENUM('USER', 'ADMIN')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_status_enum" AS ENUM('ACTIVE', 'DEACTIVE')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "full_name" character varying, "username" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'USER', "status" "public"."users_status_enum" NOT NULL DEFAULT 'ACTIVE', "admin_resource_id" uuid, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "REL_6d7e612bbfa0d599b2549038ac" UNIQUE ("admin_resource_id"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "accounts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "balance" numeric(15,2) NOT NULL DEFAULT '0', "user_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "REL_3000dad1da61b29953f0747632" UNIQUE ("user_id"), CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."photobooths_status_enum" AS ENUM('ACTIVE', 'INACTIVE', 'MAINTENANCE')`,
    );
    await queryRunner.query(
      `CREATE TABLE "photobooths" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "location" character varying NOT NULL, "description" character varying, "name" character varying NOT NULL, "status" "public"."photobooths_status_enum" NOT NULL DEFAULT 'ACTIVE', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_05a67b7ff9c0b91c9321ced733a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."discounts_day_type_enum" AS ENUM('WEEKDAY', 'WEEKEND', 'HOLIDAY')`,
    );
    await queryRunner.query(
      `CREATE TABLE "discounts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "photobooth_id" uuid NOT NULL, "price" numeric(15,2) NOT NULL, "min_amount" numeric(15,2), "discount_percent" numeric(5,2) NOT NULL, "from_date" TIMESTAMP NOT NULL, "to_date" TIMESTAMP NOT NULL, "day_type" "public"."discounts_day_type_enum", "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_66c522004212dc814d6e2f14ecc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."photo_sessions_layout_type_enum" AS ENUM('2', '4', '6')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."photo_sessions_status_enum" AS ENUM('FINISH', 'ON_GOING')`,
    );
    await queryRunner.query(
      `CREATE TABLE "photo_sessions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "photobooth_id" uuid NOT NULL, "language" character varying, "layout_type" "public"."photo_sessions_layout_type_enum" NOT NULL, "quantity" integer NOT NULL DEFAULT '1', "status" "public"."photo_sessions_status_enum" NOT NULL DEFAULT 'ON_GOING', "expired_at" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f19a6be0f5b2b7700942bed0d68" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."payments_method_enum" AS ENUM('MOMO_QR', 'ADMIN_PAY', 'ACCOUNT_BALANCE', 'CASH')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."payments_status_enum" AS ENUM('PENDING', 'COMPLETED', 'FAILED', 'CANCELLED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "payments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "photo_session_id" uuid NOT NULL, "amount" numeric(15,2) NOT NULL, "method" "public"."payments_method_enum" NOT NULL, "status" "public"."payments_status_enum" NOT NULL DEFAULT 'PENDING', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."transactions_transaction_type_enum" AS ENUM('DEPOSITE', 'WITHDRAW')`,
    );
    await queryRunner.query(
      `CREATE TABLE "transactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" numeric(15,2) NOT NULL, "transaction_type" "public"."transactions_transaction_type_enum" NOT NULL, "created_by" character varying, "account_id" uuid NOT NULL, "related_payment_id" uuid, "discount_id" uuid, "photo_session_id" uuid, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "qr_assets" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "photo_session_id" uuid NOT NULL, "qr_code" text NOT NULL, "url" character varying NOT NULL, "expired_at" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cf337cff5c19632c9cf44afb0bb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."printers_status_enum" AS ENUM('ACTIVE', 'INACTIVE', 'MAINTENANCE')`,
    );
    await queryRunner.query(
      `CREATE TABLE "printers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "model" character varying NOT NULL, "paper_remaining" integer NOT NULL DEFAULT '0', "status" "public"."printers_status_enum" NOT NULL DEFAULT 'ACTIVE', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_036bb976f205339f632e2eb0642" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."print_jobs_status_enum" AS ENUM('PENDING', 'PRINTING', 'COMPLETED', 'FAILED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "print_jobs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "photo_session_id" uuid NOT NULL, "copies" integer NOT NULL DEFAULT '1', "status" "public"."print_jobs_status_enum" NOT NULL DEFAULT 'PENDING', "printer_id" uuid, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a581cb9acbf52d919f86445434e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "frames" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "type" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_24f76d02278950b00a73dd6d363" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."files_type_enum" AS ENUM('VIDEO', 'IMAGE')`,
    );
    await queryRunner.query(
      `CREATE TABLE "files" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "photo_session_id" uuid NOT NULL, "local_path" character varying NOT NULL, "frame_id" uuid, "type" "public"."files_type_enum" NOT NULL, "is_permanent" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."cameras_status_enum" AS ENUM('ACTIVE', 'INACTIVE', 'MAINTENANCE')`,
    );
    await queryRunner.query(
      `CREATE TABLE "cameras" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "model" character varying NOT NULL, "status" "public"."cameras_status_enum" NOT NULL DEFAULT 'ACTIVE', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_88b40b9817f9f422121f861e1e8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."admin_resource_logs_type_enum" AS ENUM('DEPOSITE', 'WITHDRAW')`,
    );
    await queryRunner.query(
      `CREATE TABLE "admin_resource_logs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "type" "public"."admin_resource_logs_type_enum" NOT NULL, "description" character varying, "amount" numeric(15,2) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c7d925831e7087c5af2dfa4eee6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_6d7e612bbfa0d599b2549038ac9" FOREIGN KEY ("admin_resource_id") REFERENCES "admin_resources"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "accounts" ADD CONSTRAINT "FK_3000dad1da61b29953f07476324" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "discounts" ADD CONSTRAINT "FK_4b02aa8e7213075a339dfa506ac" FOREIGN KEY ("photobooth_id") REFERENCES "photobooths"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "photo_sessions" ADD CONSTRAINT "FK_9830f0c01e5d0c120353075804d" FOREIGN KEY ("photobooth_id") REFERENCES "photobooths"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "payments" ADD CONSTRAINT "FK_288a7c15478a3da3f8b13b82409" FOREIGN KEY ("photo_session_id") REFERENCES "photo_sessions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD CONSTRAINT "FK_49c0d6e8ba4bfb5582000d851f0" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD CONSTRAINT "FK_3cf4006bfbf775ef0b73b020c03" FOREIGN KEY ("related_payment_id") REFERENCES "payments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD CONSTRAINT "FK_8443f29e9a21848bea7e1ccf740" FOREIGN KEY ("discount_id") REFERENCES "discounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD CONSTRAINT "FK_ab2a0602040b6f3dc412585b628" FOREIGN KEY ("photo_session_id") REFERENCES "photo_sessions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "qr_assets" ADD CONSTRAINT "FK_f89e2b85a38bb204664bc88ab66" FOREIGN KEY ("photo_session_id") REFERENCES "photo_sessions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "print_jobs" ADD CONSTRAINT "FK_5a80987c65e6dd3ab23e3b3373b" FOREIGN KEY ("photo_session_id") REFERENCES "photo_sessions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "print_jobs" ADD CONSTRAINT "FK_db7b189f5ed73bb31aeb1baff1e" FOREIGN KEY ("printer_id") REFERENCES "printers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "files" ADD CONSTRAINT "FK_16c63b4c2ef890dbaa77fe1e01d" FOREIGN KEY ("photo_session_id") REFERENCES "photo_sessions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "files" ADD CONSTRAINT "FK_1c926f76c87c6c94af704f5e929" FOREIGN KEY ("frame_id") REFERENCES "frames"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "admin_resource_logs" ADD CONSTRAINT "FK_3bb7f785148a9c6768aaf87c059" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "admin_resource_logs" DROP CONSTRAINT "FK_3bb7f785148a9c6768aaf87c059"`,
    );
    await queryRunner.query(
      `ALTER TABLE "files" DROP CONSTRAINT "FK_1c926f76c87c6c94af704f5e929"`,
    );
    await queryRunner.query(
      `ALTER TABLE "files" DROP CONSTRAINT "FK_16c63b4c2ef890dbaa77fe1e01d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "print_jobs" DROP CONSTRAINT "FK_db7b189f5ed73bb31aeb1baff1e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "print_jobs" DROP CONSTRAINT "FK_5a80987c65e6dd3ab23e3b3373b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "qr_assets" DROP CONSTRAINT "FK_f89e2b85a38bb204664bc88ab66"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP CONSTRAINT "FK_ab2a0602040b6f3dc412585b628"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP CONSTRAINT "FK_8443f29e9a21848bea7e1ccf740"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP CONSTRAINT "FK_3cf4006bfbf775ef0b73b020c03"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP CONSTRAINT "FK_49c0d6e8ba4bfb5582000d851f0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "payments" DROP CONSTRAINT "FK_288a7c15478a3da3f8b13b82409"`,
    );
    await queryRunner.query(
      `ALTER TABLE "photo_sessions" DROP CONSTRAINT "FK_9830f0c01e5d0c120353075804d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "discounts" DROP CONSTRAINT "FK_4b02aa8e7213075a339dfa506ac"`,
    );
    await queryRunner.query(
      `ALTER TABLE "accounts" DROP CONSTRAINT "FK_3000dad1da61b29953f07476324"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_6d7e612bbfa0d599b2549038ac9"`,
    );
    await queryRunner.query(`DROP TABLE "admin_resource_logs"`);
    await queryRunner.query(
      `DROP TYPE "public"."admin_resource_logs_type_enum"`,
    );
    await queryRunner.query(`DROP TABLE "cameras"`);
    await queryRunner.query(`DROP TYPE "public"."cameras_status_enum"`);
    await queryRunner.query(`DROP TABLE "files"`);
    await queryRunner.query(`DROP TYPE "public"."files_type_enum"`);
    await queryRunner.query(`DROP TABLE "frames"`);
    await queryRunner.query(`DROP TABLE "print_jobs"`);
    await queryRunner.query(`DROP TYPE "public"."print_jobs_status_enum"`);
    await queryRunner.query(`DROP TABLE "printers"`);
    await queryRunner.query(`DROP TYPE "public"."printers_status_enum"`);
    await queryRunner.query(`DROP TABLE "qr_assets"`);
    await queryRunner.query(`DROP TABLE "transactions"`);
    await queryRunner.query(
      `DROP TYPE "public"."transactions_transaction_type_enum"`,
    );
    await queryRunner.query(`DROP TABLE "payments"`);
    await queryRunner.query(`DROP TYPE "public"."payments_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."payments_method_enum"`);
    await queryRunner.query(`DROP TABLE "photo_sessions"`);
    await queryRunner.query(`DROP TYPE "public"."photo_sessions_status_enum"`);
    await queryRunner.query(
      `DROP TYPE "public"."photo_sessions_layout_type_enum"`,
    );
    await queryRunner.query(`DROP TABLE "discounts"`);
    await queryRunner.query(`DROP TYPE "public"."discounts_day_type_enum"`);
    await queryRunner.query(`DROP TABLE "photobooths"`);
    await queryRunner.query(`DROP TYPE "public"."photobooths_status_enum"`);
    await queryRunner.query(`DROP TABLE "accounts"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    await queryRunner.query(`DROP TABLE "admin_resources"`);
  }
}
