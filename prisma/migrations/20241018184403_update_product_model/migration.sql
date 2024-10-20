/*
  Warnings:

  - You are about to drop the column `thumbnail` on the `products` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[thumbnail_id]` on the table `products` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnail_id` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "thumbnail",
ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "thumbnail_id" TEXT NOT NULL,
ALTER COLUMN "published" SET DEFAULT true;

-- CreateIndex
CREATE UNIQUE INDEX "products_thumbnail_id_key" ON "products"("thumbnail_id");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_thumbnail_id_fkey" FOREIGN KEY ("thumbnail_id") REFERENCES "images"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
