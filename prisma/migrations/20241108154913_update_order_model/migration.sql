/*
  Warnings:

  - You are about to drop the column `address_id` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `total_price` on the `orders` table. All the data in the column will be lost.
  - The `payment_method` column on the `orders` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `customer_info_id` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `delivery_charge` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payable_amount` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sub_amount` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_amount` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CASH_ON_DELIVERY', 'ONLINE_PAYMENT');

-- CreateEnum
CREATE TYPE "DeliveryMethod" AS ENUM ('STORE_PICKUP', 'HOME_DELIVERY');

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_address_id_fkey";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "address_id",
DROP COLUMN "total_price",
ADD COLUMN     "customer_info_id" TEXT NOT NULL,
ADD COLUMN     "delivery_charge" INTEGER NOT NULL,
ADD COLUMN     "delivery_method" "DeliveryMethod" NOT NULL DEFAULT 'HOME_DELIVERY',
ADD COLUMN     "payable_amount" INTEGER NOT NULL,
ADD COLUMN     "sub_amount" INTEGER NOT NULL,
ADD COLUMN     "total_amount" INTEGER NOT NULL,
DROP COLUMN "payment_method",
ADD COLUMN     "payment_method" "PaymentMethod" NOT NULL DEFAULT 'CASH_ON_DELIVERY';

-- CreateTable
CREATE TABLE "customers_info" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "contact_number" TEXT NOT NULL,
    "email" TEXT,
    "city" TEXT NOT NULL,

    CONSTRAINT "customers_info_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_customer_info_id_fkey" FOREIGN KEY ("customer_info_id") REFERENCES "customers_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
