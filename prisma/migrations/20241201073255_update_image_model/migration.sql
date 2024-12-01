-- AlterTable
ALTER TABLE "images" ADD COLUMN     "user_id" TEXT DEFAULT 'f322583f-96ab-4d82-ad7d-cc27c5a97b08';

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
