-- AddForeignKey
ALTER TABLE "customers_info" ADD CONSTRAINT "customers_info_coupon_id_fkey" FOREIGN KEY ("coupon_id") REFERENCES "Coupon"("id") ON DELETE SET NULL ON UPDATE CASCADE;
