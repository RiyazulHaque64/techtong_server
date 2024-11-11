import { BeneficiaryType, DiscountType } from "@prisma/client";
import { sortOrderType } from "../../constants/common";

export const couponSortableFields = [
  "id",
  "code",
  "discount_type",
  "discount_value",
  "maximum_value",
  "expiration_date",
  "usage_limit",
  "per_user_limit",
  "min_order_amount",
  "min_product_amount",
  "beneficiary_type",
  "is_active",
  "created_at",
  "updated_at",
];

export const couponSearchableFields = ["code"];

export const couponFilterableFields = [
  "discount_type",
  "beneficiary_type",
  "is_active",
  "minValue",
  "maxValue",
  "searchTerm",
  "page",
  "limit",
  "sortBy",
  "sortOrder",
];

export const couponFieldsValidationConfig: Record<string, any> = {
  discount_type: Object.values(DiscountType),
  beneficiary_type: Object.values(BeneficiaryType),
  is_active: ["true", "false"],
  sort_by: couponSortableFields,
  sort_order: sortOrderType,
};
