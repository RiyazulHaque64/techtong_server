import { z } from "zod";

const createReviewValidationSchema = z.object({
  body: z.object({
    product_id: z
      .string({
        required_error: "Product id is required",
        invalid_type_error: "Product id must be a text",
      })
      .regex(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
        "Invalid ID"
      ),
    rating: z
      .number({ required_error: "Rating is required" })
      .min(1, "Rating must be at least 1")
      .max(5, "Rating must be at most 5"),
    comment: z
      .string({ required_error: "Comment is required" })
      .min(1, "Comment is required"),
  }),
});

export const ReviewValidations = {
  createReviewValidationSchema,
};
