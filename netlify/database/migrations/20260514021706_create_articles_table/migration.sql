CREATE TABLE "articles" (
	"id" serial PRIMARY KEY,
	"slug" text NOT NULL UNIQUE,
	"title" text NOT NULL,
	"category" text DEFAULT 'General' NOT NULL,
	"summary" text NOT NULL,
	"image_url" text NOT NULL,
	"content" text NOT NULL,
	"source_url" text,
	"published_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
