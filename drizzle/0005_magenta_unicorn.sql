ALTER TABLE "event_images" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "date" SET DATA TYPE date;--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "sponsors" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "photo" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "starting_time" time NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "ending_time" time NOT NULL;