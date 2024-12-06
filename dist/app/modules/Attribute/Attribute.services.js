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
exports.AttributeServices = void 0;
const prisma_1 = __importDefault(require("../../shared/prisma"));
const generateSlug_1 = require("../../utils/generateSlug");
const Attribute_constants_1 = require("./Attribute.constants");
const pagination_1 = __importDefault(require("../../utils/pagination"));
const validateQueryFields_1 = __importDefault(require("../../utils/validateQueryFields"));
const addAttribute = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.value)
        if (payload.category_id) {
            yield prisma_1.default.category.findUniqueOrThrow({
                where: {
                    id: payload.category_id,
                },
            });
        }
    payload.slug = (0, generateSlug_1.generateSlug)(payload.name);
    const result = yield prisma_1.default.attribute.create({
        data: payload,
        include: {
            category: true,
        },
    });
    return result;
});
const getAttributes = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm, page, limit, sortBy, sortOrder, category } = query;
    if (sortBy)
        (0, validateQueryFields_1.default)(Attribute_constants_1.attributeFieldsValidationConfig, "sort_by", sortBy);
    if (sortOrder)
        (0, validateQueryFields_1.default)(Attribute_constants_1.attributeFieldsValidationConfig, "sort_order", sortOrder);
    const { pageNumber, limitNumber, skip, sortWith, sortSequence } = (0, pagination_1.default)({
        page,
        limit,
        sortBy,
        sortOrder,
    });
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: Attribute_constants_1.attributeSearchableFields.map((field) => {
                return {
                    [field]: {
                        contains: searchTerm,
                        mode: "insensitive",
                    },
                };
            }),
        });
    }
    if (category) {
        andConditions.push({
            category: {
                title: {
                    equals: category,
                    mode: "insensitive",
                },
            },
        });
    }
    const whereConditions = {
        AND: andConditions,
    };
    const orderBy = sortWith === "name"
        ? {
            name: sortSequence,
        }
        : sortWith === "category"
            ? {
                category: {
                    title: sortSequence,
                },
            }
            : {
                name: sortSequence,
            };
    const [result, total] = yield Promise.all([
        prisma_1.default.attribute.findMany({
            where: whereConditions,
            skip: skip,
            take: limitNumber,
            orderBy,
            include: {
                category: true,
            },
        }),
        prisma_1.default.attribute.count({ where: whereConditions }),
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
const getAttribute = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.attribute.findUniqueOrThrow({
        where: {
            id,
        },
        include: {
            category: true,
        },
    });
    return result;
});
const updateAttribute = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.category_id) {
        yield prisma_1.default.category.findUniqueOrThrow({
            where: {
                id: payload.category_id,
            },
        });
    }
    if (payload.name) {
        payload.slug = (0, generateSlug_1.generateSlug)(payload.name);
    }
    const result = yield prisma_1.default.attribute.update({
        where: {
            id,
        },
        data: payload,
        include: {
            category: true,
        },
    });
    return result;
});
const deleteAttribute = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.attribute.delete({
        where: {
            id,
        },
    });
    return null;
});
exports.AttributeServices = {
    addAttribute,
    getAttributes,
    getAttribute,
    updateAttribute,
    deleteAttribute,
};
