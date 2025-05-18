CREATE TYPE "public"."colors" AS ENUM('black', 'pink', 'purple', 'blue', 'teal', 'red', 'indigo', 'yellow', 'green', 'gray', 'orange', 'cyan', 'lime');--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "photo" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "colors" "colors" DEFAULT 'pink' NOT NULL;