import { z } from "zod";

export const userSchema = z.object({
  username: z.string().nonempty("Username is required"),
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  firstname: z.string().nonempty("First name is required"),
  lastname: z.string().nonempty("Last name is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(16, "Password must be less than 16 characters")
    .nullable()
    .optional(),
});

export type UserFormData = z.infer<typeof userSchema>;
