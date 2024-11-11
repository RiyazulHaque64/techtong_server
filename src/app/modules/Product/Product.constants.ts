import { sortOrderType } from "../../constants/common";

export const productSortableFields = [
  "name",
  "price",
  "discount_price",
  "retailer_price",
  "stock",
  "created_at",
  "updated_at",
];
export const productSearchableFields = ["name", "model", "code", "description"];

export const productFieldsValidationConfig: Record<string, any> = {
  sort_by: productSortableFields,
  sort_order: sortOrderType,
};
