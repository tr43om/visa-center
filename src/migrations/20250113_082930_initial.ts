import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_why_us_apart_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_why_us_apart_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_why_us_together_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_why_us_together_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_why_us_apart_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_why_us_apart_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_why_us_together_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_why_us_together_link_appearance" AS ENUM('default', 'outline');
  ALTER TABLE "pages_blocks_why_us" ADD COLUMN "apart_name" varchar;
  ALTER TABLE "pages_blocks_why_us" ADD COLUMN "apart_rich_text" jsonb;
  ALTER TABLE "pages_blocks_why_us" ADD COLUMN "apart_cover_id" integer;
  ALTER TABLE "pages_blocks_why_us" ADD COLUMN "apart_hero_id" integer;
  ALTER TABLE "pages_blocks_why_us" ADD COLUMN "apart_enable_link" boolean;
  ALTER TABLE "pages_blocks_why_us" ADD COLUMN "apart_link_type" "enum_pages_blocks_why_us_apart_link_type" DEFAULT 'reference';
  ALTER TABLE "pages_blocks_why_us" ADD COLUMN "apart_link_new_tab" boolean;
  ALTER TABLE "pages_blocks_why_us" ADD COLUMN "apart_link_url" varchar;
  ALTER TABLE "pages_blocks_why_us" ADD COLUMN "apart_link_label" varchar;
  ALTER TABLE "pages_blocks_why_us" ADD COLUMN "apart_link_appearance" "enum_pages_blocks_why_us_apart_link_appearance" DEFAULT 'default';
  ALTER TABLE "pages_blocks_why_us" ADD COLUMN "together_name" varchar;
  ALTER TABLE "pages_blocks_why_us" ADD COLUMN "together_rich_text" jsonb;
  ALTER TABLE "pages_blocks_why_us" ADD COLUMN "together_cover_id" integer;
  ALTER TABLE "pages_blocks_why_us" ADD COLUMN "together_hero_id" integer;
  ALTER TABLE "pages_blocks_why_us" ADD COLUMN "together_enable_link" boolean;
  ALTER TABLE "pages_blocks_why_us" ADD COLUMN "together_link_type" "enum_pages_blocks_why_us_together_link_type" DEFAULT 'reference';
  ALTER TABLE "pages_blocks_why_us" ADD COLUMN "together_link_new_tab" boolean;
  ALTER TABLE "pages_blocks_why_us" ADD COLUMN "together_link_url" varchar;
  ALTER TABLE "pages_blocks_why_us" ADD COLUMN "together_link_label" varchar;
  ALTER TABLE "pages_blocks_why_us" ADD COLUMN "together_link_appearance" "enum_pages_blocks_why_us_together_link_appearance" DEFAULT 'default';
  ALTER TABLE "_pages_v_blocks_why_us" ADD COLUMN "apart_name" varchar;
  ALTER TABLE "_pages_v_blocks_why_us" ADD COLUMN "apart_rich_text" jsonb;
  ALTER TABLE "_pages_v_blocks_why_us" ADD COLUMN "apart_cover_id" integer;
  ALTER TABLE "_pages_v_blocks_why_us" ADD COLUMN "apart_hero_id" integer;
  ALTER TABLE "_pages_v_blocks_why_us" ADD COLUMN "apart_enable_link" boolean;
  ALTER TABLE "_pages_v_blocks_why_us" ADD COLUMN "apart_link_type" "enum__pages_v_blocks_why_us_apart_link_type" DEFAULT 'reference';
  ALTER TABLE "_pages_v_blocks_why_us" ADD COLUMN "apart_link_new_tab" boolean;
  ALTER TABLE "_pages_v_blocks_why_us" ADD COLUMN "apart_link_url" varchar;
  ALTER TABLE "_pages_v_blocks_why_us" ADD COLUMN "apart_link_label" varchar;
  ALTER TABLE "_pages_v_blocks_why_us" ADD COLUMN "apart_link_appearance" "enum__pages_v_blocks_why_us_apart_link_appearance" DEFAULT 'default';
  ALTER TABLE "_pages_v_blocks_why_us" ADD COLUMN "together_name" varchar;
  ALTER TABLE "_pages_v_blocks_why_us" ADD COLUMN "together_rich_text" jsonb;
  ALTER TABLE "_pages_v_blocks_why_us" ADD COLUMN "together_cover_id" integer;
  ALTER TABLE "_pages_v_blocks_why_us" ADD COLUMN "together_hero_id" integer;
  ALTER TABLE "_pages_v_blocks_why_us" ADD COLUMN "together_enable_link" boolean;
  ALTER TABLE "_pages_v_blocks_why_us" ADD COLUMN "together_link_type" "enum__pages_v_blocks_why_us_together_link_type" DEFAULT 'reference';
  ALTER TABLE "_pages_v_blocks_why_us" ADD COLUMN "together_link_new_tab" boolean;
  ALTER TABLE "_pages_v_blocks_why_us" ADD COLUMN "together_link_url" varchar;
  ALTER TABLE "_pages_v_blocks_why_us" ADD COLUMN "together_link_label" varchar;
  ALTER TABLE "_pages_v_blocks_why_us" ADD COLUMN "together_link_appearance" "enum__pages_v_blocks_why_us_together_link_appearance" DEFAULT 'default';
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_why_us" ADD CONSTRAINT "pages_blocks_why_us_apart_cover_id_media_id_fk" FOREIGN KEY ("apart_cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_why_us" ADD CONSTRAINT "pages_blocks_why_us_apart_hero_id_media_id_fk" FOREIGN KEY ("apart_hero_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_why_us" ADD CONSTRAINT "pages_blocks_why_us_together_cover_id_media_id_fk" FOREIGN KEY ("together_cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_why_us" ADD CONSTRAINT "pages_blocks_why_us_together_hero_id_media_id_fk" FOREIGN KEY ("together_hero_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_why_us" ADD CONSTRAINT "_pages_v_blocks_why_us_apart_cover_id_media_id_fk" FOREIGN KEY ("apart_cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_why_us" ADD CONSTRAINT "_pages_v_blocks_why_us_apart_hero_id_media_id_fk" FOREIGN KEY ("apart_hero_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_why_us" ADD CONSTRAINT "_pages_v_blocks_why_us_together_cover_id_media_id_fk" FOREIGN KEY ("together_cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_why_us" ADD CONSTRAINT "_pages_v_blocks_why_us_together_hero_id_media_id_fk" FOREIGN KEY ("together_hero_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_why_us_apart_apart_cover_idx" ON "pages_blocks_why_us" USING btree ("apart_cover_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_why_us_apart_apart_hero_idx" ON "pages_blocks_why_us" USING btree ("apart_hero_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_why_us_together_together_cover_idx" ON "pages_blocks_why_us" USING btree ("together_cover_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_why_us_together_together_hero_idx" ON "pages_blocks_why_us" USING btree ("together_hero_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_why_us_apart_apart_cover_idx" ON "_pages_v_blocks_why_us" USING btree ("apart_cover_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_why_us_apart_apart_hero_idx" ON "_pages_v_blocks_why_us" USING btree ("apart_hero_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_why_us_together_together_cover_idx" ON "_pages_v_blocks_why_us" USING btree ("together_cover_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_why_us_together_together_hero_idx" ON "_pages_v_blocks_why_us" USING btree ("together_hero_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_why_us" DROP CONSTRAINT "pages_blocks_why_us_apart_cover_id_media_id_fk";
  
  ALTER TABLE "pages_blocks_why_us" DROP CONSTRAINT "pages_blocks_why_us_apart_hero_id_media_id_fk";
  
  ALTER TABLE "pages_blocks_why_us" DROP CONSTRAINT "pages_blocks_why_us_together_cover_id_media_id_fk";
  
  ALTER TABLE "pages_blocks_why_us" DROP CONSTRAINT "pages_blocks_why_us_together_hero_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_why_us" DROP CONSTRAINT "_pages_v_blocks_why_us_apart_cover_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_why_us" DROP CONSTRAINT "_pages_v_blocks_why_us_apart_hero_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_why_us" DROP CONSTRAINT "_pages_v_blocks_why_us_together_cover_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_why_us" DROP CONSTRAINT "_pages_v_blocks_why_us_together_hero_id_media_id_fk";
  
  DROP INDEX IF EXISTS "pages_blocks_why_us_apart_apart_cover_idx";
  DROP INDEX IF EXISTS "pages_blocks_why_us_apart_apart_hero_idx";
  DROP INDEX IF EXISTS "pages_blocks_why_us_together_together_cover_idx";
  DROP INDEX IF EXISTS "pages_blocks_why_us_together_together_hero_idx";
  DROP INDEX IF EXISTS "_pages_v_blocks_why_us_apart_apart_cover_idx";
  DROP INDEX IF EXISTS "_pages_v_blocks_why_us_apart_apart_hero_idx";
  DROP INDEX IF EXISTS "_pages_v_blocks_why_us_together_together_cover_idx";
  DROP INDEX IF EXISTS "_pages_v_blocks_why_us_together_together_hero_idx";
  ALTER TABLE "pages_blocks_why_us" DROP COLUMN IF EXISTS "apart_name";
  ALTER TABLE "pages_blocks_why_us" DROP COLUMN IF EXISTS "apart_rich_text";
  ALTER TABLE "pages_blocks_why_us" DROP COLUMN IF EXISTS "apart_cover_id";
  ALTER TABLE "pages_blocks_why_us" DROP COLUMN IF EXISTS "apart_hero_id";
  ALTER TABLE "pages_blocks_why_us" DROP COLUMN IF EXISTS "apart_enable_link";
  ALTER TABLE "pages_blocks_why_us" DROP COLUMN IF EXISTS "apart_link_type";
  ALTER TABLE "pages_blocks_why_us" DROP COLUMN IF EXISTS "apart_link_new_tab";
  ALTER TABLE "pages_blocks_why_us" DROP COLUMN IF EXISTS "apart_link_url";
  ALTER TABLE "pages_blocks_why_us" DROP COLUMN IF EXISTS "apart_link_label";
  ALTER TABLE "pages_blocks_why_us" DROP COLUMN IF EXISTS "apart_link_appearance";
  ALTER TABLE "pages_blocks_why_us" DROP COLUMN IF EXISTS "together_name";
  ALTER TABLE "pages_blocks_why_us" DROP COLUMN IF EXISTS "together_rich_text";
  ALTER TABLE "pages_blocks_why_us" DROP COLUMN IF EXISTS "together_cover_id";
  ALTER TABLE "pages_blocks_why_us" DROP COLUMN IF EXISTS "together_hero_id";
  ALTER TABLE "pages_blocks_why_us" DROP COLUMN IF EXISTS "together_enable_link";
  ALTER TABLE "pages_blocks_why_us" DROP COLUMN IF EXISTS "together_link_type";
  ALTER TABLE "pages_blocks_why_us" DROP COLUMN IF EXISTS "together_link_new_tab";
  ALTER TABLE "pages_blocks_why_us" DROP COLUMN IF EXISTS "together_link_url";
  ALTER TABLE "pages_blocks_why_us" DROP COLUMN IF EXISTS "together_link_label";
  ALTER TABLE "pages_blocks_why_us" DROP COLUMN IF EXISTS "together_link_appearance";
  ALTER TABLE "_pages_v_blocks_why_us" DROP COLUMN IF EXISTS "apart_name";
  ALTER TABLE "_pages_v_blocks_why_us" DROP COLUMN IF EXISTS "apart_rich_text";
  ALTER TABLE "_pages_v_blocks_why_us" DROP COLUMN IF EXISTS "apart_cover_id";
  ALTER TABLE "_pages_v_blocks_why_us" DROP COLUMN IF EXISTS "apart_hero_id";
  ALTER TABLE "_pages_v_blocks_why_us" DROP COLUMN IF EXISTS "apart_enable_link";
  ALTER TABLE "_pages_v_blocks_why_us" DROP COLUMN IF EXISTS "apart_link_type";
  ALTER TABLE "_pages_v_blocks_why_us" DROP COLUMN IF EXISTS "apart_link_new_tab";
  ALTER TABLE "_pages_v_blocks_why_us" DROP COLUMN IF EXISTS "apart_link_url";
  ALTER TABLE "_pages_v_blocks_why_us" DROP COLUMN IF EXISTS "apart_link_label";
  ALTER TABLE "_pages_v_blocks_why_us" DROP COLUMN IF EXISTS "apart_link_appearance";
  ALTER TABLE "_pages_v_blocks_why_us" DROP COLUMN IF EXISTS "together_name";
  ALTER TABLE "_pages_v_blocks_why_us" DROP COLUMN IF EXISTS "together_rich_text";
  ALTER TABLE "_pages_v_blocks_why_us" DROP COLUMN IF EXISTS "together_cover_id";
  ALTER TABLE "_pages_v_blocks_why_us" DROP COLUMN IF EXISTS "together_hero_id";
  ALTER TABLE "_pages_v_blocks_why_us" DROP COLUMN IF EXISTS "together_enable_link";
  ALTER TABLE "_pages_v_blocks_why_us" DROP COLUMN IF EXISTS "together_link_type";
  ALTER TABLE "_pages_v_blocks_why_us" DROP COLUMN IF EXISTS "together_link_new_tab";
  ALTER TABLE "_pages_v_blocks_why_us" DROP COLUMN IF EXISTS "together_link_url";
  ALTER TABLE "_pages_v_blocks_why_us" DROP COLUMN IF EXISTS "together_link_label";
  ALTER TABLE "_pages_v_blocks_why_us" DROP COLUMN IF EXISTS "together_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_why_us_apart_link_type";
  DROP TYPE "public"."enum_pages_blocks_why_us_apart_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_why_us_together_link_type";
  DROP TYPE "public"."enum_pages_blocks_why_us_together_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_why_us_apart_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_why_us_apart_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_why_us_together_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_why_us_together_link_appearance";`)
}
