/*
  Warnings:

  - A unique constraint covering the columns `[otp]` on the table `user_otp` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "user_otp_otp_key" ON "user_otp"("otp");
