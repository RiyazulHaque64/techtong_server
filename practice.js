const specification = [
  {
    heading: "Basic Information",
    fields: [
      {
        title: "Supported CPU",
        value: [
          "Supports 10th Gen Intel Core Processors and 11th Gen Intel Core Processors (LGA1200)",
          "Digi Power design",
        ],
      },
    ],
  },
  {
    heading: "Expansion Slots",
    fields: [
      {
        title: "Supported CPU",
        value: [
          "Supports 10th Gen Intel Core Processors and 11th Gen Intel Core Processors (LGA1200)",
          "Digi Power design",
        ],
      },
    ],
  },
];

const product = {
  name: "ASRock H510M-HDV/M.2 10th and 11th Gen Micro ATX Motherboard",
  model: "H510M-HDV/M.2",
  specification: [
    {
      heading: "Basic Information",
      fields: [
        {
          title: "Supported CPU",
          value: [
            "Supports 10th Gen Intel Core Processors and 11th Gen Intel Core Processors (LGA1200)",
            "Digi Power design",
          ],
        },
      ],
    },
    {
      heading: "Expansion Slots",
      fields: [
        {
          title: "Supported CPU",
          value: [
            "Supports 10th Gen Intel Core Processors and 11th Gen Intel Core Processors (LGA1200)",
            "Digi Power design",
          ],
        },
      ],
    },
  ],
  brand_id: "1234567890",
  category_id: "1234567890",
  code: "123456",
  price: 11200,
  thumbnail_id: "123456",
};

const top100Films = [
  {
    id: 1,
    name: "Loracan Ward",
    profile_pic:
      "https://e7.pngegg.com/pngimages/348/800/png-clipart-man-wearing-blue-shirt-illustration-computer-icons-avatar-user-login-avatar-blue-child.png",
  },
  {
    id: 2,
    name: "Fazly Alahi",
    profile_pic:
      "https://e7.pngegg.com/pngimages/348/800/png-clipart-man-wearing-blue-shirt-illustration-computer-icons-avatar-user-login-avatar-blue-child.png",
  },
  {
    id: 3,
    name: "Riyazul Haque",
    profile_pic:
      "https://e7.pngegg.com/pngimages/348/800/png-clipart-man-wearing-blue-shirt-illustration-computer-icons-avatar-user-login-avatar-blue-child.png",
  },
  {
    id: 4,
    name: "Ismail Harik",
    profile_pic:
      "https://e7.pngegg.com/pngimages/348/800/png-clipart-man-wearing-blue-shirt-illustration-computer-icons-avatar-user-login-avatar-blue-child.png",
  },
  {
    id: 5,
    name: "Ismail Harik 2",
    profile_pic:
      "https://e7.pngegg.com/pngimages/348/800/png-clipart-man-wearing-blue-shirt-illustration-computer-icons-avatar-user-login-avatar-blue-child.png",
  },
];

const selected = [
  {
    id: 2,
    name: "Riyazul Haque",
  },
  {
    id: 3,
    name: "Rapu",
  },
];

const remainingTenants = top100Films.filter(
  (tenant) =>
    !selected.some((selectedTenant) => selectedTenant.id === tenant.id)
);

const category = "Motherboard category";

const slug = category
  .trim()
  .toLowerCase()
  .replace(/ /g, "-")
  .replace(/[^\w-]+/g, "");

console.log(slug);

const createItems = [
  {
    product_id: 1,
    quantity: 2,
    price: 2300,
  },
  {
    product_id: 2,
    quantity: 1,
    price: 1200,
  },
];

const attributes = [
  {
    slug: "color",
    value: "red",
  },
  {
    slug: "interface",
    value: "wireless",
  },
];
