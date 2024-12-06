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
exports.BrandServices = void 0;
const prisma_1 = __importDefault(require("../../shared/prisma"));
const generateSlug_1 = require("../../utils/generateSlug");
const pagination_1 = __importDefault(require("../../utils/pagination"));
const Brand_constants_1 = require("./Brand.constants");
const validateQueryFields_1 = __importDefault(require("../../utils/validateQueryFields"));
const addBrand = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const brand = {
        name: payload.name,
        slug: (0, generateSlug_1.generateSlug)(payload.name),
        description: payload.description || null,
        icon: payload.icon || null,
    };
    const result = yield prisma_1.default.brand.create({
        data: brand,
    });
    return result;
});
const getBrands = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm, page, limit, sortBy, sortOrder } = query;
    if (sortBy)
        (0, validateQueryFields_1.default)(Brand_constants_1.brandFieldsValidationConfig, "sort_by", sortBy);
    if (sortOrder)
        (0, validateQueryFields_1.default)(Brand_constants_1.brandFieldsValidationConfig, "sort_order", sortOrder);
    const { pageNumber, limitNumber, skip, sortWith, sortSequence } = (0, pagination_1.default)({
        page,
        limit,
        sortBy,
        sortOrder,
    });
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: Brand_constants_1.brandSearchableFields.map((field) => {
                return {
                    [field]: {
                        contains: searchTerm,
                        mode: "insensitive",
                    },
                };
            }),
        });
    }
    const whereConditions = {
        AND: andConditions,
    };
    const [result, total] = yield Promise.all([
        prisma_1.default.brand.findMany({
            where: whereConditions,
            skip: skip,
            take: limitNumber,
            orderBy: {
                [sortWith]: sortSequence,
            },
        }),
        yield prisma_1.default.brand.count({ where: whereConditions }),
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
const getBrand = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.brand.findUniqueOrThrow({
        where: {
            id,
        },
    });
    return result;
});
const updateBrand = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.name) {
        payload.slug = (0, generateSlug_1.generateSlug)(payload.name);
    }
    const result = yield prisma_1.default.brand.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteBrand = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.brand.delete({
        where: {
            id,
        },
    });
    return null;
});
exports.BrandServices = {
    addBrand,
    getBrands,
    getBrand,
    updateBrand,
    deleteBrand,
};
