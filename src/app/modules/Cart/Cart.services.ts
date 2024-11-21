import httpStatus from "http-status";
import ApiError from "../../error/ApiError";
import { TAuthUser } from "../../interfaces/common";
import prisma from "../../shared/prisma";
import { TAddToCartPayload, TCartItem } from "./Cart.interfaces";
import { UserRole } from "@prisma/client";

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
      is_deleted: false,
    },
    select: {
      id: true,
      price: true,
      retailer_price: true,
      discount_price: true,
    },
  });

  let price;
  switch (user.role) {
    case UserRole.SUPER_ADMIN:
      price = product.retailer_price || product.discount_price || product.price;
      break;
    case UserRole.ADMIN:
      price = product.retailer_price || product.discount_price || product.price;
      break;
    case UserRole.RETAILER:
      price = product.retailer_price || product.discount_price || product.price;
      break;
    default:
      price = product.discount_price || product.price;
      break;
  }

  const result = await prisma.$transaction(async (tx) => {
    const cart = await tx.cart.upsert({
      where: {
        user_id: user.id,
      },
      create: {
        user_id: user.id,
      },
      update: {},
    });

    let cartItem = await tx.cartItem.upsert({
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
        price,
      },
      update: {
        quantity: {
          increment: payload.quantity,
        },
      },
    });

    return cartItem;
  });

  return result;
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

const updateCartItem = async (id: string, payload: { quantity: number }) => {
  if (payload.quantity === undefined || payload.quantity <= 0) {
    await prisma.cartItem.delete({
      where: {
        id,
      },
    });
    return null;
  }

  const cartItem = await prisma.cartItem.update({
    where: {
      id,
    },
    data: {
      quantity: payload.quantity,
    },
  });

  return cartItem;
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

export const CartServices = {
  addToCart,
  getCart,
  deleteToCart,
  updateCartItem,
};
