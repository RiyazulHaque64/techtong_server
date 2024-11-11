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

  let cart = await prisma.cart.findFirst({
    where: {
      user_id: user.id,
    },
  });
  if (!cart) {
    cart = await prisma.cart.create({
      data: {
        user_id: user.id,
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

  const cartItem = await prisma.cartItem.findUniqueOrThrow({
    where: {
      id: cartItemId,
    },
    include: {
      cart: true,
    },
  });

  if (cartItem.cart.user_id !== user.id) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Cart item not found");
  }

  await prisma.cartItem.delete({
    where: {
      id: cartItemId,
    },
  });

  return null;
};

export const CartServices = { addToCart, getCart, deleteToCart };
