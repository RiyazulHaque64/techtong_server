import { z } from "zod";

const deleteImagesValidationSchema = z.object({
  body: z
    .object({
      cloud_ids: z.array(
        z
          .string({ invalid_type_error: "Cloud id must be a text" })
          .length(20, { message: "Invalid cloud id found" }),
        {
          invalid_type_error: "cloud_ids must be an array",
          required_error: "cloud_ids is required",
        }
      ),
    })
    .strict(),
});

export const ImageValidations = {
  deleteImagesValidationSchema,
};
