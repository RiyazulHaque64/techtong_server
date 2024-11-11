import { sortOrderType } from "../../constants/common";

export const brandSearchableFields = ["name", "description"];
export const brandSortableFields = [
  "id",
  "name",
  "slug",
  "description",
  "created_at",
  "updated_at",
];

export const brandFieldsValidationConfig: Record<string, any> = {
  sort_by: brandSortableFields,
  sort_order: sortOrderType,
};
