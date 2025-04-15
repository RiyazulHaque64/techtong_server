import { Prisma } from "@prisma/client";
import prisma from "../../shared/prisma";
import pagination from "../../utils/pagination";
import validateQueryFields from "../../utils/validateQueryFields";
import { courierFieldsValidationConfig, courierSearchableFields } from "./Courier.constants";
import { ICourier } from "./Courier.interfaces";

const addCourier = async (data: ICourier) => {
    const result = await prisma.courier.create({
        data
    });

    return result;
};

const getCouriers = async (query: Record<string, any>) => {
    const { searchTerm, page, limit, sortBy, sortOrder } = query;

    if (sortBy)
        validateQueryFields(courierFieldsValidationConfig, "sort_by", sortBy);
    if (sortOrder)
        validateQueryFields(
            courierFieldsValidationConfig,
            "sort_order",
            sortOrder
        );

    const { pageNumber, limitNumber, skip, sortWith, sortSequence } = pagination({
        page,
        limit,
        sortBy,
        sortOrder,
    });

    const andConditions: Prisma.CourierWhereInput[] = [];

    if (searchTerm) {
        andConditions.push({
            OR: courierSearchableFields.map((field) => {
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

    const [result, total] = await Promise.all([
        prisma.courier.findMany({
            where: whereConditions,
            skip: skip,
            take: limitNumber,
            orderBy: {
                [sortWith]: sortSequence,
            }
        }),
        prisma.courier.count({ where: whereConditions }),
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

const updateCourier = async (id: string, payload: Record<string, any>) => {
    const result = await prisma.courier.update({
        where: {
            id
        },
        data: payload
    });

    return result;
};

const deleteCouriers = async ({ ids }: { ids: string[] }) => {
    await prisma.courier.deleteMany({
        where: {
            id: {
                in: ids,
            },
        },
    });
    return null;
};


export const CourierServices = {
    addCourier,
    getCouriers,
    updateCourier,
    deleteCouriers
}