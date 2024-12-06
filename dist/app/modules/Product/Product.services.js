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
exports.ProductServices = void 0;
const prisma_1 = __importDefault(require("../../shared/prisma"));
const generateSlug_1 = require("../../utils/generateSlug");
const pagination_1 = __importDefault(require("../../utils/pagination"));
const Product_constants_1 = require("./Product.constants");
const validateQueryFields_1 = __importDefault(require("../../utils/validateQueryFields"));
const addFilter_1 = __importDefault(require("../../utils/addFilter"));
const addProduct = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    payload.slug = (0, generateSlug_1.generateSlug)(payload.name);
    const result = yield prisma_1.default.product.create({
        data: payload,
        include: {
            brand: {
                select: Object.assign({}, Product_constants_1.brandSelectFieldsWithProduct),
            },
            category: {
                select: Object.assign({}, Product_constants_1.categorySelectFieldsWithProduct),
            },
        },
    });
    return result;
});
const getProducts = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm, page, limit, sortBy, sortOrder, brand, category, published, featured, minPrice, maxPrice } = query, remainingQuery = __rest(query, ["searchTerm", "page", "limit", "sortBy", "sortOrder", "brand", "category", "published", "featured", "minPrice", "maxPrice"]);
    if (sortBy)
        (0, validateQueryFields_1.default)(Product_constants_1.productFieldsValidationConfig, "sort_by", sortBy);
    if (sortOrder)
        (0, validateQueryFields_1.default)(Product_constants_1.productFieldsValidationConfig, "sort_order", sortOrder);
    const { pageNumber, limitNumber, skip, sortWith, sortSequence } = (0, pagination_1.default)({
        page,
        limit,
        sortBy,
        sortOrder,
    });
    const andConditions = [{ is_deleted: false }];
    if (searchTerm) {
        const words = searchTerm
            .split(" ")
            .filter((word) => word.length > 0);
        andConditions.push({
            OR: words.flatMap((word) => [
                ...Product_constants_1.productSearchableFields.map((field) => ({
                    [field]: {
                        contains: word,
                        mode: "insensitive",
                    },
                })),
                {
                    brand: {
                        name: {
                            contains: word,
                            mode: "insensitive",
                        },
                    },
                },
                {
                    category: {
                        title: {
                            contains: word,
                            mode: "insensitive",
                        },
                    },
                },
            ]),
        });
    }
    if (brand)
        andConditions.push({
            brand: {
                name: {
                    equals: brand,
                    mode: "insensitive",
                },
            },
        });
    if (category)
        andConditions.push({
            category: {
                title: {
                    equals: category,
                    mode: "insensitive",
                },
            },
        });
    if (published)
        andConditions.push({
            published: published === "true" ? true : false,
        });
    if (featured)
        andConditions.push({
            featured: featured === "true" ? true : false,
        });
    (0, addFilter_1.default)(andConditions, "price", "gte", Number(minPrice));
    (0, addFilter_1.default)(andConditions, "price", "lte", Number(maxPrice));
    if (Object.keys(remainingQuery).length) {
        Object.keys(remainingQuery).forEach((key) => {
            const queryValue = remainingQuery[key].includes(",")
                ? remainingQuery[key].split(",")
                : remainingQuery[key];
            if (Array.isArray(queryValue)) {
                andConditions.push({
                    OR: queryValue.map((value) => ({
                        attributes: {
                            array_contains: [
                                {
                                    slug: key,
                                    value,
                                },
                            ],
                        },
                    })),
                });
            }
            else {
                andConditions.push({
                    attributes: {
                        array_contains: [
                            {
                                slug: key,
                                value: queryValue,
                            },
                        ],
                    },
                });
            }
        });
    }
    const whereConditions = {
        AND: andConditions,
    };
    const [result, total] = yield Promise.all([
        prisma_1.default.product.findMany({
            where: whereConditions,
            skip: skip,
            take: limitNumber,
            orderBy: {
                [sortWith]: sortSequence,
            },
            include: {
                brand: {
                    select: Object.assign({}, Product_constants_1.brandSelectFieldsWithProduct),
                },
                category: {
                    select: Object.assign({}, Product_constants_1.categorySelectFieldsWithProduct),
                },
            },
        }),
        prisma_1.default.product.count({ where: whereConditions }),
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
const getSingleProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.product.findUniqueOrThrow({
        where: {
            id,
        },
        include: {
            brand: true,
            category: true,
        },
    });
    return result;
});
const updateProduct = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.name) {
        payload.slug = (0, generateSlug_1.generateSlug)(payload.name);
    }
    const result = yield prisma_1.default.product.update({
        where: {
            id,
        },
        data: payload,
        include: {
            brand: { select: Object.assign({}, Product_constants_1.brandSelectFieldsWithProduct) },
            category: { select: Object.assign({}, Product_constants_1.categorySelectFieldsWithProduct) },
        },
    });
    return result;
});
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.product.update({
        where: {
            id,
        },
        data: {
            is_deleted: true,
        },
    });
    return null;
});
exports.ProductServices = {
    addProduct,
    updateProduct,
    getProducts,
    getSingleProduct,
    deleteProduct,
};
