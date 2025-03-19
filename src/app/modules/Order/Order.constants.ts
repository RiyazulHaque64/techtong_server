import {
  DeliveryMethod,
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
} from "@prisma/client";
import { sortOrderType } from "../../constants/common";

export const orderSortableFields = [
  "id",
  "order_id",
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

export const orderSearchableFields = ["comment", "order_id"];
export const orderSearchableFieldsWithCustomerInfo = [
  "name",
  "email",
  "contact_number",
  "address",
  "city",
];

export const orderFilterableFields = [
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

export const HOME_DELIVERY_CHARGE: number = 65;

export const orderSelectedFields = {
  id: true,
  order_id: true,
  payment_method: true,
  delivery_method: true,
  delivery_charge: true,
  discount_amount: true,
  sub_amount: true,
  total_amount: true,
  payable_amount: true,
  tax: true,
  percentage_of_tax: true,
  payment_status: true,
  order_status: true,
  comment: true,
  order_items: {
    select: {
      product: {
        select: {
          name: true,
          thumbnail: true,
          code: true
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
      profile_pic: true,
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

export const orderFieldsValidationConfig: Record<string, any> = {
  payment_method: Object.values(PaymentMethod),
  delivery_method: Object.values(DeliveryMethod),
  order_status: Object.values(OrderStatus),
  payment_status: Object.values(PaymentStatus),
  sort_by: orderSortableFields,
  sort_order: sortOrderType,
};

export const allowedTransitions: Record<OrderStatus, OrderStatus[]> = {
  PENDING: ["CONFIRMED", "CANCELLED"],
  CONFIRMED: ["PROCESSING", "CANCELLED", "REFUNDED"],
  PROCESSING: ["SHIPPED", "CANCELLED", "REFUNDED"],
  SHIPPED: ["DELIVERED", "CANCELLED", "REFUNDED"],
  DELIVERED: [],
  CANCELLED: [],
  REFUNDED: [],
};
