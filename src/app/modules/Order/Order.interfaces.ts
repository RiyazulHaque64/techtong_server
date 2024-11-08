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
  coupon_id?: string;
  comment?: string;
};
