import { sortOrderType } from "../../constants/common";

export const courierSearchableFields = ["name", "address", "email", "contact_number"];
export const courierSortableFields = [
    "id",
    "name",
    "created_at"
];

export const courierFieldsValidationConfig: Record<string, any> = {
    sort_by: courierSortableFields,
    sort_order: sortOrderType,
};