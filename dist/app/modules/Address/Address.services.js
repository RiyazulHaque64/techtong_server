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
exports.AddressServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../error/ApiError"));
const prisma_1 = __importDefault(require("../../shared/prisma"));
const Address_constants_1 = require("./Address.constants");
const pagination_1 = __importDefault(require("../../utils/pagination"));
const User_constants_1 = require("../User/User.constants");
const validateQueryFields_1 = __importDefault(require("../../utils/validateQueryFields"));
const addAddress = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, contact_number, email } = user;
    const address = {
        user_id: id,
        contact_number: payload.contact_number || contact_number,
        email: payload.email || email || null,
        address: payload.address,
        city: payload.city,
    };
    const result = yield prisma_1.default.address.create({
        data: address,
        include: {
            user: {
                select: Object.assign({}, User_constants_1.userSelectedFields),
            },
        },
    });
    return result;
});
const getAllAddresses = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm, page, limit, sortBy, sortOrder } = query, remainingQuery = __rest(query, ["searchTerm", "page", "limit", "sortBy", "sortOrder"]);
    if (sortBy)
        (0, validateQueryFields_1.default)(Address_constants_1.addressFieldsValidationConfig, "sort_by", sortBy);
    if (sortOrder)
        (0, validateQueryFields_1.default)(Address_constants_1.addressFieldsValidationConfig, "sort_order", sortOrder);
    const { pageNumber, limitNumber, skip, sortWith, sortSequence } = (0, pagination_1.default)({
        page,
        limit,
        sortBy,
        sortOrder,
    });
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: Address_constants_1.addressSearchableFields.map((field) => {
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
            andConditions.push({
                [key]: value,
            });
        }
    }
    const whereConditions = {
        AND: andConditions,
    };
    const [result, total] = yield Promise.all([
        prisma_1.default.address.findMany({
            where: whereConditions,
            skip: skip,
            take: limitNumber,
            orderBy: {
                [sortWith === "created_at" ? "city" : sortWith]: sortSequence,
            },
            include: {
                user: {
                    select: Object.assign({}, User_constants_1.userSelectedFields),
                },
            },
        }),
        yield prisma_1.default.address.count({ where: whereConditions }),
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
const getMyAddresses = (user, query) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm, page, limit, sortBy, sortOrder } = query, remainingQuery = __rest(query, ["searchTerm", "page", "limit", "sortBy", "sortOrder"]);
    if (sortBy)
        (0, validateQueryFields_1.default)(Address_constants_1.addressFieldsValidationConfig, "sort_by", sortBy);
    if (sortOrder)
        (0, validateQueryFields_1.default)(Address_constants_1.addressFieldsValidationConfig, "sort_order", sortOrder);
    const { pageNumber, limitNumber, skip, sortWith, sortSequence } = (0, pagination_1.default)({
        page,
        limit,
        sortBy,
        sortOrder,
    });
    const andConditions = [{ user_id: user === null || user === void 0 ? void 0 : user.id }];
    if (searchTerm) {
        andConditions.push({
            OR: Address_constants_1.addressSearchableFields.map((field) => {
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
            andConditions.push({
                [key]: value,
            });
        }
    }
    const whereConditions = {
        AND: andConditions,
    };
    const [result, total] = yield Promise.all([
        prisma_1.default.address.findMany({
            where: whereConditions,
            skip: skip,
            take: limitNumber,
            orderBy: {
                [sortWith === "created_at" ? "city" : sortWith]: sortSequence,
            },
            include: {
                user: {
                    select: Object.assign({}, User_constants_1.userSelectedFields),
                },
            },
        }),
        yield prisma_1.default.address.count({ where: whereConditions }),
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
const getMySingleAddress = (user, id) => __awaiter(void 0, void 0, void 0, function* () {
    const address = yield prisma_1.default.address.findUniqueOrThrow({
        where: {
            id,
        },
    });
    if (address.user_id !== (user === null || user === void 0 ? void 0 : user.id)) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Address not found");
    }
    const result = yield prisma_1.default.address.findFirst({
        where: {
            user_id: user === null || user === void 0 ? void 0 : user.id,
            id,
        },
        include: {
            user: {
                select: Object.assign({}, User_constants_1.userSelectedFields),
            },
        },
    });
    return result;
});
const updateAddress = (user, id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const address = yield prisma_1.default.address.findUniqueOrThrow({
        where: {
            id,
        },
    });
    if (address.user_id !== (user === null || user === void 0 ? void 0 : user.id)) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Address not found");
    }
    const result = yield prisma_1.default.address.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteAddress = (user, id) => __awaiter(void 0, void 0, void 0, function* () {
    const address = yield prisma_1.default.address.findUniqueOrThrow({
        where: {
            id,
        },
    });
    if (address.user_id !== (user === null || user === void 0 ? void 0 : user.id)) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Address not found");
    }
    yield prisma_1.default.address.delete({
        where: {
            id,
        },
    });
    return null;
});
exports.AddressServices = {
    addAddress,
    getAllAddresses,
    getMyAddresses,
    getMySingleAddress,
    updateAddress,
    deleteAddress,
};
