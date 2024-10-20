/*
  Warnings:

  - You are about to drop the column `thumbnail_id` on the `products` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_thumbnail_id_fkey";

-- DropIndex
DROP INDEX "products_thumbnail_id_key";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "thumbnail_id",
ADD COLUMN     "thumbnail" TEXT;
