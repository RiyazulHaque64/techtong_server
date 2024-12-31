const attribute = {
  color: undefined,
  size: undefined,
};

const attributesFormatter = (attributes) => {
  const attributesArr = Object.keys(attributes).filter(
    (item) => attributes[item]?.value !== undefined
  );

  const formattedAttributes = attributesArr.map((item) => ({
    slug: item,
    value: attributes[item]?.value,
  }));
  return formattedAttributes;
};

// const attributs = Object.keys(attribute).map((item) => {
//   if (attribute[item]?.value) {
//     return {
//       slug: item,
//       value: attribute[item]?.value,
//     };
//   }
// });

console.log(attributesFormatter(attribute));

const specification = [
  {
    heading: "Main specification",
    items: [
      {
        title: "Model",
        value: "H110",
      },
      {
        title: "Brand",
        value: "Gigabyte",
      },
    ],
  },
  {
    heading: "Warranty information",
    items: [
      {
        title: "Warranty",
        value: "1 Year",
      },
    ],
  },
];

const str = "r,b,c";

console.log(str.split(","));


const params = {
  sortBy: 'price',
  sortOrder: 'asc',
  category: 'all',
}

?sortBy=price&sortOrder=asc&category=all
