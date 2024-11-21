import { DeliveryMethod, PaymentMethod, Prisma } from "@prisma/client";
import { TAuthUser } from "../../interfaces/common";
import prisma from "../../shared/prisma";
import {
  TCreateOrderForGuestUser,
  TCreateOrderForRegisteredUser,
  TOrderItem,
  TUpdateOrderByAdminPayload,
} from "./Order.interfaces";
import {
  allowedTransitions,
  HOME_DELIVERY_CHARGE,
  orderFieldsValidationConfig,
  orderSearchableFields,
  orderSearchableFieldsWithCustomerInfo,
  orderSelectedFields,
} from "./Order.constants";
import ApiError from "../../error/ApiError";
import httpStatus from "http-status";
import { CouponServices } from "../Coupon/Coupon.services";
import { TApplyCouponResponse } from "../Coupon/Coupon.interfaces";
import validateQueryFields from "../../utils/validateQueryFields";
import pagination from "../../utils/pagination";
import addFilter from "../../utils/addFilter";

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
        ...orderSelectedFields,
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
    coupon_code,
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

  let discountAmount = 0;
  let coupon: TApplyCouponResponse | null = null;

  if (coupon_code) {
    coupon = await CouponServices.applyCoupon({
      code: coupon_code,
      contact_number: customer_information.contact_number,
      order_amount: subAmount,
      product_amount: itemsToCreateOrder.length,
      customer_type: "GUEST",
    });
    discountAmount = coupon.discount_amount;
  }

  const totalAmount = subAmount - discountAmount;
  const deliveryCharge =
    delivery_method === DeliveryMethod.STORE_PICKUP ? 0 : HOME_DELIVERY_CHARGE;
  const payableAmount = totalAmount + deliveryCharge;

  const customerInfo = {
    name: customer_information.name,
    email: customer_information.email,
    contact_number: customer_information.contact_number,
    address: customer_information.address,
    city: customer_information.city,
    coupon_id: coupon?.id || null,
  };

  const orderInfo = {
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
          create: itemsToCreateOrder,
        },
      },
      select: {
        ...orderSelectedFields,
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

    return order;
  });

  return result;
};

const getOrders = async (query: Record<string, any>) => {
  const {
    searchTerm,
    page,
    limit,
    sortBy,
    sortOrder,
    min_order_amount,
    max_order_amount,
    ...remainingQuery
  } = query;

  if (sortBy)
    validateQueryFields(orderFieldsValidationConfig, "sort_by", sortBy);
  if (sortOrder)
    validateQueryFields(orderFieldsValidationConfig, "sort_order", sortOrder);

  const { pageNumber, limitNumber, skip, sortWith, sortSequence } = pagination({
    page,
    limit,
    sortBy,
    sortOrder,
  });

  const andConditions: Prisma.OrderWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: [
        ...orderSearchableFields.map((field) => ({
          [field]: {
            contains: searchTerm,
            mode: "insensitive",
          },
        })),
        {
          customer_info: {
            OR: orderSearchableFieldsWithCustomerInfo.map((field) => ({
              [field]: {
                contains: searchTerm,
                mode: "insensitive",
              },
            })),
          },
        },
        {
          order_items: {
            some: {
              product: {
                name: {
                  contains: searchTerm,
                  mode: "insensitive",
                },
              },
            },
          },
        },
        {
          coupon: {
            code: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
        },
      ],
    });
  }

  if (Object.keys(remainingQuery).length) {
    for (const [key, value] of Object.entries(remainingQuery)) {
      validateQueryFields(orderFieldsValidationConfig, key, value);
      andConditions.push({
        [key]: value === "true" ? true : value === "false" ? false : value,
      });
    }
  }

  addFilter(andConditions, "total_amount", "gte", Number(min_order_amount));
  addFilter(andConditions, "total_amount", "lte", Number(max_order_amount));

  const whereConditions = {
    AND: andConditions,
  };

  const [result, total] = await Promise.all([
    prisma.order.findMany({
      where: whereConditions,
      skip: skip,
      take: limitNumber,
      orderBy: {
        [sortWith]: sortSequence,
      },
      select: {
        ...orderSelectedFields,
      },
    }),
    prisma.order.count({ where: whereConditions }),
  ]);

  return {
    meta: {
      page: pageNumber,
      limit: limitNumber,
      total,
    },
    data: result,
  };
};

