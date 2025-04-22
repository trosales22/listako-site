import { z } from "zod";

export const taskSchema = z.object({
  name: z.string().nonempty("Task name is required"),
  description: z.string().nonempty("Description is required"),
  status: z.enum(["pending", "in_progress", "completed"], {
    required_error: "Status is required",
    invalid_type_error: "Invalid status",
  }),
  priority: z.enum(["low", "medium", "high"], {
    required_error: "Priority is required",
    invalid_type_error: "Invalid priority",
  }),
});

export type TaskFormData = z.infer<typeof taskSchema>;
