CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"password" text NOT NULL,
	"role" varchar DEFAULT 'employee',
	"manager_id" serial NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
