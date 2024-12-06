"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressFieldsValidationConfig = exports.userSelectedFieldsWithAddress = exports.addressFilterableFields = exports.addressSortableFields = exports.addressSearchableFields = void 0;
const common_1 = require("../../constants/common");
exports.addressSearchableFields = [
    "address",
    "email",
    "contact_number",
    "city",
];
exports.addressSortableFields = [
    "id",
    "address",
    "email",
    "contact_number",
    "city",
];
exports.addressFilterableFields = [
    "searchTerm",
    "page",
    "limit",
    "sortBy",
    "sortOrder",
    "city",
    "contact_number",
    "email",
];
exports.userSelectedFieldsWithAddress = {
    name: true,
    email: true,
    contact_number: true,
    status: true,
    role: true,
};
exports.addressFieldsValidationConfig = {
    sort_by: exports.addressSortableFields,
    sort_order: common_1.sortOrderType,
};
