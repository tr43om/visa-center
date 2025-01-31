import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_contacts_type" AS ENUM('whatsapp', 'email', 'instagram', 'phone', 'address');
  CREATE TABLE IF NOT EXISTS "contacts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum_contacts_type" DEFAULT 'whatsapp' NOT NULL,
  	"manager" varchar,
  	"text" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "visas" ALTER COLUMN "price_processing_time" SET DEFAULT 1;
  ALTER TABLE "_visas_v" ALTER COLUMN "version_price_processing_time" SET DEFAULT 1;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "contacts_id" integer;
  CREATE INDEX IF NOT EXISTS "contacts_updated_at_idx" ON "contacts" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "contacts_created_at_idx" ON "contacts" USING btree ("created_at");
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_contacts_fk" FOREIGN KEY ("contacts_id") REFERENCES "public"."contacts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_contacts_id_idx" ON "payload_locked_documents_rels" USING btree ("contacts_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "contacts" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "contacts" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_contacts_fk";
  
  DROP INDEX IF EXISTS "payload_locked_documents_rels_contacts_id_idx";
  ALTER TABLE "visas" ALTER COLUMN "price_processing_time" DROP DEFAULT;
  ALTER TABLE "_visas_v" ALTER COLUMN "version_price_processing_time" DROP DEFAULT;
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "contacts_id";
  DROP TYPE "public"."enum_contacts_type";`)
}
