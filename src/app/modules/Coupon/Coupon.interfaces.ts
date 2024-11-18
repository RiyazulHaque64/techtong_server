import { BeneficiaryType, DiscountType } from "@prisma/client";

export type TCouponPayload = {
  code: string;
  discount_type?: DiscountType;
  discount_value: number;
  maximum_value?: number;
  start_date?: Date;
  expiration_date: Date;
  usage_limit?: number;
  per_user_limit?: number;
  min_order_amount?: number;
  min_product_amount?: number;
  beneficiary_type?: BeneficiaryType;
};

export type TApplyCouponPayload = {
  code: string;
  contact_number: string;
  order_amount: number;
  product_amount: number;
  customer_type: "NEW" | "EXISTING" | "GUEST";
};

export type TApplyCouponResponse = {
  id: string;
  code: string;
  discount_amount: number;
};
