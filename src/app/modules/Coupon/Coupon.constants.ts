export const couponSortableFields = [
  "id",
  "code",
  "discount_type",
  "dicount_value",
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

export const couponSearchableFields = ["code", "discount_value"];

export const couponFilterableFields = [
  "discount_type",
  "benificiary_type",
  "is_active",
  "min_value",
  "max_value",
  "from_expiration_date",
  "to_expiration_date",
  "searchTerm",
  "page",
  "limit",
  "sortBy",
  "sortOrder",
];
