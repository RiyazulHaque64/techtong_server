import prisma from "../../shared/prisma";
import { generateSlug } from "../../utils/generateSlug";
import { IProductPayload } from "./Product.interfaces";
import pagination from "../../utils/pagination";
import { Prisma } from "@prisma/client";
import {
  brandSelectFieldsWithProduct,
  categorySelectFieldsWithProduct,
  productFieldsValidationConfig,
  productSearchableFields,
} from "./Product.constants";
import validateQueryFields from "../../utils/validateQueryFields";
import addFilter from "../../utils/addFilter";
import config from "../../../config";

const addProduct = async (payload: IProductPayload) => {
  const { categories, ...remainingData } = payload;
  const result = await prisma.product.create({
    data: {
      ...remainingData,
      slug: generateSlug(payload.name),
      categories: {
        connect: categories,
      },
    },
    include: {
      brand: {
        select: {
          ...brandSelectFieldsWithProduct,
        },
      },
      categories: {
        select: {
          ...categorySelectFieldsWithProduct,
        },
      },
    },
  });
  return result;
};

const getProducts = async (query: Record<string, any>) => {
  const {
    searchTerm,
    page,
    limit,
    sortBy,
    sortOrder,
    brand,
    category,
    published,
    featured,
    minPrice,
    maxPrice,
    stock_status,
    ...remainingQuery
  } = query;

  if (sortBy)
    validateQueryFields(productFieldsValidationConfig, "sort_by", sortBy);
  if (sortOrder)
    validateQueryFields(productFieldsValidationConfig, "sort_order", sortOrder);

  const { pageNumber, limitNumber, skip, sortWith, sortSequence } = pagination({
    page,
    limit,
    sortBy,
    sortOrder,
  });

  const andConditions: Prisma.ProductWhereInput[] = [{ is_deleted: false }];

  // if (searchTerm) {
  //   const words: string[] = searchTerm
  //     .split(" ")
  //     .filter((word: string) => word.length > 0);

  //   andConditions.push({
  //     OR: words.flatMap((word: string) => [
  //       ...productSearchableFields.map((field) => ({
  //         [field]: {
  //           contains: word,
  //           mode: "insensitive",
  //         },
  //       })),
  //       {
  //         brand: {
  //           name: {
  //             contains: word,
  //             mode: "insensitive",
  //           },
  //         },
  //       },
  //       {
  //         category: {
  //           title: {
  //             contains: word,
  //             mode: "insensitive",
  //           },
  //         },
  //       },
  //     ]),
  //   });
  // }

  if (searchTerm) {
    const words: string[] = searchTerm
      .split(" ")
      .filter((word: string) => word.length > 0);

    andConditions.push({
      OR: words.flatMap((word: string) => [
        ...productSearchableFields.map((field) => ({
          [field]: {
            contains: word,
            mode: "insensitive",
          },
        })),
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
      categories: {
        some: {
          title: {
            equals: category,
            mode: "insensitive",
          },
        },
      },
    });

  if (stock_status?.length) {
    andConditions.push({
      stock:
        stock_status === "out_of_stock"
          ? {
              equals: 0,
            }
          : stock_status === "low_stock"
          ? { lt: config.low_stock_threshold }
          : {
              gt: 0,
            },
    });
  }

  if (published)
    andConditions.push({
      published: published === "true" ? true : false,
    });

  if (featured)
    andConditions.push({
      featured: featured === "true" ? true : false,
    });

  addFilter(andConditions, "price", "gte", Number(minPrice));
  addFilter(andConditions, "price", "lte", Number(maxPrice));

  if (Object.keys(remainingQuery).length) {
    Object.keys(remainingQuery).forEach((key) => {
      const queryValue = remainingQuery[key].includes(",")
        ? remainingQuery[key].split(",")
        : remainingQuery[key];
      if (Array.isArray(queryValue)) {
        andConditions.push({
          OR: queryValue.map((value: string) => ({
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
      } else {
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

  const [
    result,
    total,
    all,
    published_count,
    featured_count,
    low_stock,
    in_stock,
  ] = await Promise.all([
    prisma.product.findMany({
      where: whereConditions,
      skip: skip,
      take: limitNumber,
      orderBy: {
        [sortWith]: sortSequence,
      },
      include: {
        brand: {
          select: {
            ...brandSelectFieldsWithProduct,
          },
        },
        categories: {
          select: {
            ...categorySelectFieldsWithProduct,
          },
        },
      },
    }),
    prisma.product.count({ where: whereConditions }),
    prisma.product.count({ where: { is_deleted: false } }),
    prisma.product.count({ where: { published: true } }),
    prisma.product.count({ where: { featured: true } }),
    prisma.product.count({
      where: { stock: { gt: 0, lt: config.low_stock_threshold } },
    }),
    prisma.product.count({
      where: { stock: { gt: config.low_stock_threshold } },
    }),
  ]);

  return {
    meta: {
      page: pageNumber,
      limit: limitNumber,
      total,
      all,
      published: published_count,
      draft: total - published_count,
      featured: featured_count,
      low_stock,
      in_stock,
    },
    data: result,
  };
};

const getSingleProduct = async (slug: string) => {
  const result = await prisma.product.findUniqueOrThrow({
    where: {
      slug,
    },
    include: {
      brand: {
        select: {
          ...brandSelectFieldsWithProduct,
        },
      },
      categories: {
        select: {
          ...categorySelectFieldsWithProduct,
        },
      },
      reviews: {
        select: {
          id: true,
          rating: true,
          comment: true,
          created_at: true,
          updated_at: true,
          user: {
            select: {
              name: true,
              email: true,
              profile_pic: true,
            },
          },
        },
      },
    },
  });

  let avg_rating = 0;
  if (result) {
    avg_rating =
      result.reviews.reduce((acc, review) => acc + review.rating, 0) /
      result.reviews.length;
  }
  return {
    ...result,
    avg_rating,
  };
};

const updateProduct = async (id: string, payload: IProductPayload) => {
  const { categories, ...remainingData } = payload;
  if (payload.name) {
    payload.slug = generateSlug(payload.name);
  }
  const result = await prisma.product.update({
    where: {
      id,
    },
    data: {
      ...remainingData,
      ...(categories && {
        categories: {
          connect: categories,
        },
      }),
    },
    include: {
      brand: { select: { ...brandSelectFieldsWithProduct } },
      categories: { select: { ...categorySelectFieldsWithProduct } },
    },
  });
  return result;
};

const deleteProduct = async ({ ids }: { ids: string[] }) => {
  await prisma.product.updateMany({
    where: {
      id: {
        in: ids,
      },
    },
    data: {
      is_deleted: true,
    },
  });
  return null;
};

export const ProductServices = {
  addProduct,
  updateProduct,
  getProducts,
  getSingleProduct,
  deleteProduct,
};
