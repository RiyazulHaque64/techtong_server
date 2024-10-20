export interface IAddProductPayload {
  name: string;
  model: string;
  description?: string;
  specification: {
    heading: string;
    fields: {
      title: string;
      value: string[];
    }[];
  }[];
  additional_information?: string;
  key_features?: string[];
  brand_id: string;
  category_id: string;
  type?: string;
  tags?: string[];
  code: string;
  stock?: number;
  price: number;
  discount_price?: number;
  retailer_price?: number;
  thumbnail?: string;
  images?: string[];
}
