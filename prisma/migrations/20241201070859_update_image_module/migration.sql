/*
  Warnings:

  - You are about to drop the column `cloud_id` on the `images` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "images" DROP COLUMN "cloud_id",
ADD COLUMN     "alt_text" TEXT NOT NULL DEFAULT 'example alt text',
ADD COLUMN     "bucket_id" TEXT NOT NULL DEFAULT 'sdfdfsdfsdf',
ADD COLUMN     "height" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "size" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'image/jpeg',
ADD COLUMN     "width" INTEGER NOT NULL DEFAULT 0;
