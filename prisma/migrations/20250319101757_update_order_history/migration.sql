/*
  Warnings:

  - A unique constraint covering the columns `[order_id,status]` on the table `order_histories` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "order_histories_order_id_status_key" ON "order_histories"("order_id", "status");
