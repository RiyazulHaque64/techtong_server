/*
  Warnings:

  - A unique constraint covering the columns `[contact_number]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "user_otp_email_key";

-- CreateIndex
CREATE UNIQUE INDEX "users_contact_number_key" ON "users"("contact_number");
