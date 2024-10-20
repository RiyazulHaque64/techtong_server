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

const changeImageNameValidationSchema = z.object({
  body: z
    .object({
      name: z.string({
        required_error: "Updated name is required",
        invalid_type_error: "Updated name must be a text",
      }),
    })
    .strict(),
});

export const ImageValidations = {
  deleteImagesValidationSchema,
  changeImageNameValidationSchema,
};
