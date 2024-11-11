import { sortOrderType } from "../../constants/common";

export const attributeSortableFields = ["name", "category"];

export const attributeSearchableFields = ["name"];

export const attributeFieldsValidationConfig = {
  sort_by: attributeSortableFields,
  sort_order: sortOrderType,
};
