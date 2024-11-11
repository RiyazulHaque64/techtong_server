import { sortOrderType } from "../../constants/common";

export const categorySearchableFields = ["title", "description"];
export const categorySortableFields = [
  "id",
  "title",
  "slug",
  "description",
  "created_at",
  "updated_at",
];

export const categoryFieldsValidationConfig: Record<string, any> = {
  sort_by: categorySortableFields,
  sort_order: sortOrderType,
};
