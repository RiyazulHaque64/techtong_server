/*
  Warnings:

  - You are about to drop the column `attribute_id` on the `product_attributes` table. All the data in the column will be lost.
  - You are about to drop the column `value_id` on the `product_attributes` table. All the data in the column will be lost.
  - You are about to drop the `attribute_values` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `slug` to the `attributes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `product_attributes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "attribute_values" DROP CONSTRAINT "attribute_values_attribute_id_fkey";

-- DropForeignKey
ALTER TABLE "product_attributes" DROP CONSTRAINT "product_attributes_attribute_id_fkey";

-- DropForeignKey
ALTER TABLE "product_attributes" DROP CONSTRAINT "product_attributes_value_id_fkey";

-- DropIndex
DROP INDEX "product_attributes_product_id_attribute_id_value_id_key";

-- AlterTable
ALTER TABLE "attributes" ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "value" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "product_attributes" DROP COLUMN "attribute_id",
DROP COLUMN "value_id",
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "value" TEXT[];

-- DropTable
DROP TABLE "attribute_values";
