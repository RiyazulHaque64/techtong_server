/*
  Warnings:

  - A unique constraint covering the columns `[contact_number]` on the table `customers_info` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "customers_info_contact_number_key" ON "customers_info"("contact_number");
