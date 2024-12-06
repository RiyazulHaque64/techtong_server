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
exports.CategoryServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../error/ApiError"));
const prisma_1 = __importDefault(require("../../shared/prisma"));
const generateSlug_1 = require("../../utils/generateSlug");
const pagination_1 = __importDefault(require("../../utils/pagination"));
const Category_constants_1 = require("./Category.constants");
const validateQueryFields_1 = __importDefault(require("../../utils/validateQueryFields"));
const addCategory = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.parent_id) {
        const parent_category = yield prisma_1.default.category.findFirst({
            where: {
                id: payload.parent_id,
            },
        });
        if (!parent_category)
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Parent category not found");
    }
    const category = {
        title: payload.title,
        slug: (0, generateSlug_1.generateSlug)(payload.title),
        description: payload.description || null,
        parent_id: payload.parent_id || null,
        icon: payload.icon || null,
    };
    const result = yield prisma_1.default.category.create({
        data: category,
    });
    return result;
});
const getCategories = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm, page, limit, sortBy, sortOrder, parent } = query;
    if (sortBy)
        (0, validateQueryFields_1.default)(Category_constants_1.categoryFieldsValidationConfig, "sort_by", sortBy);
    if (sortOrder)
        (0, validateQueryFields_1.default)(Category_constants_1.categoryFieldsValidationConfig, "sort_order", sortOrder);
    const { pageNumber, limitNumber, skip, sortWith, sortSequence } = (0, pagination_1.default)({
        page,
        limit,
        sortBy,
        sortOrder,
    });
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: Category_constants_1.categorySearchableFields.map((field) => {
                return {
                    [field]: {
                        contains: searchTerm,
                        mode: "insensitive",
                    },
                };
            }),
        });
    }
    if (parent) {
        andConditions.push({
            parent: {
                title: {
                    equals: parent,
                    mode: "insensitive",
                },
            },
        });
    }
    const whereConditions = {
        AND: andConditions,
    };
    const [result, total] = yield Promise.all([
        prisma_1.default.category.findMany({
            where: whereConditions,
            skip: skip,
            take: limitNumber,
            orderBy: {
                [sortWith]: sortSequence,
            },
            include: {
                parent: true,
            },
        }),
        prisma_1.default.category.count({ where: whereConditions }),
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
const getCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.category.findUniqueOrThrow({
        where: {
            id,
        },
        include: {
            parent: true,
        },
    });
    return result;
});
const updateCategory = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.parent_id) {
        const parent_category = yield prisma_1.default.category.findFirst({
            where: {
                id: payload.parent_id,
            },
        });
        if (!parent_category) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Parent category not found");
        }
    }
    if (payload.title) {
        payload.slug = (0, generateSlug_1.generateSlug)(payload.title);
    }
    const result = yield prisma_1.default.category.update({
        where: {
            id,
        },
        data: payload,
        include: {
            parent: true,
        },
    });
    return result;
});
const deleteCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.category.delete({
        where: {
            id,
        },
    });
    return null;
});
exports.CategoryServices = {
    addCategory,
    getCategories,
    getCategory,
    deleteCategory,
    updateCategory,
};
