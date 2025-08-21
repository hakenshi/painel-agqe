CREATE TYPE "public"."project_status" AS ENUM('planning', 'active', 'completed', 'archived');--> statement-breakpoint
CREATE TYPE "public"."project_type" AS ENUM('social', 'educational', 'environmental', 'cultural', 'health');--> statement-breakpoint
CREATE TABLE "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"cover_image" varchar NOT NULL,
	"responsibles" text,
	"project_type" "project_type" NOT NULL,
	"slug" varchar NOT NULL,
	"markdown" varchar,
	"location" varchar(255),
	"date" date,
	"starting_time" time,
	"ending_time" time,
	"project_status" "project_status" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "slug" SET DATA TYPE varchar;