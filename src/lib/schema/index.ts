import validator from "validator";
import * as z from "zod";

export const itemSchema = z.object({
  id: z.string().optional(),
  createdDate: z.string().optional(),
  updatedDate: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  phone: z
    .string()
    .startsWith("+")
    .refine(validator.isMobilePhone, "Phone is invalid"),
  email: z.string().email(),
  confirmEmail: z.string().email({ message: "Invalid email address." }),
  country: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  agreement: z.union([z.literal("license"), z.literal("mutual")]),
  checkboxGroup: z.object({
    acceptLicenseTerms: z.boolean(),
    sendNewsByEmail: z.boolean().optional()
  })
});
export const itemsListSchema = z.object({ items: z.array(itemSchema) });
export const formSchema = itemSchema
  .omit({ id: true, createdDate: true, updatedDate: true })
  .refine((data) => data.email === data.confirmEmail, {
    message: "Email must match",
    path: ["confirmEmail"]
  });