const myOrder = async (
  user: TAuthUser | undefined,
  query: Record<string, any>
) => {
  const {
    searchTerm,
    page,
    limit,
    sortBy,
    sortOrder,
    min_order_amount,
    max_order_amount,
    ...remainingQuery
  } = query;

  if (sortBy)
    validateQueryFields(orderFieldsValidationConfig, "sort_by", sortBy);
  if (sortOrder)
    validateQueryFields(orderFieldsValidationConfig, "sort_order", sortOrder);

  const { pageNumber, limitNumber, skip, sortWith, sortSequence } = pagination({
    page,
    limit,
    sortBy,
    sortOrder,
  });

  console.log(user?.id);

  const andConditions: Prisma.OrderWhereInput[] = [{ user_id: user?.id }];

  if (searchTerm) {
    andConditions.push({
      OR: [
        ...orderSearchableFields.map((field) => ({
          [field]: {
            contains: searchTerm,
            mode: "insensitive",
          },
        })),
        {
          customer_info: {
            OR: orderSearchableFieldsWithCustomerInfo.map((field) => ({
              [field]: {
                contains: searchTerm,
                mode: "insensitive",
              },
            })),
          },
        },
        {
          order_items: {
            some: {
              product: {
                name: {
                  contains: searchTerm,
                  mode: "insensitive",
                },
              },
            },
          },
        },
        {
          coupon: {
            code: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
        },
      ],
    });
  }

  if (Object.keys(remainingQuery).length) {
    for (const [key, value] of Object.entries(remainingQuery)) {
      validateQueryFields(orderFieldsValidationConfig, key, value);
      andConditions.push({
        [key]: value === "true" ? true : value === "false" ? false : value,
      });
    }
  }

  addFilter(andConditions, "total_amount", "gte", Number(min_order_amount));
  addFilter(andConditions, "total_amount", "lte", Number(max_order_amount));

  const whereConditions = {
    AND: andConditions,
  };

  const [result, total] = await Promise.all([
    prisma.order.findMany({
      where: whereConditions,
      skip: skip,
      take: limitNumber,
      orderBy: {
        [sortWith]: sortSequence,
      },
      select: {
        ...orderSelectedFields,
      },
    }),
    prisma.order.count({ where: whereConditions }),
  ]);

  return {
    meta: {
      page: pageNumber,
      limit: limitNumber,
      total,
    },
    data: result,
  };
};

const updateOrderByAdmin = async (
  id: string,
  payload: TUpdateOrderByAdminPayload
) => {
  const order = await prisma.order.findUniqueOrThrow({
    where: {
      id,
    },
    select: {
      order_status: true,
      payment_status: true,
    },
  });

  // Check if the status transition is valid
  const currentOrderStatus = order.order_status;
  const newOrderStatus = payload.order_status;
  if (
    newOrderStatus &&
    !allowedTransitions[currentOrderStatus].includes(newOrderStatus)
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `Invalid status transition from ${currentOrderStatus} to ${newOrderStatus}`
    );
  }

  // Check payment status to deliver an order
  if (
    newOrderStatus === "DELIVERED" &&
    order.payment_status === "DUE" &&
    payload.payment_status !== "PAID"
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `Cannot deliver an order without payment`
    );
  }

  // Check payment status update after order is delivered
  if (
    (currentOrderStatus === "DELIVERED" || newOrderStatus === "DELIVERED") &&
    payload.payment_status === "DUE"
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `Cannot transition from PAID to DUE after order is delivered`
    );
  }

  if (order.payment_status === "PAID" && payload.payment_method) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `Cannot update payment method after the payment is completed`
    );
  }

  const result = await prisma.order.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

export const OrderServices = {
  createOrderForRegisteredUser,
  createOrderForGuestUser,
  getOrders,
  myOrder,
  updateOrderByAdmin,
};
