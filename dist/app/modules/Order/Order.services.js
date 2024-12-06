"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderServices = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../shared/prisma"));
const Order_constants_1 = require("./Order.constants");
const ApiError_1 = __importDefault(require("../../error/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const Coupon_services_1 = require("../Coupon/Coupon.services");
const validateQueryFields_1 = __importDefault(require("../../utils/validateQueryFields"));
const pagination_1 = __importDefault(require("../../utils/pagination"));
const addFilter_1 = __importDefault(require("../../utils/addFilter"));
const createOrderForRegisteredUser = (user, data) => __awaiter(void 0, void 0, void 0, function* () {
    const { customer_information, coupon_code, delivery_method, payment_method, comment, } = data;
    const _a = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: user === null || user === void 0 ? void 0 : user.id,
        },
        include: {
            cart: {
                include: {
                    cart_items: true,
                },
            },
            orders: true,
        },
    }), { cart, orders } = _a, userInfo = __rest(_a, ["cart", "orders"]);
    const userType = (orders === null || orders === void 0 ? void 0 : orders.length) > 0 ? "EXISTING" : "NEW";
    if (!cart || (cart && cart.cart_items.length === 0)) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "No product found to create order");
    }
    const contactNumber = customer_information.contact_number || userInfo.contact_number;
    const orderItems = cart.cart_items.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price,
    }));
    const subAmount = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    let discountAmount = 0;
    let coupon = null;
    if (coupon_code) {
        coupon = yield Coupon_services_1.CouponServices.applyCoupon({
            code: coupon_code,
            contact_number: contactNumber,
            order_amount: subAmount,
            product_amount: orderItems.length,
            customer_type: userType,
        });
        discountAmount = coupon.discount_amount;
    }
    const totalAmount = subAmount - discountAmount;
    const deliveryCharge = delivery_method === client_1.DeliveryMethod.STORE_PICKUP ? 0 : Order_constants_1.HOME_DELIVERY_CHARGE;
    const payableAmount = totalAmount + deliveryCharge;
    const customerInfo = {
        name: customer_information.name || userInfo.name,
        email: customer_information.email || userInfo.email,
        contact_number: customer_information.contact_number || userInfo.contact_number,
        address: customer_information.address,
        city: customer_information.city,
        coupon_id: (coupon === null || coupon === void 0 ? void 0 : coupon.id) || null,
    };
    const orderInfo = {
        user_id: user === null || user === void 0 ? void 0 : user.id,
        payment_method: payment_method || client_1.PaymentMethod.CASH_ON_DELIVERY,
        delivery_method: delivery_method || client_1.DeliveryMethod.HOME_DELIVERY,
        delivery_charge: deliveryCharge,
        discount_amount: discountAmount,
        sub_amount: subAmount,
        total_amount: totalAmount,
        payable_amount: payableAmount,
        coupon_id: (coupon === null || coupon === void 0 ? void 0 : coupon.id) || null,
        comment: comment || null,
    };
    const result = yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        var _b;
        const customerInformation = yield tx.customerInfo.upsert({
            where: {
                contact_number: customerInfo.contact_number,
            },
            create: customerInfo,
            update: {
                address: customerInfo.address,
                city: customerInfo.city,
            },
        });
        const order = yield tx.order.create({
            data: Object.assign(Object.assign({}, orderInfo), { customer_info_id: customerInformation.id, order_items: {
                    create: orderItems,
                } }),
            select: Object.assign({}, Order_constants_1.orderSelectedFields),
        });
        if ((_b = order === null || order === void 0 ? void 0 : order.coupon) === null || _b === void 0 ? void 0 : _b.code) {
            yield tx.coupon.update({
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
        yield tx.cartItem.deleteMany({
            where: {
                cart_id: cart.id,
            },
        });
        return order;
    }));
    return result;
});
const createOrderForGuestUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { customer_information, order_items, coupon_code, delivery_method, payment_method, comment, } = data;
    const productIds = order_items.map((item) => item.product_id);
    const products = yield prisma_1.default.product.findMany({
        where: {
            id: {
                in: productIds,
            },
        },
    });
    if (products.length === 0) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "No product found to create order");
    }
    const itemsToCreateOrder = products.map((product) => {
        const item = order_items.find((item) => item.product_id === product.id);
        return {
            product_id: product.id,
            quantity: (item === null || item === void 0 ? void 0 : item.quantity) || 1,
            price: product.price,
        };
    });
    const subAmount = itemsToCreateOrder.reduce((acc, item) => acc + item.price * item.quantity, 0);
    let discountAmount = 0;
    let coupon = null;
    if (coupon_code) {
        coupon = yield Coupon_services_1.CouponServices.applyCoupon({
            code: coupon_code,
            contact_number: customer_information.contact_number,
            order_amount: subAmount,
            product_amount: itemsToCreateOrder.length,
            customer_type: "GUEST",
        });
        discountAmount = coupon.discount_amount;
    }
    const totalAmount = subAmount - discountAmount;
    const deliveryCharge = delivery_method === client_1.DeliveryMethod.STORE_PICKUP ? 0 : Order_constants_1.HOME_DELIVERY_CHARGE;
    const payableAmount = totalAmount + deliveryCharge;
    const customerInfo = {
        name: customer_information.name,
        email: customer_information.email,
        contact_number: customer_information.contact_number,
        address: customer_information.address,
        city: customer_information.city,
        coupon_id: (coupon === null || coupon === void 0 ? void 0 : coupon.id) || null,
    };
    const orderInfo = {
        payment_method: payment_method || client_1.PaymentMethod.CASH_ON_DELIVERY,
        delivery_method: delivery_method || client_1.DeliveryMethod.HOME_DELIVERY,
        delivery_charge: deliveryCharge,
        discount_amount: discountAmount,
        sub_amount: subAmount,
        total_amount: totalAmount,
        payable_amount: payableAmount,
        coupon_id: (coupon === null || coupon === void 0 ? void 0 : coupon.id) || null,
        comment: comment || null,
    };
    const result = yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        var _c;
        const customerInformation = yield tx.customerInfo.upsert({
            where: {
                contact_number: customerInfo.contact_number,
            },
            create: customerInfo,
            update: {
                address: customerInfo.address,
                city: customerInfo.city,
            },
        });
        const order = yield tx.order.create({
            data: Object.assign(Object.assign({}, orderInfo), { customer_info_id: customerInformation.id, order_items: {
                    create: itemsToCreateOrder,
                } }),
            select: Object.assign({}, Order_constants_1.orderSelectedFields),
        });
        if ((_c = order === null || order === void 0 ? void 0 : order.coupon) === null || _c === void 0 ? void 0 : _c.code) {
            yield tx.coupon.update({
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
    }));
    return result;
});
const getOrders = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm, page, limit, sortBy, sortOrder, min_order_amount, max_order_amount } = query, remainingQuery = __rest(query, ["searchTerm", "page", "limit", "sortBy", "sortOrder", "min_order_amount", "max_order_amount"]);
    if (sortBy)
        (0, validateQueryFields_1.default)(Order_constants_1.orderFieldsValidationConfig, "sort_by", sortBy);
    if (sortOrder)
        (0, validateQueryFields_1.default)(Order_constants_1.orderFieldsValidationConfig, "sort_order", sortOrder);
    const { pageNumber, limitNumber, skip, sortWith, sortSequence } = (0, pagination_1.default)({
        page,
        limit,
        sortBy,
        sortOrder,
    });
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: [
                ...Order_constants_1.orderSearchableFields.map((field) => ({
                    [field]: {
                        contains: searchTerm,
                        mode: "insensitive",
                    },
                })),
                {
                    customer_info: {
                        OR: Order_constants_1.orderSearchableFieldsWithCustomerInfo.map((field) => ({
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
            (0, validateQueryFields_1.default)(Order_constants_1.orderFieldsValidationConfig, key, value);
            andConditions.push({
                [key]: value === "true" ? true : value === "false" ? false : value,
            });
        }
    }
    (0, addFilter_1.default)(andConditions, "total_amount", "gte", Number(min_order_amount));
    (0, addFilter_1.default)(andConditions, "total_amount", "lte", Number(max_order_amount));
    const whereConditions = {
        AND: andConditions,
    };
    const [result, total] = yield Promise.all([
        prisma_1.default.order.findMany({
            where: whereConditions,
            skip: skip,
            take: limitNumber,
            orderBy: {
                [sortWith]: sortSequence,
            },
            select: Object.assign({}, Order_constants_1.orderSelectedFields),
        }),
        prisma_1.default.order.count({ where: whereConditions }),
    ]);
    return {
        meta: {
            page: pageNumber,
            limit: limitNumber,
            total,
        },
        data: result,
    };
});
const myOrder = (user, query) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm, page, limit, sortBy, sortOrder, min_order_amount, max_order_amount } = query, remainingQuery = __rest(query, ["searchTerm", "page", "limit", "sortBy", "sortOrder", "min_order_amount", "max_order_amount"]);
    if (sortBy)
        (0, validateQueryFields_1.default)(Order_constants_1.orderFieldsValidationConfig, "sort_by", sortBy);
    if (sortOrder)
        (0, validateQueryFields_1.default)(Order_constants_1.orderFieldsValidationConfig, "sort_order", sortOrder);
    const { pageNumber, limitNumber, skip, sortWith, sortSequence } = (0, pagination_1.default)({
        page,
        limit,
        sortBy,
        sortOrder,
    });
    console.log(user === null || user === void 0 ? void 0 : user.id);
    const andConditions = [{ user_id: user === null || user === void 0 ? void 0 : user.id }];
    if (searchTerm) {
        andConditions.push({
            OR: [
                ...Order_constants_1.orderSearchableFields.map((field) => ({
                    [field]: {
                        contains: searchTerm,
                        mode: "insensitive",
                    },
                })),
                {
                    customer_info: {
                        OR: Order_constants_1.orderSearchableFieldsWithCustomerInfo.map((field) => ({
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
            (0, validateQueryFields_1.default)(Order_constants_1.orderFieldsValidationConfig, key, value);
            andConditions.push({
                [key]: value === "true" ? true : value === "false" ? false : value,
            });
        }
    }
    (0, addFilter_1.default)(andConditions, "total_amount", "gte", Number(min_order_amount));
    (0, addFilter_1.default)(andConditions, "total_amount", "lte", Number(max_order_amount));
    const whereConditions = {
        AND: andConditions,
    };
    const [result, total] = yield Promise.all([
        prisma_1.default.order.findMany({
            where: whereConditions,
            skip: skip,
            take: limitNumber,
            orderBy: {
                [sortWith]: sortSequence,
            },
            select: Object.assign({}, Order_constants_1.orderSelectedFields),
        }),
        prisma_1.default.order.count({ where: whereConditions }),
    ]);
    return {
        meta: {
            page: pageNumber,
            limit: limitNumber,
            total,
        },
        data: result,
    };
});
const updateOrderByAdmin = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield prisma_1.default.order.findUniqueOrThrow({
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
    if (newOrderStatus &&
        !Order_constants_1.allowedTransitions[currentOrderStatus].includes(newOrderStatus)) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, `Invalid status transition from ${currentOrderStatus} to ${newOrderStatus}`);
    }
    // Check payment status to deliver an order
    if (newOrderStatus === "DELIVERED" &&
        order.payment_status === "DUE" &&
        payload.payment_status !== "PAID") {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, `Cannot deliver an order without payment`);
    }
    // Check payment status update after order is delivered
    if ((currentOrderStatus === "DELIVERED" || newOrderStatus === "DELIVERED") &&
        payload.payment_status === "DUE") {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, `Cannot transition from PAID to DUE after order is delivered`);
    }
    if (order.payment_status === "PAID" && payload.payment_method) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, `Cannot update payment method after the payment is completed`);
    }
    const result = yield prisma_1.default.order.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const updateOrderByCustomer = (user, id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { customer_information } = payload, remainingPayload = __rest(payload, ["customer_information"]);
    const order = yield prisma_1.default.order.findUniqueOrThrow({
        where: {
            user_id: user === null || user === void 0 ? void 0 : user.id,
            id,
        },
    });
    if ((order.order_status === "DELIVERED" || order.payment_status === "PAID") &&
        payload.payment_method) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, `Cannot update payment method after the payment is completed`);
    }
    if ((order.order_status === "SHIPPED" || order.order_status === "DELIVERED") &&
        payload.delivery_method) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, `Cannot update delivery method after the order is shipped or delivered`);
    }
    if ((order.order_status === "SHIPPED" || order.order_status === "DELIVERED") &&
        customer_information &&
        Object.values(customer_information).length) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, `Cannot update customer information after the order is shipped or delivered`);
    }
    const result = yield prisma_1.default.order.update({
        where: {
            user_id: user === null || user === void 0 ? void 0 : user.id,
            id,
        },
        data: Object.assign(Object.assign({}, remainingPayload), { customer_info: {
                update: customer_information,
            } }),
        include: {
            customer_info: true,
        },
    });
    return result;
});
exports.OrderServices = {
    createOrderForRegisteredUser,
    createOrderForGuestUser,
    getOrders,
    myOrder,
    updateOrderByAdmin,
    updateOrderByCustomer,
};
