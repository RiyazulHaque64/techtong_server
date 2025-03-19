import { Prisma } from "@prisma/client";
import config from "../../../config";
import prisma from "../../shared/prisma";
import addFilter from "../../utils/addFilter";
import { generateSlug } from "../../utils/generateSlug";
import pagination from "../../utils/pagination";
import validateQueryFields from "../../utils/validateQueryFields";
import {
  brandSelectFieldsWithProduct,
  categorySelectFieldsWithProduct,
  PRODUCT_STATUS,
  productFieldsValidationConfig,
  productSearchableFields,
} from "./Product.constants";
import { IProductPayload } from "./Product.interfaces";

const addProduct = async (payload: IProductPayload) => {
  const { categories, attributes, ...remainingData } = payload;
  const result = await prisma.$transaction(async (tx) => {
    const product = await prisma.product.create({
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

    if (payload.attributes?.length) {
      const productAttributeEntries = payload.attributes.map((attribute) => ({
        title: attribute.title,
        value: attribute.value,
        product_id: product.id,
      }));

      await tx.productAttribute.createMany({
        data: productAttributeEntries,
      });
    }

    return product;
  });

  return result;
};

// const getProducts = async () => {
//   const products = await prisma.product.findMany({
//     where: {
//       categories: {
//         some: {
//           title: {
//             equals: "Speakers",
//           },
//         },
//       },
//     },
//   });

//   return {
//     data: products,
//   };
// };

const getProducts = async (query: Record<string, any>) => {
  const {
    searchTerm,
    page,
    limit,
    sortBy,
    sortOrder,
    brand,
    category,
    status,
    price_range,
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

  const andConditions: Prisma.ProductWhereInput[] = [
    {
      is_deleted: false,
    },
  ];

  const attributeAndConditions: Prisma.AttributeWhereInput[] = [
    {
      category: null
    },
  ];

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

  if (category) {
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
    attributeAndConditions.push({
      category: {
        title: {
          equals: category,
          mode: "insensitive",
        }
      }
    })
  }


  if (stock_status?.length) {
    andConditions.push({
      stock:
        stock_status === "out_of_stock"
          ? {
            equals: 0,
          }
          : stock_status === "low_stock"
            ? { lt: config.low_stock_threshold, gt: 0 }
            : {
              gt: 0,
            },
    });
  }

  if (status) {
    switch (status) {
      case PRODUCT_STATUS.PUBLISHED:
        andConditions.push({
          published: true
        })
        break;
      case PRODUCT_STATUS.FEATURED:
        andConditions.push({
          featured: true
        })
        break;
      case PRODUCT_STATUS.DRAFT:
        andConditions.push({
          published: false
        })
        break;
      default:
        break;
    }
  }

  if (price_range) {
    const [minPrice, maxPrice] = price_range.split(',');
    addFilter(andConditions, "price", "gte", Number(minPrice));
    addFilter(andConditions, "price", "lte", Number(maxPrice));
  }

  if (Object.keys(remainingQuery).length) {
    Object.entries(remainingQuery).forEach(([key, value]) => {
      const values = Array.isArray(value)
        ? value
        : value.split(",").map((v: string) => v.trim());

      andConditions.push({
        attributes: {
          some: {
            title: {
              equals: key,
              mode: "insensitive",
            },
            value: {
              hasSome: values,
            },
          },
        },
      });
    });
  }

  const whereConditions = {
    AND: andConditions,
  };

  const attributeWhereConditions = {
    OR: attributeAndConditions,
  };

  const [
    result,
    total,
    all,
    published_count,
    featured_count,
    low_stock,
    in_stock,
    maxPriceProduct,
    attributes
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
        attributes: {
          select: {
            title: true,
            value: true,
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
    prisma.product.findFirst({
      orderBy: {
        price: 'desc'
      }
    }),
    prisma.attribute.findMany({
      where: attributeWhereConditions,
      orderBy: {
        name: "asc",
      }
    })
  ]);

  return {
    meta: {
      page: pageNumber,
      limit: limitNumber,
      total,
      all,
      published: published_count,
      draft: all - published_count,
      featured: featured_count,
      low_stock,
      in_stock,
      max_price: maxPriceProduct?.price,
      attributes
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
      attributes: {
        select: {
          title: true,
          value: true,
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
  const { categories, attributes, ...remainingData } = payload;
  if (payload.name) {
    payload.slug = generateSlug(payload.name);
  }
  const result = await prisma.$transaction(async (tx) => {
    const product = await tx.product.update({
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

    if (payload.attributes?.length) {
      const productAttributeEntries = payload.attributes.map((attribute) => ({
        title: attribute.title,
        value: attribute.value,
        product_id: product.id,
      }));

      // delete previous attribute
      await tx.productAttribute.deleteMany({
        where: {
          product_id: product.id,
        },
      });

      // create update attribute
      await tx.productAttribute.createMany({
        data: productAttributeEntries,
      });
    }

    return product;
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
