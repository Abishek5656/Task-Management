CREATE TABLE "requests" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(200) NOT NULL,
	"description" text,
	"created_by" varchar(100) NOT NULL,
	"assigned_to" varchar(100) NOT NULL,
	"manager_id" integer NOT NULL,
	"status" integer NOT NULL,
	"manager_status" integer NOT NULL,
	"manager_comment" text,
	"created_at" timestamp DEFAULT now()
);
