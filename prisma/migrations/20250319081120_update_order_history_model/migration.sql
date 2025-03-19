-- AlterTable
ALTER TABLE "order_histories" ADD COLUMN     "user_id" TEXT;

-- AddForeignKey
ALTER TABLE "order_histories" ADD CONSTRAINT "order_histories_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
