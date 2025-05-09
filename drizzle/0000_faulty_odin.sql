CREATE TYPE "public"."event_type" AS ENUM('gallery', 'event', 'event_gallery');--> statement-breakpoint
CREATE TABLE "event_images" (
	"id" serial PRIMARY KEY NOT NULL,
	"event_id" integer NOT NULL,
	"image_url" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "events" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"event_type" "event_type" NOT NULL,
	"slug" varchar(255) NOT NULL,
	"description" varchar NOT NULL,
	"content" varchar,
	"date" timestamp NOT NULL,
	"location" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "sponsors" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"logo" varchar NOT NULL,
	"website" varchar(255) NOT NULL,
	"sponsoring_since" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"second_name" varchar(255) NOT NULL,
	"photo" varchar,
	"occupation" varchar(255) NOT NULL,
	"joined_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "event_images" ADD CONSTRAINT "event_images_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE no action ON UPDATE no action;