export type TAddToCartPayload = {
  product_id: string;
  quantity?: number;
};

export type TCartItem = {
  id: string;
  cart_id: string;
  product_id: string;
  quantity: number;
  price: number;
};
