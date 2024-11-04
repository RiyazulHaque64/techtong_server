import { TAuthUser } from "../../interfaces/common";
import prisma from "../../shared/prisma";
import { TAddToCartPayload } from "./Cart.interfaces";

const addToCart = async (
  user: TAuthUser | undefined,
  payload: TAddToCartPayload
) => {
  const product = await prisma.product.findUniqueOrThrow({
    where: {
      id: payload.product_id,
    },
  });
  return payload;
};

export const CartServices = { addToCart };
