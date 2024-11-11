/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Coupon` table. All the data in the column will be lost.
  - You are about to drop the column `discountType` on the `Coupon` table. All the data in the column will be lost.
  - You are about to drop the column `discountValue` on the `Coupon` table. All the data in the column will be lost.
  - You are about to drop the column `expirationDate` on the `Coupon` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Coupon` table. All the data in the column will be lost.
  - You are about to drop the column `maximumValue` on the `Coupon` table. All the data in the column will be lost.
  - You are about to drop the column `minOrderAmount` on the `Coupon` table. All the data in the column will be lost.
  - You are about to drop the column `perUserLimit` on the `Coupon` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Coupon` table. All the data in the column will be lost.
  - You are about to drop the column `usageLimit` on the `Coupon` table. All the data in the column will be lost.
  - You are about to drop the column `userType` on the `Coupon` table. All the data in the column will be lost.
  - Added the required column `discount_type` to the `Coupon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discount_value` to the `Coupon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expiration_date` to the `Coupon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Coupon` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BeneficiaryType" AS ENUM ('NEW_USER', 'EXISTING_USER', 'ALL');

-- AlterTable
ALTER TABLE "Coupon" DROP COLUMN "createdAt",
DROP COLUMN "discountType",
DROP COLUMN "discountValue",
DROP COLUMN "expirationDate",
DROP COLUMN "isActive",
DROP COLUMN "maximumValue",
DROP COLUMN "minOrderAmount",
DROP COLUMN "perUserLimit",
DROP COLUMN "updatedAt",
DROP COLUMN "usageLimit",
DROP COLUMN "userType",
ADD COLUMN     "beneficiary_type" "BeneficiaryType" NOT NULL DEFAULT 'ALL',
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "discount_type" "DiscountType" NOT NULL,
ADD COLUMN     "discount_value" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "expiration_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "maximum_value" DOUBLE PRECISION,
ADD COLUMN     "min_order_amount" DOUBLE PRECISION,
ADD COLUMN     "per_user_limit" INTEGER,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "usage_limit" INTEGER;

-- DropEnum
DROP TYPE "UserType";
