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

const deleted_images = {
  skn: "deleted1",
  bkn: "deleted1",
  ckn: "not-found",
};

const deleted_id = Object.entries(undefined)
  .filter(([key, value]) => value === "deleted")
  .map(([key, value]) => key);
console.log(deleted_id);
