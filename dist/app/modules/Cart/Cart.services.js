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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../error/ApiError"));
const prisma_1 = __importDefault(require("../../shared/prisma"));
const client_1 = require("@prisma/client");
const addToCart = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized");
    }
    const product = yield prisma_1.default.product.findUniqueOrThrow({
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
        case client_1.UserRole.SUPER_ADMIN:
            price = product.retailer_price || product.discount_price || product.price;
            break;
        case client_1.UserRole.ADMIN:
            price = product.retailer_price || product.discount_price || product.price;
            break;
        case client_1.UserRole.RETAILER:
            price = product.retailer_price || product.discount_price || product.price;
            break;
        default:
            price = product.discount_price || product.price;
            break;
    }
    const result = yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const cart = yield tx.cart.upsert({
            where: {
                user_id: user.id,
            },
            create: {
                user_id: user.id,
            },
            update: {},
        });
        let cartItem = yield tx.cartItem.upsert({
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
    }));
    return result;
});
const getCart = (user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user)
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized");
    const cart = yield prisma_1.default.cart.findUniqueOrThrow({
        where: {
            user_id: user.id,
        },
        include: {
            cart_items: true,
        },
    });
    const cartItemsWithTotal = cart === null || cart === void 0 ? void 0 : cart.cart_items.map((item) => (Object.assign(Object.assign({}, item), { total: item.quantity * item.price })));
    const cartTotal = cartItemsWithTotal.reduce((acc, item) => acc + item.total, 0);
    return Object.assign(Object.assign({}, cart), { cart_total: cartTotal, cart_items: cartItemsWithTotal });
});
const updateCartItem = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.quantity === undefined || payload.quantity <= 0) {
        yield prisma_1.default.cartItem.delete({
            where: {
                id,
            },
        });
        return null;
    }
    const cartItem = yield prisma_1.default.cartItem.update({
        where: {
            id,
        },
        data: {
            quantity: payload.quantity,
        },
    });
    return cartItem;
});
const deleteToCart = (user, cartItemId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized");
    }
    yield prisma_1.default.cartItem.delete({
        where: {
            id: cartItemId,
            cart: {
                user_id: user.id,
            },
        },
    });
    return null;
});
exports.CartServices = {
    addToCart,
    getCart,
    deleteToCart,
    updateCartItem,
};
