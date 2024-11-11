import { sortOrderType } from "../../constants/common";

export const imageSearchableFields = ["name"];
export const imageSortableFields = ["id", "name", "created_at", "updated_at"];

export const imageFieldsValidationConfig: Record<string, any> = {
  sort_by: imageSortableFields,
  sort_order: sortOrderType,
};
