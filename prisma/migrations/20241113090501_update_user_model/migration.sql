/*
  Warnings:

  - You are about to drop the column `profile_pic_id` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_profile_pic_id_fkey";

-- DropIndex
DROP INDEX "users_profile_pic_id_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "profile_pic_id",
ADD COLUMN     "profile_pic" TEXT;
