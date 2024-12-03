-- CreateEnum
CREATE TYPE "UploadedFrom" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "images" ADD COLUMN     "uploaded_from" "UploadedFrom" NOT NULL DEFAULT 'ADMIN';
