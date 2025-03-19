/*
  Warnings:

  - You are about to drop the column `message` on the `order_histories` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "order_histories" DROP COLUMN "message",
ADD COLUMN     "remark" TEXT;
