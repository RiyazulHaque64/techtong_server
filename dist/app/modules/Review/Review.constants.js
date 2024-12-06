"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewFieldsValidationConfig = exports.reviewSelectedFields = exports.reviewSortableFields = void 0;
const common_1 = require("../../constants/common");
exports.reviewSortableFields = [
    "rating",
    "comment",
    "created_at",
    "updated_at",
];
exports.reviewSelectedFields = {
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
exports.reviewFieldsValidationConfig = {
    sort_by: exports.reviewSortableFields,
    sort_order: common_1.sortOrderType,
};
