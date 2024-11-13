import httpStatus from "http-status";
import ApiError from "../../error/ApiError";
import { TAuthUser } from "../../interfaces/common";
import prisma from "../../shared/prisma";
import { TAddToCartPayload, TCartItem } from "./Cart.interfaces";

const addToCart = async (
  user: TAuthUser | undefined,
  payload: TAddToCartPayload
) => {
  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized");
  }
  const product = await prisma.product.findUniqueOrThrow({
    where: {
      id: payload.product_id,
    },
  });

  if (payload.quantity === undefined || payload.quantity <= 0) {
    await prisma.cartItem.deleteMany({
      where: {
        cart: {
          user_id: user.id,
        },
        product_id: product.id,
      },
    });
    return null;
  }

  const cart = await prisma.cart.upsert({
    where: {
      user_id: user.id,
    },
    create: {
      user_id: user.id,
    },
    update: {},
  });

  let cartItem = await prisma.cartItem.upsert({
    where: {
      cart_id_product_id: {
        cart_id: cart.id,
        product_id: product.id,
      },
    },
    create: {
      cart_id: cart.id,
      product_id: product.id,
      quantity: payload.quantity,
      price: product.price,
    },
    update: {
      quantity: payload.quantity,
    },
  });

  return cartItem;
};

const getCart = async (user: TAuthUser | undefined) => {
  if (!user)
    throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized");

  const cart = await prisma.cart.findUniqueOrThrow({
    where: {
      user_id: user.id,
    },
    include: {
      cart_items: true,
    },
  });

  const cartItemsWithTotal = cart?.cart_items.map((item: TCartItem) => ({
    ...item,
    total: item.quantity * item.price,
  }));

  const cartTotal = cartItemsWithTotal.reduce(
    (acc: number, item: TCartItem & { total: number }) => acc + item.total,
    0
  );

  return {
    ...cart,
    cart_total: cartTotal,
    cart_items: cartItemsWithTotal,
  };
};

const deleteToCart = async (
  user: TAuthUser | undefined,
  cartItemId: string
) => {
  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized");
  }

  await prisma.cartItem.delete({
    where: {
      id: cartItemId,
      cart: {
        user_id: user.id,
      },
    },
  });

  return null;
};

export const CartServices = { addToCart, getCart, deleteToCart };
