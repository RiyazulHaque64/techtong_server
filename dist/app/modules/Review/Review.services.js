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
exports.ReviewServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../error/ApiError"));
const prisma_1 = __importDefault(require("../../shared/prisma"));
const validateQueryFields_1 = __importDefault(require("../../utils/validateQueryFields"));
const Review_constants_1 = require("./Review.constants");
const pagination_1 = __importDefault(require("../../utils/pagination"));
const createReview = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield prisma_1.default.product.findUnique({
        where: {
            id: payload.product_id,
            is_deleted: false,
        },
        select: {
            id: true,
        },
    });
    if (!product) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "The product does not exist");
    }
    const result = yield prisma_1.default.review.create({
        data: Object.assign({ user_id: user.id }, payload),
    });
    return result;
});
const getReviewsByProductId = (product_id, query) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, sortBy, sortOrder } = query;
    if (sortBy)
        (0, validateQueryFields_1.default)(Review_constants_1.reviewFieldsValidationConfig, "sort_by", sortBy);
    if (sortOrder)
        (0, validateQueryFields_1.default)(Review_constants_1.reviewFieldsValidationConfig, "sort_order", sortOrder);
    const { pageNumber, limitNumber, skip, sortWith, sortSequence } = (0, pagination_1.default)({
        page,
        limit,
        sortBy,
        sortOrder,
    });
    const andConditions = [{ product_id: product_id }];
    const whereConditions = {
        AND: andConditions,
    };
    const [result, total] = yield Promise.all([
        prisma_1.default.review.findMany({
            where: whereConditions,
            skip: skip,
            take: limitNumber,
            orderBy: {
                [sortWith]: sortSequence,
            },
            select: Object.assign({}, Review_constants_1.reviewSelectedFields),
        }),
        prisma_1.default.review.count({ where: whereConditions }),
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
exports.ReviewServices = { createReview, getReviewsByProductId };
