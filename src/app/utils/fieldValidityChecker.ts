const fieldValidityChecker = (
  fields: string[],
  data: string
): { valid: boolean; message: string } => {
  const isValid = fields.includes(data);
  if (isValid) {
    return {
      valid: true,
      message: "",
    };
  } else {
    return {
      valid: false,
      message: `'${data}' is invalid field. Allowed fields are ${fields
        .map((i) => `'${i}'`)
        .join(", ")}`,
    };
  }
};

export default fieldValidityChecker;
