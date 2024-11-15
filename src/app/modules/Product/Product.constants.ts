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

export const brandSelectFieldsWithProduct = {
  id: true,
  name: true,
  slug: true,
  icon: true,
};

export const categorySelectFieldsWithProduct = {
  id: true,
  title: true,
  slug: true,
  icon: true,
};
