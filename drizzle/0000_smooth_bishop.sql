DO $$ BEGIN
 CREATE TYPE "genres" AS ENUM('Rap', 'Rock', 'Disco-Polo', 'Techno', 'Electronic');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "place_categories" AS ENUM('Pub', 'Bar', 'Club', 'Open Space', 'Festival');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "artists" (
	"id" uuid PRIMARY KEY NOT NULL,
	"created_at" timestamp,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"artist_name" text NOT NULL,
	"image_url" text,
	"genre" "genres" NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "organizers" (
	"id" uuid PRIMARY KEY NOT NULL,
	"created_at" timestamp,
	"first_name" text,
	"last_name" text,
	"image_url" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ogranisators_place" (
	"id" uuid PRIMARY KEY NOT NULL,
	"created_at" timestamp,
	"place_name" text,
	"address" text,
	"place_category" "place_categories",
	"coordinates" jsonb,
	"organizers_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "place_event" (
	"id" uuid PRIMARY KEY NOT NULL,
	"created_at" timestamp,
	"date" date,
	"event_name" text,
	"description" text,
	"place_uuid" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "social_media" (
	"id" uuid PRIMARY KEY NOT NULL,
	"spotify" text,
	"youtube" text,
	"soundcloud" text,
	"instagram" text,
	"tiktok" text,
	"artist_id" uuid,
	"organizers_id" uuid
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ogranisators_place" ADD CONSTRAINT "ogranisators_place_organizers_id_organizers_id_fk" FOREIGN KEY ("organizers_id") REFERENCES "organizers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "place_event" ADD CONSTRAINT "place_event_place_uuid_organizers_id_fk" FOREIGN KEY ("place_uuid") REFERENCES "organizers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "social_media" ADD CONSTRAINT "social_media_artist_id_artists_id_fk" FOREIGN KEY ("artist_id") REFERENCES "artists"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "social_media" ADD CONSTRAINT "social_media_organizers_id_organizers_id_fk" FOREIGN KEY ("organizers_id") REFERENCES "organizers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
