import { z } from "zod";
import { textSchema, emailSchema } from "./shared";

// Base field schemas
const amountField = z.number().positive("O valor deve ser positivo").max(999999.99, "Valor muito alto");
const donorNameField = textSchema(1, 255).refine(v => v.length > 0, "Nome do doador é obrigatório");
const donorEmailField = emailSchema.max(255);
const messageField = textSchema(0, 1000);

// Base schema with required fields
const baseDonationSchema = z.object({
  amount: amountField,
});

// Create schema - amount required, other fields optional
export const createDonationSchema = baseDonationSchema.extend({
  donorName: donorNameField.optional(),
  donorEmail: donorEmailField.optional(),
  message: messageField.optional(),
});

// Update schema - all fields optional
export const updateDonationSchema = baseDonationSchema.partial().extend({
  donorName: donorNameField.optional(),
  donorEmail: donorEmailField.optional(),
  message: messageField.optional(),
});

export type CreateDonationValues = z.infer<typeof createDonationSchema>;
export type UpdateDonationValues = z.infer<typeof updateDonationSchema>;