/*
  Warnings:

  - Made the column `attributes` on table `products` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "products" ALTER COLUMN "attributes" SET NOT NULL;
