import { DeliveryMethod, PaymentMethod } from "@prisma/client";

export type TCreateOrderForRegisteredUser = {
  customer_information: {
    name?: string;
    email?: string;
    contact_number?: string;
    address: string;
    city: string;
  };
  payment_method?: PaymentMethod;
  delivery_method?: DeliveryMethod;
  coupon_code?: string;
  comment?: string;
};

export type TCreateOrderForGuestUser = {
  customer_information: {
    name: string;
    email?: string;
    contact_number: string;
    address: string;
    city: string;
  };
  order_items: TOrderItem[];
  payment_method?: PaymentMethod;
  delivery_method?: DeliveryMethod;
  coupon_id?: string;
  comment?: string;
};

export type TOrderItem = {
  product_id: string;
  quantity: number;
};
