"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categorySelectFieldsWithProduct = exports.brandSelectFieldsWithProduct = exports.productFieldsValidationConfig = exports.productSearchableFields = exports.productSortableFields = void 0;
const common_1 = require("../../constants/common");
exports.productSortableFields = [
    "name",
    "price",
    "discount_price",
    "retailer_price",
    "stock",
    "created_at",
    "updated_at",
];
exports.productSearchableFields = ["name", "model", "code", "description"];
exports.productFieldsValidationConfig = {
    sort_by: exports.productSortableFields,
    sort_order: common_1.sortOrderType,
};
exports.brandSelectFieldsWithProduct = {
    id: true,
    name: true,
    slug: true,
    icon: true,
};
exports.categorySelectFieldsWithProduct = {
    id: true,
    title: true,
    slug: true,
    icon: true,
};
