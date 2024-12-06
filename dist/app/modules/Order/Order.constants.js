"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allowedTransitions = exports.orderFieldsValidationConfig = exports.orderSelectedFields = exports.HOME_DELIVERY_CHARGE = exports.orderFilterableFields = exports.orderSearchableFieldsWithCustomerInfo = exports.orderSearchableFields = exports.orderSortableFields = void 0;
const client_1 = require("@prisma/client");
const common_1 = require("../../constants/common");
exports.orderSortableFields = [
    "id",
    "payment_method",
    "delivery_method",
    "order_status",
    "payment_status",
    "delivery_charge",
    "discount_amount",
    "sub_amount",
    "total_amount",
    "payable_amount",
    "created_at",
    "updated_at",
];
exports.orderSearchableFields = ["comment"];
exports.orderSearchableFieldsWithCustomerInfo = [
    "name",
    "email",
    "contact_number",
    "address",
    "city",
];
exports.orderFilterableFields = [
    "payment_method",
    "delivery_method",
    "order_status",
    "payment_status",
    "min_order_amount",
    "max_order_amount",
    "searchTerm",
    "page",
    "limit",
    "sortBy",
    "sortOrder",
];
exports.HOME_DELIVERY_CHARGE = 65;
exports.orderSelectedFields = {
    id: true,
    payment_method: true,
    delivery_method: true,
    delivery_charge: true,
    discount_amount: true,
    sub_amount: true,
    total_amount: true,
    payable_amount: true,
    payment_status: true,
    order_status: true,
    comment: true,
    order_items: {
        select: {
            product: {
                select: {
                    name: true,
                },
            },
            quantity: true,
            price: true,
        },
    },
    user: {
        select: {
            id: true,
            name: true,
            email: true,
            contact_number: true,
        },
    },
    customer_info: {
        select: {
            name: true,
            contact_number: true,
            email: true,
            address: true,
            city: true,
        },
    },
    coupon: {
        select: {
            code: true,
            discount_value: true,
        },
    },
    created_at: true,
    updated_at: true,
};
exports.orderFieldsValidationConfig = {
    payment_method: Object.values(client_1.PaymentMethod),
    delivery_method: Object.values(client_1.DeliveryMethod),
    order_status: Object.values(client_1.OrderStatus),
    payment_status: Object.values(client_1.PaymentStatus),
    sort_by: exports.orderSortableFields,
    sort_order: common_1.sortOrderType,
};
exports.allowedTransitions = {
    PENDING: ["PROCESSING", "CANCELLED"],
    PROCESSING: ["SHIPPED", "CANCELLED"],
    SHIPPED: ["DELIVERED", "CANCELLED"],
    DELIVERED: [],
    CANCELLED: [],
};
