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

  let cart = await prisma.cart.findFirst({
    where: {
      user_id: user?.id,
    },
  });
  if (!cart) {
    cart = await prisma.cart.create({
      data: {
        user_id: user?.id,
      },
    });
  }

  if (payload.quantity === 0 || (payload.quantity && payload.quantity < 0)) {
    await prisma.cartItem.deleteMany({
      where: {
        cart_id: cart.id,
        product_id: product.id,
      },
    });
    return null;
  }

  let cartItem = await prisma.cartItem.findFirst({
    where: {
      cart_id: cart.id,
      product_id: product.id,
    },
  });
  if (cartItem) {
    cartItem = await prisma.cartItem.update({
      where: {
        id: cartItem.id,
      },
      data: {
        quantity: payload.quantity,
      },
    });
  } else {
    cartItem = await prisma.cartItem.create({
      data: {
        cart_id: cart.id,
        product_id: product.id,
        quantity: payload.quantity,
        price: product.price,
      },
    });
  }
  return cartItem;
};

export const CartServices = { addToCart };
