/*
  Warnings:

  - The `key_features` column on the `products` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "attributes" JSONB,
DROP COLUMN "key_features",
ADD COLUMN     "key_features" TEXT[] DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "description" SET DATA TYPE TEXT,
ALTER COLUMN "specification" SET DATA TYPE TEXT;
