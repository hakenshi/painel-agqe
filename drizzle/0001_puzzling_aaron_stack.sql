ALTER TABLE "users" ADD COLUMN "cpf" varchar(14) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "password" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "birth_date" date;