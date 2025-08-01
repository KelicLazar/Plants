PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "__drizzle_migrations" (
			id SERIAL PRIMARY KEY,
			hash text NOT NULL,
			created_at numeric
		);
INSERT INTO __drizzle_migrations VALUES(NULL,'294dda5ffe5b817ce0c8b4f3a425fade42a9e0dee588b885e450f9ca3485b108',1753356434614);
INSERT INTO __drizzle_migrations VALUES(NULL,'296bb76444c87806c5b01216c2acf58d42c1f3a7b228b95c15008424d3c3b412',1753532495823);
INSERT INTO __drizzle_migrations VALUES(NULL,'61d614da3ad9a25c6a1344477a55e031f92aa56589b8d38952dc7557649d57b7',1753532567328);
INSERT INTO __drizzle_migrations VALUES(NULL,'26d24594d25c4348c95575d65166a2bc334ff5793f4f71aabb21f3e52e020e4a',1753806303508);
CREATE TABLE `account` (
	`id` integer PRIMARY KEY NOT NULL,
	`account_id` text NOT NULL,
	`provider_id` text NOT NULL,
	`user_id` text NOT NULL,
	`access_token` text,
	`refresh_token` text,
	`id_token` text,
	`access_token_expires_at` integer,
	`refresh_token_expires_at` integer,
	`scope` text,
	`password` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
INSERT INTO account VALUES(1,'111833441506608105356','google','1','ya29.A0AS3H6NwzwE1tKI2PPSsrGnn4CLjvHNN20aw1_ifOYgc7lEYdLsFi1JxTvKEde7FkoL4sHCubXfGRk7oeOWn99a29-h-TEhJsKh-kzuHg7t0PHyz-rvgAEhDHeZ41xnu4tgACmPh3IGVa9saEdrQ9X8yhYO-8Jr-2IjNVBUUg_oci7eqrXYkyvlyhMLHdJ7uDvigiW1ZHaCgYKAXISARQSFQHGX2MitKuw6CTDRt4yJ5AWEM15lw0207',NULL,'eyJhbGciOiJSUzI1NiIsImtpZCI6ImRkNTMwMTIwNGZjMWQ2YTBkNjhjNzgzYTM1Y2M5YzEwYjI1ZTFmNGEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI3OTk2MDUwMDI1OTItaWVua3JlbXBpdTJldjdvb3AydmEzdjAzbW5tYzJhbTAuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI3OTk2MDUwMDI1OTItaWVua3JlbXBpdTJldjdvb3AydmEzdjAzbW5tYzJhbTAuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTE4MzM0NDE1MDY2MDgxMDUzNTYiLCJlbWFpbCI6ImtlbGljbGF6YXJAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJkSXpYYWNxOGNxcm1oeW5fdGJTTzBnIiwibmFtZSI6IkxhemFyIEtlbGljIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0pzQmg1M2RPa29sNm5BZ2kwRm9vRDdkdUUzRDBtSVBZaUtSci1xY3hycGJsMXZvZz1zOTYtYyIsImdpdmVuX25hbWUiOiJMYXphciIsImZhbWlseV9uYW1lIjoiS2VsaWMiLCJpYXQiOjE3NTM5ODQ4ODcsImV4cCI6MTc1Mzk4ODQ4N30.LzaMtlNVrlPoCA2RnmIMUoQ8OgSfY1LI7dz2qnxal_yfMgpgtyr1EiK9ub2HY7SRGyEiHkHZdsOcC61_jBWGOBZlVNxDW_RnPI9wo9l_RGb_U3p_qPD_SP7pQpsKzygK5ebtTh9m2heJ4UU9ZdMXiFJZsWR3bxdksPpJbpJiGDl9xgfKQHuyhNmCNkeQSdxpcM_L30db8eBDty3TDpXYKLSALSjsthWumEiLhep616KA-xD5qnbNZ-kuIoeXsTbBPhm8cJNSic_4GuE2Ao00zQ236jvDauayzVFw8AH8rhRvRz0mgb-9hG6R9DDy4BRcwYrEJaJcwkj58atxApQP7g',1753988484,NULL,'openid,https://www.googleapis.com/auth/userinfo.email,https://www.googleapis.com/auth/userinfo.profile',NULL,1753356494,1753356494);
CREATE TABLE `session` (
	`id` integer PRIMARY KEY NOT NULL,
	`expires_at` integer NOT NULL,
	`token` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`ip_address` text,
	`user_agent` text,
	`user_id` text NOT NULL,
	`impersonated_by` text,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
INSERT INTO session VALUES(1,1754589686,'xSI8IRB4CPUwdjTyhLgolhDerBFYMyqw',1753984886,1753984886,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36','1',NULL);
CREATE TABLE `user` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`email_verified` integer NOT NULL,
	`image` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`role` text,
	`banned` integer,
	`ban_reason` text,
	`ban_expires` integer
);
INSERT INTO user VALUES(1,'Lazar Kelic','keliclazar@gmail.com',1,'https://lh3.googleusercontent.com/a/ACg8ocJsBh53dOkol6nAgi0FooD7duE3D0mIPYiKRr-qcxrpbl1vog=s96-c',1753356494,1753356494,'user',NULL,NULL,NULL);
CREATE TABLE `verification` (
	`id` integer PRIMARY KEY NOT NULL,
	`identifier` text NOT NULL,
	`value` text NOT NULL,
	`expires_at` integer NOT NULL,
	`created_at` integer,
	`updated_at` integer
);
CREATE TABLE `categories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`description` text,
	`parent_id` integer
);
INSERT INTO categories VALUES(6,'Cactus','cactus','Tough, spiky, and full of character. Cacti are low-maintenance plants that thrive in sunny spots and bring bold style to any space.',NULL);
INSERT INTO categories VALUES(7,'Succulents','succulents','Plump, stylish, and easy to care for. Succulents add a fresh, modern touch and are perfect for both beginners and collectors.',NULL);
INSERT INTO categories VALUES(20,'Flowering Cactus','flowering-cactus','Colorful blooms meet easy care. These cacti add a bright, beautiful touch to your space with vibrant flowers and minimal fuss. Perfect for windowsills and sunny spots.',6);
INSERT INTO categories VALUES(21,'Fuzzy Cactus','fuzzy-cactus','Soft-looking cactus with white or fine spines for a unique touch.',6);
INSERT INTO categories VALUES(22,'Desk Plants','desk-plants','Small plants perfect for desks, shelves, or office spaces. Easy to care for and stylish.',NULL);
INSERT INTO categories VALUES(23,'Rosette Types','rosette-types','Rose-shaped succulents with layered leaves. Great for decoration.',7);
INSERT INTO categories VALUES(24,'Colorful Succs','colorful-succs','Succulents with purple, red, or other vibrant leaf tones.',7);
INSERT INTO categories VALUES(25,'Flowering Succs','flowering-succs','Succulents that bloom with colorful flowers seasonally.',7);
INSERT INTO categories VALUES(26,'Sun Lovers','sun-lovers','Plants that thrive in bright light and sunny windowsills.',NULL);
CREATE TABLE `products` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`description` text,
	`price` real NOT NULL,
	`stock` integer NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
, `main_image` text, `side_image` text);
INSERT INTO products VALUES(6,'11 Mini Cactuses','11-mini-cactuses-p9loj9euj6vjffjv4kadw','More then 10 small cactuses in one group!',1500.0,2,1753806554327,1753806554327,'https://res.cloudinary.com/dnklric2m/image/upload/v1753806260/plants-dev/IMG-20250729-WA0004.jpg.jpg','https://res.cloudinary.com/dnklric2m/image/upload/v1753806260/plants-dev/IMG-20250729-WA0006.jpg.jpg');
INSERT INTO products VALUES(7,'Yellow Flower Cactus','yellow-flower-cactus','Cactust with big yellow flower on top.',300.0,10,1753817192143,1753817192144,'https://res.cloudinary.com/dnklric2m/image/upload/v1753817194/plants-dev/IMG-20250729-WA0007.jpg.jpg','https://res.cloudinary.com/dnklric2m/image/upload/v1753817195/plants-dev/IMG-20250729-WA0005.jpg.jpg');
INSERT INTO products VALUES(8,'Black Rose Succulent','black-rose-succulent','Dark purple succulent with rosette leaves on woody stems, thrives in bright light and minimal watering.',1000.0,4,1753864768537,1753864768537,'https://res.cloudinary.com/dnklric2m/image/upload/v1753864767/plants-dev/IMG-20250730-WA0001.jpg.jpg','https://res.cloudinary.com/dnklric2m/image/upload/v1753864767/plants-dev/IMG-20250730-WA0011.jpg.jpg');
INSERT INTO products VALUES(9,'Pink Starlet','pink-starlet','A cheerful succulent with slender green leaves and tiny bright pink star-shaped flowers, perfect for sunny windowsills and easy care.',2000.0,5,1753865020769,1753865020769,'https://res.cloudinary.com/dnklric2m/image/upload/v1753865019/plants-dev/IMG-20250730-WA0004.jpg.jpg','https://res.cloudinary.com/dnklric2m/image/upload/v1753865020/plants-dev/IMG-20250730-WA0008.jpg.jpg');
INSERT INTO products VALUES(10,'Jelly Bean Sprout','jelly-bean-sprout','A playful succulent with chubby, bean-like leaves in soft green tones, easy to grow and perfect for bright spots indoors.',1400.0,20,1753868529800,1753868529800,'https://res.cloudinary.com/dnklric2m/image/upload/v1753868528/plants-dev/IMG-20250730-WA0005.jpg.jpg','https://res.cloudinary.com/dnklric2m/image/upload/v1753868529/plants-dev/IMG-20250730-WA0007.jpg.jpg');
INSERT INTO products VALUES(11,'Little Cactus Garden','little-cactus-garden','A charming mix of small cacti, some fuzzy, some spiky, perfect for sunny spots and minimal care. Great for beginners and cactus lovers alike.',600.0,30,1753868818547,1753868818547,'https://res.cloudinary.com/dnklric2m/image/upload/v1753868817/plants-dev/IMG-20250730-WA0016.jpg.jpg','https://res.cloudinary.com/dnklric2m/image/upload/v1753868818/plants-dev/IMG-20250730-WA0015.jpg.jpg');
CREATE TABLE `product_categories` (
	`product_id` integer NOT NULL,
	`category_id` integer NOT NULL,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE cascade
);
INSERT INTO product_categories VALUES(6,6);
INSERT INTO product_categories VALUES(7,6);
INSERT INTO product_categories VALUES(7,20);
INSERT INTO product_categories VALUES(7,26);
INSERT INTO product_categories VALUES(8,25);
INSERT INTO product_categories VALUES(8,7);
INSERT INTO product_categories VALUES(8,26);
INSERT INTO product_categories VALUES(8,23);
INSERT INTO product_categories VALUES(9,7);
INSERT INTO product_categories VALUES(9,26);
INSERT INTO product_categories VALUES(9,24);
INSERT INTO product_categories VALUES(9,25);
INSERT INTO product_categories VALUES(10,7);
INSERT INTO product_categories VALUES(10,22);
INSERT INTO product_categories VALUES(10,26);
INSERT INTO product_categories VALUES(11,6);
INSERT INTO product_categories VALUES(11,21);
INSERT INTO product_categories VALUES(11,26);
INSERT INTO sqlite_sequence VALUES('categories',26);
INSERT INTO sqlite_sequence VALUES('products',11);
CREATE UNIQUE INDEX `session_token_unique` ON `session` (`token`);
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);
CREATE UNIQUE INDEX `categories_slug_unique` ON `categories` (`slug`);
CREATE UNIQUE INDEX `products_slug_unique` ON `products` (`slug`);
COMMIT;
