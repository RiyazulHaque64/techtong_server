/*
  Warnings:

  - You are about to drop the column `productId` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "categories" DROP COLUMN "productId";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "categoryId";

-- AlterTable
ALTER TABLE "reviews" ALTER COLUMN "rating" SET DEFAULT 5,
ALTER COLUMN "rating" SET DATA TYPE DOUBLE PRECISION;
