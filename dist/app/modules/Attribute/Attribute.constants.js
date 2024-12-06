"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attributeFieldsValidationConfig = exports.attributeSearchableFields = exports.attributeSortableFields = void 0;
const common_1 = require("../../constants/common");
exports.attributeSortableFields = ["name", "category"];
exports.attributeSearchableFields = ["name"];
exports.attributeFieldsValidationConfig = {
    sort_by: exports.attributeSortableFields,
    sort_order: common_1.sortOrderType,
};
