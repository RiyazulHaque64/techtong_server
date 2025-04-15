/*
  Warnings:

  - You are about to drop the `delivery_info` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "delivery_info" DROP CONSTRAINT "delivery_info_courier_id_fkey";

-- DropForeignKey
ALTER TABLE "delivery_info" DROP CONSTRAINT "delivery_info_order_id_fkey";

-- DropTable
DROP TABLE "delivery_info";

-- CreateTable
CREATE TABLE "shipped_info" (
    "id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "courier_id" TEXT NOT NULL,
    "tracking_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "shipped_info_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "shipped_info_order_id_key" ON "shipped_info"("order_id");

-- AddForeignKey
ALTER TABLE "shipped_info" ADD CONSTRAINT "shipped_info_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shipped_info" ADD CONSTRAINT "shipped_info_courier_id_fkey" FOREIGN KEY ("courier_id") REFERENCES "couriers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
