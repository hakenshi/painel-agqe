import { z } from "zod";
import { imageFileSchema, textSchema, urlSchema } from "./shared";

// Base field schemas
const nameField = textSchema(1, 255).refine(v => v.length > 0, "O nome do apoiador é obrigatório.");
const logoField = imageFileSchema;
const websiteField = urlSchema.max(255);

// Base schema with all required fields
const baseSponsorSchema = z.object({
  name: nameField,
  website: websiteField,
});

// Create schema - all fields required, logo required
export const createSponsorSchema = baseSponsorSchema.extend({
  logo: logoField,
});

// Update schema - all fields optional
export const updateSponsorSchema = baseSponsorSchema.partial().extend({
  logo: logoField.optional().nullable(),
});

export type CreateSponsorValues = z.infer<typeof createSponsorSchema>;
export type UpdateSponsorValues = z.infer<typeof updateSponsorSchema>;