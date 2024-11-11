import { sortOrderType } from "../../constants/common";

export const addressSearchableFields = [
  "address",
  "email",
  "contact_number",
  "city",
];

export const addressSortableFields = [
  "id",
  "address",
  "email",
  "contact_number",
  "city",
];

export const addressFilterableFields = [
  "searchTerm",
  "page",
  "limit",
  "sortBy",
  "sortOrder",
  "city",
  "contact_number",
  "email",
];

export const userSelectedFieldsWithAddress = {
  name: true,
  email: true,
  contact_number: true,
  status: true,
  role: true,
};

export const addressFieldsValidationConfig: Record<string, any> = {
  sort_by: addressSortableFields,
  sort_order: sortOrderType,
};
