import prisma from "../../shared/prisma";
import { generateSlug } from "../../utils/generateSlug";
import { IProductPayload } from "./Product.interfaces";

const addProduct = async (payload: IProductPayload) => {
  payload.slug = generateSlug(payload.name);
  const result = await prisma.product.create({
    data: payload,
    include: { brand: true, category: true },
  });
  return result;
};

const updateProduct = async (id: string, payload: IProductPayload) => {
  if (payload.name) {
    payload.slug = generateSlug(payload.name);
  }
  const result = await prisma.product.update({
    where: {
      id,
    },
    data: payload,
    include: { brand: true, category: true },
  });
  return result;
};

export const ProductServices = {
  addProduct,
  updateProduct,
};
