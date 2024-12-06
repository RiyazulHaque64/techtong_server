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
exports.CouponServices = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../shared/prisma"));
const pagination_1 = __importDefault(require("../../utils/pagination"));
const Coupon_constants_1 = require("./Coupon.constants");
const addFilter_1 = __importDefault(require("../../utils/addFilter"));
const validateQueryFields_1 = __importDefault(require("../../utils/validateQueryFields"));
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../error/ApiError"));
const createCoupon = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { start_date, expiration_date } = payload, remainingField = __rest(payload, ["start_date", "expiration_date"]);
    const modified_start_date = start_date ? new Date(start_date) : new Date();
    const modified_expiration_date = new Date(expiration_date);
    if (modified_start_date > modified_expiration_date) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Start date cannot be greater than expiration date");
    }
    const result = yield prisma_1.default.coupon.create({
        data: Object.assign(Object.assign({}, remainingField), { start_date: modified_start_date, expiration_date: modified_expiration_date }),
    });
    return result;
});
const getCoupons = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm, page, limit, sortBy, sortOrder, minValue, maxValue } = query, remainingQuery = __rest(query, ["searchTerm", "page", "limit", "sortBy", "sortOrder", "minValue", "maxValue"]);
    if (sortBy)
        (0, validateQueryFields_1.default)(Coupon_constants_1.couponFieldsValidationConfig, "sort_by", sortBy);
    if (sortOrder)
        (0, validateQueryFields_1.default)(Coupon_constants_1.couponFieldsValidationConfig, "sort_order", sortOrder);
    const { pageNumber, limitNumber, skip, sortWith, sortSequence } = (0, pagination_1.default)({
        page,
        limit,
        sortBy,
        sortOrder,
    });
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: Coupon_constants_1.couponSearchableFields.map((field) => {
                return {
                    [field]: {
                        contains: searchTerm,
                        mode: "insensitive",
                    },
                };
            }),
        });
    }
    if (Object.keys(remainingQuery).length) {
        for (const [key, value] of Object.entries(remainingQuery)) {
            (0, validateQueryFields_1.default)(Coupon_constants_1.couponFieldsValidationConfig, key, value);
            andConditions.push({
                [key]: value === "true" ? true : value === "false" ? false : value,
            });
        }
    }
    (0, addFilter_1.default)(andConditions, "discount_value", "gte", Number(minValue));
    (0, addFilter_1.default)(andConditions, "discount_value", "lte", Number(maxValue));
    const whereConditions = {
        AND: andConditions,
    };
    const [result, total] = yield Promise.all([
        prisma_1.default.coupon.findMany({
            where: whereConditions,
            skip: skip,
            take: limitNumber,
            orderBy: {
                [sortWith]: sortSequence,
            },
        }),
        prisma_1.default.coupon.count({ where: whereConditions }),
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
const updateCouponActiveStatus = () => __awaiter(void 0, void 0, void 0, function* () {
    const now = new Date();
    // Deactivate expired coupons
    const updateExpiredCoupons = yield prisma_1.default.coupon.updateMany({
        where: {
            is_active: true,
            OR: [
                {
                    start_date: {
                        gt: now,
                    },
                },
                {
                    expiration_date: {
                        lt: now,
                    },
                },
            ],
        },
        data: {
            is_active: false,
        },
    });
    console.log(`${updateExpiredCoupons.count} expired coupons deactivated`);
    // Activate coupons that are within the start and expiration date range
    const updateDiactiveCoupons = yield prisma_1.default.coupon.updateMany({
        where: {
            is_active: false,
            start_date: {
                lte: now,
            },
            expiration_date: {
                gte: now,
            },
        },
        data: {
            is_active: true,
        },
    });
    console.log(`${updateDiactiveCoupons.count} diactive coupons activated`);
});
const applyCoupon = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { code, contact_number, order_amount, product_amount, customer_type = "GUEST", } = payload;
    const coupon = yield prisma_1.default.coupon.findUnique({
        where: {
            code,
        },
    });
    // Check if the coupon exists
    if (!coupon || !coupon.is_active) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Invalid or inactive coupon");
    }
    // Check if the coupon is valid for this user
    if (coupon.beneficiary_type === client_1.BeneficiaryType.NEW_USER &&
        customer_type !== "NEW") {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "This coupon is only valid for new users");
    }
    if (coupon.beneficiary_type === client_1.BeneficiaryType.EXISTING_USER &&
        customer_type === "GUEST") {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "This coupon is only valid for registered users");
    }
    // Check if the coupon is valid for this time period
    if (coupon.start_date.toISOString() > new Date().toISOString() ||
        coupon.expiration_date.toISOString() < new Date().toISOString()) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Coupon is not valid for this time period");
    }
    // Check if the coupon usage limit has been reached
    if (coupon.usage_limit && coupon.used_count >= coupon.usage_limit) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Coupon usage limit exceeded");
    }
    // Check if the order amount meet the minimum requirements
    if (coupon.min_order_amount && order_amount < coupon.min_order_amount) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, `To apply this coupon, the order amount must be at least ${coupon.min_order_amount}`);
    }
    // Check if the product amount meet the minimum requirements
    if (coupon.min_product_amount && product_amount < coupon.min_product_amount) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, `To apply this coupon, you must buy at least ${coupon.min_product_amount} products`);
    }
    // Check if the per user limit has been reached
    if (coupon.per_user_limit) {
        const customerInfo = yield prisma_1.default.customerInfo.findMany({
            where: {
                contact_number,
                coupon: {
                    code,
                },
            },
        });
        if ((customerInfo === null || customerInfo === void 0 ? void 0 : customerInfo.length) >= coupon.per_user_limit) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "You have already used this coupon the maximum allowed times");
        }
    }
    let discount_amount = 0;
    if (coupon.discount_type === client_1.DiscountType.AMOUNT) {
        discount_amount = Math.min(coupon.discount_value, coupon.maximum_value || coupon.discount_value);
    }
    else if (coupon.discount_type === client_1.DiscountType.PERCENTAGE) {
        discount_amount = Math.min(order_amount * (coupon.discount_value / 100), coupon.maximum_value || order_amount * (coupon.discount_value / 100));
    }
    return {
        id: coupon.id,
        code: coupon.code,
        discount_amount,
    };
});
exports.CouponServices = {
    createCoupon,
    getCoupons,
    updateCouponActiveStatus,
    applyCoupon,
};
