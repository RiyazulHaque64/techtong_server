"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.brandFieldsValidationConfig = exports.brandSortableFields = exports.brandSearchableFields = void 0;
const common_1 = require("../../constants/common");
exports.brandSearchableFields = ["name", "description"];
exports.brandSortableFields = [
    "id",
    "name",
    "slug",
    "description",
    "created_at",
    "updated_at",
];
exports.brandFieldsValidationConfig = {
    sort_by: exports.brandSortableFields,
    sort_order: common_1.sortOrderType,
};
