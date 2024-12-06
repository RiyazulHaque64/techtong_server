"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryFieldsValidationConfig = exports.categorySortableFields = exports.categorySearchableFields = void 0;
const common_1 = require("../../constants/common");
exports.categorySearchableFields = ["title", "description"];
exports.categorySortableFields = [
    "id",
    "title",
    "slug",
    "description",
    "created_at",
    "updated_at",
];
exports.categoryFieldsValidationConfig = {
    sort_by: exports.categorySortableFields,
    sort_order: common_1.sortOrderType,
};
