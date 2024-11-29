import { sortOrderType } from "../../constants/common";

export const reviewSortableFields = [
  "rating",
  "comment",
  "created_at",
  "updated_at",
];

export const reviewSelectedFields = {
  id: true,
  rating: true,
  comment: true,
  user: {
    select: {
      name: true,
      email: true,
      contact_number: true,
      role: true,
    },
  },
  product: {
    select: {
      name: true,
    },
  },
  created_at: true,
  updated_at: true,
};

export const reviewFieldsValidationConfig: Record<string, any> = {
  sort_by: reviewSortableFields,
  sort_order: sortOrderType,
};
