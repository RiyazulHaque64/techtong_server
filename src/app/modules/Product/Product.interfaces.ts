export interface IProductPayload {
  name: string;
  model: string;
  slug: string;
  brand_id?: string;
  tags?: string[];
  code?: string;
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
  video_url?: string;
  attributes: [{ title: string; value: string[] }];
  categories: [{ id: string }];
}
