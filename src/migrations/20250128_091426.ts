import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "visas" ADD COLUMN "price_consular_fee" numeric;
  ALTER TABLE "visas" ADD COLUMN "price_service_fee" numeric;
  ALTER TABLE "visas" ADD COLUMN "price_visa_fee" numeric;
  ALTER TABLE "visas" ADD COLUMN "price_processing_time" numeric;
  ALTER TABLE "_visas_v" ADD COLUMN "version_price_consular_fee" numeric;
  ALTER TABLE "_visas_v" ADD COLUMN "version_price_service_fee" numeric;
  ALTER TABLE "_visas_v" ADD COLUMN "version_price_visa_fee" numeric;
  ALTER TABLE "_visas_v" ADD COLUMN "version_price_processing_time" numeric;
  ALTER TABLE "categories" DROP COLUMN IF EXISTS "consular_fee";
  ALTER TABLE "categories" DROP COLUMN IF EXISTS "service_fee";
  ALTER TABLE "categories" DROP COLUMN IF EXISTS "visa_fee";
  ALTER TABLE "categories" DROP COLUMN IF EXISTS "total_price";
  ALTER TABLE "categories" DROP COLUMN IF EXISTS "processing_time";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "categories" ADD COLUMN "consular_fee" numeric NOT NULL;
  ALTER TABLE "categories" ADD COLUMN "service_fee" numeric NOT NULL;
  ALTER TABLE "categories" ADD COLUMN "visa_fee" numeric NOT NULL;
  ALTER TABLE "categories" ADD COLUMN "total_price" numeric NOT NULL;
  ALTER TABLE "categories" ADD COLUMN "processing_time" numeric NOT NULL;
  ALTER TABLE "visas" DROP COLUMN IF EXISTS "price_consular_fee";
  ALTER TABLE "visas" DROP COLUMN IF EXISTS "price_service_fee";
  ALTER TABLE "visas" DROP COLUMN IF EXISTS "price_visa_fee";
  ALTER TABLE "visas" DROP COLUMN IF EXISTS "price_processing_time";
  ALTER TABLE "_visas_v" DROP COLUMN IF EXISTS "version_price_consular_fee";
  ALTER TABLE "_visas_v" DROP COLUMN IF EXISTS "version_price_service_fee";
  ALTER TABLE "_visas_v" DROP COLUMN IF EXISTS "version_price_visa_fee";
  ALTER TABLE "_visas_v" DROP COLUMN IF EXISTS "version_price_processing_time";`)
}
