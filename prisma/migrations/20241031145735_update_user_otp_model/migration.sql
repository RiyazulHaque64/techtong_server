-- AlterTable
ALTER TABLE "addresses" ALTER COLUMN "email" DROP NOT NULL;

-- AlterTable
ALTER TABLE "user_otp" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "email" DROP NOT NULL;
