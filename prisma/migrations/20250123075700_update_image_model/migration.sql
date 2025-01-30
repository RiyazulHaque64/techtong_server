/*
  Warnings:

  - You are about to drop the column `uploaded_from` on the `images` table. All the data in the column will be lost.
  - Added the required column `bucket_name` to the `images` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "images" DROP COLUMN "uploaded_from",
ADD COLUMN     "bucket_name" TEXT NOT NULL;
