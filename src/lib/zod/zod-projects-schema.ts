import { z } from "zod";

export const createProjectSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  type: z.enum(["social", "educational", "environmental", "cultural", "health"]),
  status: z.enum(["planning", "active", "completed", "archived"]),
  responsibles: z.string().min(1, "Responsáveis são obrigatórios"),
  location: z.string().optional(),
  date: z.date().optional(),
  starting_time: z.string().optional(),
  ending_time: z.string().optional(),
});

export const updateProjectSchema = createProjectSchema.extend({
  cover_image: z.instanceof(File).optional(),
  markdown: z.string().optional(),
});

export type CreateProjectValues = z.infer<typeof createProjectSchema>;
export type UpdateProjectValues = z.infer<typeof updateProjectSchema>;