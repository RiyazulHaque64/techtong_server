"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.couponFieldsValidationConfig = exports.couponFilterableFields = exports.couponSearchableFields = exports.couponSortableFields = void 0;
const client_1 = require("@prisma/client");
const common_1 = require("../../constants/common");
exports.couponSortableFields = [
    "id",
    "code",
    "discount_type",
    "discount_value",
    "maximum_value",
    "expiration_date",
    "usage_limit",
    "per_user_limit",
    "min_order_amount",
    "min_product_amount",
    "beneficiary_type",
    "is_active",
    "created_at",
    "updated_at",
];
exports.couponSearchableFields = ["code"];
exports.couponFilterableFields = [
    "discount_type",
    "beneficiary_type",
    "is_active",
    "minValue",
    "maxValue",
    "searchTerm",
    "page",
    "limit",
    "sortBy",
    "sortOrder",
];
exports.couponFieldsValidationConfig = {
    discount_type: Object.values(client_1.DiscountType),
    beneficiary_type: Object.values(client_1.BeneficiaryType),
    is_active: ["true", "false"],
    sort_by: exports.couponSortableFields,
    sort_order: common_1.sortOrderType,
};
