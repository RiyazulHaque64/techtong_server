export interface IProductPayload {
  name: string;
  model: string;
  slug: string;
  brand_id?: string;
  category_id?: string;
  tags?: string[];
  code: string;
  stock?: number;
  price: number;
  discount_price?: number;
  retailer_price?: number;
  thumbnail?: string;
  images?: string[];
  description?: string;
  specification?: string;
  additional_information?: string;
  key_features?: string[];
  attributes?: [{ name: string; value: string }];
}
