import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_visas_content_types_type" AS ENUM('employment', 'tourism', 'business');
  CREATE TYPE "public"."enum__visas_v_version_content_types_type" AS ENUM('employment', 'tourism', 'business');
  CREATE TABLE IF NOT EXISTS "visas_content_types" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_visas_content_types_type",
  	"price" numeric,
  	"consular_fee" numeric DEFAULT 80,
  	"processing_time" numeric,
  	"rejection_chance" varchar DEFAULT '<1%'
  );
  
  CREATE TABLE IF NOT EXISTS "_visas_v_version_content_types" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum__visas_v_version_content_types_type",
  	"price" numeric,
  	"consular_fee" numeric DEFAULT 80,
  	"processing_time" numeric,
  	"rejection_chance" varchar DEFAULT '<1%',
  	"_uuid" varchar
  );
  
  ALTER TABLE "visas" ADD COLUMN "name" varchar;
  ALTER TABLE "visas" ADD COLUMN "label" varchar;
  ALTER TABLE "visas" ADD COLUMN "category_id" integer;
  ALTER TABLE "visas" ADD COLUMN "slug" varchar;
  ALTER TABLE "visas" ADD COLUMN "slug_lock" boolean DEFAULT true;
  ALTER TABLE "visas" ADD COLUMN "href" varchar;
  ALTER TABLE "visas" ADD COLUMN "img_url" varchar;
  ALTER TABLE "visas" ADD COLUMN "content_cover_id" integer;
  ALTER TABLE "visas" ADD COLUMN "content_value" varchar;
  ALTER TABLE "visas" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "visas" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "visas" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "_visas_v" ADD COLUMN "version_name" varchar;
  ALTER TABLE "_visas_v" ADD COLUMN "version_label" varchar;
  ALTER TABLE "_visas_v" ADD COLUMN "version_category_id" integer;
  ALTER TABLE "_visas_v" ADD COLUMN "version_slug" varchar;
  ALTER TABLE "_visas_v" ADD COLUMN "version_slug_lock" boolean DEFAULT true;
  ALTER TABLE "_visas_v" ADD COLUMN "version_href" varchar;
  ALTER TABLE "_visas_v" ADD COLUMN "version_img_url" varchar;
  ALTER TABLE "_visas_v" ADD COLUMN "version_content_cover_id" integer;
  ALTER TABLE "_visas_v" ADD COLUMN "version_content_value" varchar;
  ALTER TABLE "_visas_v" ADD COLUMN "version_meta_title" varchar;
  ALTER TABLE "_visas_v" ADD COLUMN "version_meta_image_id" integer;
  ALTER TABLE "_visas_v" ADD COLUMN "version_meta_description" varchar;
  DO $$ BEGIN
   ALTER TABLE "visas_content_types" ADD CONSTRAINT "visas_content_types_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."visas"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_visas_v_version_content_types" ADD CONSTRAINT "_visas_v_version_content_types_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_visas_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "visas_content_types_order_idx" ON "visas_content_types" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "visas_content_types_parent_id_idx" ON "visas_content_types" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_visas_v_version_content_types_order_idx" ON "_visas_v_version_content_types" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_visas_v_version_content_types_parent_id_idx" ON "_visas_v_version_content_types" USING btree ("_parent_id");
  DO $$ BEGIN
   ALTER TABLE "visas" ADD CONSTRAINT "visas_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "visas" ADD CONSTRAINT "visas_content_cover_id_media_id_fk" FOREIGN KEY ("content_cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "visas" ADD CONSTRAINT "visas_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_visas_v" ADD CONSTRAINT "_visas_v_version_category_id_categories_id_fk" FOREIGN KEY ("version_category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_visas_v" ADD CONSTRAINT "_visas_v_version_content_cover_id_media_id_fk" FOREIGN KEY ("version_content_cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_visas_v" ADD CONSTRAINT "_visas_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "visas_category_idx" ON "visas" USING btree ("category_id");
  CREATE INDEX IF NOT EXISTS "visas_slug_idx" ON "visas" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "visas_content_content_cover_idx" ON "visas" USING btree ("content_cover_id");
  CREATE INDEX IF NOT EXISTS "visas_meta_meta_image_idx" ON "visas" USING btree ("meta_image_id");
  CREATE INDEX IF NOT EXISTS "_visas_v_version_version_category_idx" ON "_visas_v" USING btree ("version_category_id");
  CREATE INDEX IF NOT EXISTS "_visas_v_version_version_slug_idx" ON "_visas_v" USING btree ("version_slug");
  CREATE INDEX IF NOT EXISTS "_visas_v_version_content_version_content_cover_idx" ON "_visas_v" USING btree ("version_content_cover_id");
  CREATE INDEX IF NOT EXISTS "_visas_v_version_meta_version_meta_image_idx" ON "_visas_v" USING btree ("version_meta_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "visas_content_types" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_visas_v_version_content_types" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "visas_content_types" CASCADE;
  DROP TABLE "_visas_v_version_content_types" CASCADE;
  ALTER TABLE "visas" DROP CONSTRAINT "visas_category_id_categories_id_fk";
  
  ALTER TABLE "visas" DROP CONSTRAINT "visas_content_cover_id_media_id_fk";
  
  ALTER TABLE "visas" DROP CONSTRAINT "visas_meta_image_id_media_id_fk";
  
  ALTER TABLE "_visas_v" DROP CONSTRAINT "_visas_v_version_category_id_categories_id_fk";
  
  ALTER TABLE "_visas_v" DROP CONSTRAINT "_visas_v_version_content_cover_id_media_id_fk";
  
  ALTER TABLE "_visas_v" DROP CONSTRAINT "_visas_v_version_meta_image_id_media_id_fk";
  
  DROP INDEX IF EXISTS "visas_category_idx";
  DROP INDEX IF EXISTS "visas_slug_idx";
  DROP INDEX IF EXISTS "visas_content_content_cover_idx";
  DROP INDEX IF EXISTS "visas_meta_meta_image_idx";
  DROP INDEX IF EXISTS "_visas_v_version_version_category_idx";
  DROP INDEX IF EXISTS "_visas_v_version_version_slug_idx";
  DROP INDEX IF EXISTS "_visas_v_version_content_version_content_cover_idx";
  DROP INDEX IF EXISTS "_visas_v_version_meta_version_meta_image_idx";
  ALTER TABLE "visas" DROP COLUMN IF EXISTS "name";
  ALTER TABLE "visas" DROP COLUMN IF EXISTS "label";
  ALTER TABLE "visas" DROP COLUMN IF EXISTS "category_id";
  ALTER TABLE "visas" DROP COLUMN IF EXISTS "slug";
  ALTER TABLE "visas" DROP COLUMN IF EXISTS "slug_lock";
  ALTER TABLE "visas" DROP COLUMN IF EXISTS "href";
  ALTER TABLE "visas" DROP COLUMN IF EXISTS "img_url";
  ALTER TABLE "visas" DROP COLUMN IF EXISTS "content_cover_id";
  ALTER TABLE "visas" DROP COLUMN IF EXISTS "content_value";
  ALTER TABLE "visas" DROP COLUMN IF EXISTS "meta_title";
  ALTER TABLE "visas" DROP COLUMN IF EXISTS "meta_image_id";
  ALTER TABLE "visas" DROP COLUMN IF EXISTS "meta_description";
  ALTER TABLE "_visas_v" DROP COLUMN IF EXISTS "version_name";
  ALTER TABLE "_visas_v" DROP COLUMN IF EXISTS "version_label";
  ALTER TABLE "_visas_v" DROP COLUMN IF EXISTS "version_category_id";
  ALTER TABLE "_visas_v" DROP COLUMN IF EXISTS "version_slug";
  ALTER TABLE "_visas_v" DROP COLUMN IF EXISTS "version_slug_lock";
  ALTER TABLE "_visas_v" DROP COLUMN IF EXISTS "version_href";
  ALTER TABLE "_visas_v" DROP COLUMN IF EXISTS "version_img_url";
  ALTER TABLE "_visas_v" DROP COLUMN IF EXISTS "version_content_cover_id";
  ALTER TABLE "_visas_v" DROP COLUMN IF EXISTS "version_content_value";
  ALTER TABLE "_visas_v" DROP COLUMN IF EXISTS "version_meta_title";
  ALTER TABLE "_visas_v" DROP COLUMN IF EXISTS "version_meta_image_id";
  ALTER TABLE "_visas_v" DROP COLUMN IF EXISTS "version_meta_description";
  DROP TYPE "public"."enum_visas_content_types_type";
  DROP TYPE "public"."enum__visas_v_version_content_types_type";`)
}
