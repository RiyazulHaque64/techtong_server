export const HOME_DELIVERY_CHARGE: number = 65;

export const OrderSelectedFieldsForRegisteredUser = {
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
      product_id: true,
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
};
