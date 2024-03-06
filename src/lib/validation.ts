import { z } from "zod";
import { jobTypes } from "./jobTypes";
export const jobFilterSchema = z.object({
  q: z.string().optional(),
  type: z.string().optional(),
  location: z.string().optional(),
  remote: z.coerce.boolean().optional(),
});

export type JobFilterValues = z.infer<typeof jobFilterSchema>;

const requireString = z.string().min(1, "Required");

const companyLogoSchema = z
  .custom<File | undefined>()
  .refine((file) => {
    return !file || (file instanceof File && file.type.startsWith("/image"));
  }, "Must be Image File")
  .refine((file) => {
    return !file || file.size < 1024 * 1024 * 2;
  }, "File must be less than 2MB");

const numericRequireSchema = requireString.regex(/^\d+$/, "Must be a number");

export const createJobSchema = z.object({
  title: requireString.max(100),
  type: requireString.refine(
    (value) => jobTypes.includes(value),
    "Invalid Job Type",
  ),
  companyName: requireString.max(100),
  companyLogo: companyLogoSchema,
  description: z.string().max(5000).optional(),
  salary: numericRequireSchema.max(9),
});
