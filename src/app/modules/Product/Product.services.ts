import { IAddProductPayload } from "./Product.interfaces";

const addProduct = async (payload: IAddProductPayload) => {
  console.log(payload);
  return payload;
};

export const ProductServices = {
  addProduct,
};
