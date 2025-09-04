ALTER TABLE `orders` ADD `note` text;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_products` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`description` text,
	`price` real NOT NULL,
	`stock` integer NOT NULL,
	`main_image` text,
	`side_image` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	CONSTRAINT "stock_positive" CHECK("__new_products"."stock" >= 0)
);
--> statement-breakpoint
INSERT INTO `__new_products`("id", "name", "slug", "description", "price", "stock", "main_image", "side_image", "created_at", "updated_at") SELECT "id", "name", "slug", "description", "price", "stock", "main_image", "side_image", "created_at", "updated_at" FROM `products`;--> statement-breakpoint
DROP TABLE `products`;--> statement-breakpoint
ALTER TABLE `__new_products` RENAME TO `products`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `products_slug_unique` ON `products` (`slug`);