import { Coupon, DeliveryMethod, PaymentMethod } from "@prisma/client";
import { TAuthUser } from "../../interfaces/common";
import prisma from "../../shared/prisma";
import {
  TCreateOrderForGuestUser,
  TCreateOrderForRegisteredUser,
  TOrderItem,
} from "./Order.interfaces";
import {
  HOME_DELIVERY_CHARGE,
  OrderSelectedFieldsForRegisteredUser,
} from "./Order.constants";
import ApiError from "../../error/ApiError";
import httpStatus from "http-status";
import { userSelectedFields } from "../User/User.constants";
import { CouponServices } from "../Coupon/Coupon.services";
import { TApplyCouponResponse } from "../Coupon/Coupon.interfaces";

const createOrderForRegisteredUser = async (
  user: TAuthUser | undefined,
  data: TCreateOrderForRegisteredUser
) => {
  const {
    customer_information,
    coupon_code,
    delivery_method,
    payment_method,
    comment,
  } = data;

  const { cart, orders, ...userInfo } = await prisma.user.findUniqueOrThrow({
    where: {
      id: user?.id,
    },
    include: {
      cart: {
        include: {
          cart_items: true,
        },
      },
      orders: true,
    },
  });

  const userType = orders?.length > 0 ? "EXISTING" : "NEW";

  if (!cart || (cart && cart.cart_items.length === 0)) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "No product found to create order"
    );
  }

  const contactNumber =
    customer_information.contact_number || userInfo.contact_number;

  const orderItems = cart.cart_items.map((item) => ({
    product_id: item.product_id,
    quantity: item.quantity,
    price: item.price,
  }));

  const subAmount = orderItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  let discountAmount = 0;
  let coupon: TApplyCouponResponse | null = null;

  if (coupon_code) {
    coupon = await CouponServices.applyCoupon({
      code: coupon_code,
      contact_number: contactNumber,
      order_amount: subAmount,
      product_amount: orderItems.length,
      customer_type: userType,
    });
    discountAmount = coupon.discount_amount;
  }

  const totalAmount = subAmount - discountAmount;
  const deliveryCharge =
    delivery_method === DeliveryMethod.STORE_PICKUP ? 0 : HOME_DELIVERY_CHARGE;
  const payableAmount = totalAmount + deliveryCharge;

  const customerInfo = {
    name: customer_information.name || userInfo.name,
    email: customer_information.email || userInfo.email,
    contact_number:
      customer_information.contact_number || userInfo.contact_number,
    address: customer_information.address,
    city: customer_information.city,
    coupon_id: coupon?.id || null,
  };

  const orderInfo = {
    user_id: user?.id as string,
    payment_method: payment_method || PaymentMethod.CASH_ON_DELIVERY,
    delivery_method: delivery_method || DeliveryMethod.HOME_DELIVERY,
    delivery_charge: deliveryCharge,
    discount_amount: discountAmount,
    sub_amount: subAmount,
    total_amount: totalAmount,
    payable_amount: payableAmount,
    coupon_id: coupon?.id || null,
    comment: comment || null,
  };

  const result = await prisma.$transaction(async (tx) => {
    const customerInformation = await tx.customerInfo.upsert({
      where: {
        contact_number: customerInfo.contact_number,
      },
      create: customerInfo,
      update: {
        address: customerInfo.address,
        city: customerInfo.city,
      },
    });

    const order = await tx.order.create({
      data: {
        ...orderInfo,
        customer_info_id: customerInformation.id,
        order_items: {
          create: orderItems,
        },
      },
      select: {
        id: true,
        payment_method: true,
        delivery_method: true,
        delivery_charge: true,
        discount_amount: true,
        sub_amount: true,
        total_amount: true,
        payable_amount: true,
        payment_status: true,
        order_status: true,
        comment: true,
        order_items: {
          select: {
            product: {
              select: {
                name: true,
              },
            },
            quantity: true,
            price: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            contact_number: true,
          },
        },
        customer_info: {
          select: {
            name: true,
            contact_number: true,
            email: true,
            address: true,
            city: true,
          },
        },
        coupon: {
          select: {
            code: true,
            discount_value: true,
          },
        },
      },
    });

    if (order?.coupon?.code) {
      await tx.coupon.update({
        where: {
          code: order.coupon.code,
        },
        data: {
          used_count: {
            increment: 1,
          },
        },
      });
    }

    await tx.cartItem.deleteMany({
      where: {
        cart_id: cart.id,
      },
    });

    return order;
  });

  return result;
};

const createOrderForGuestUser = async (data: TCreateOrderForGuestUser) => {
  const {
    customer_information,
    order_items,
    coupon_id,
    delivery_method,
    payment_method,
    comment,
  } = data;

  const productIds = order_items.map((item: TOrderItem) => item.product_id);

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
  });

  if (products.length === 0) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "No product found to create order"
    );
  }

  let coupon: Coupon | null;
  let discountAmount = 0;
  if (coupon_id) {
    coupon = await prisma.coupon.findUniqueOrThrow({
      where: {
        id: coupon_id,
      },
    });
    discountAmount = coupon.discount_value;
  }

  const itemsToCreateOrder = products.map((product) => {
    const item = order_items.find((item) => item.product_id === product.id);
    return {
      product_id: product.id,
      quantity: item?.quantity || 1,
      price: product.price,
    };
  });
  const subAmount = itemsToCreateOrder.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const totalAmount = subAmount - discountAmount;
  const deliveryCharge =
    delivery_method === DeliveryMethod.STORE_PICKUP ? 0 : HOME_DELIVERY_CHARGE;
  const payableAmount = totalAmount + deliveryCharge;

  const customerInfo = {
    name: customer_information.name,
    email: customer_information.email || null,
    contact_number: customer_information.contact_number,
    address: customer_information.address,
    city: customer_information.city,
  };

  const orderInfo = {
    payment_method: payment_method || PaymentMethod.CASH_ON_DELIVERY,
    delivery_method: delivery_method || DeliveryMethod.HOME_DELIVERY,
    delivery_charge: deliveryCharge,
    discount_amount: discountAmount,
    sub_amount: subAmount,
    total_amount: totalAmount,
    payable_amount: payableAmount,
    coupon_id: coupon_id || null,
    comment: comment || null,
  };

  const result = await prisma.$transaction(async (tx) => {
    const customerInformation = await tx.customerInfo.upsert({
      where: {
        contact_number: customerInfo.contact_number,
      },
      create: customerInfo,
      update: {
        address: customerInfo.address,
        city: customerInfo.city,
      },
    });

    const order = await tx.order.create({
      data: {
        ...orderInfo,
        customer_info_id: customerInformation.id,
        order_items: {
          create: itemsToCreateOrder,
        },
      },
      include: {
        user: {
          select: {
            ...userSelectedFields,
          },
        },
        customer_info: true,
        order_items: true,
        coupon: true,
      },
    });

    return order;
  });

  return result;
};

export const OrderServices = {
  createOrderForRegisteredUser,
  createOrderForGuestUser,
};
