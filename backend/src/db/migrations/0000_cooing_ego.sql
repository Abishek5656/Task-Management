CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(150) NOT NULL,
	"email" varchar(150) NOT NULL,
	"password_hash" text NOT NULL,
	"role" integer NOT NULL,
	"manager_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
