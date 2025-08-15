import { z } from "zod";
import { imageFileSchema, textSchema } from "./shared";

// Base field schemas
const nameField = textSchema(1, 255).refine(v => v.length > 0, "O nome do evento é obrigatório.");
const typeField = z.enum(["event", "gallery", "event_gallery"], {
  errorMap: () => ({ message: "Selecione um tipo de evento válido." }),
});
const locationField = textSchema(1, 255).refine(v => v.length > 0, "A localização do evento é obrigatória.");
const markdownField = z.string()
  .min(50, { message: "O markdown deve ter no mínimo 50 caractéres." })
  .refine(
    (v) => !/<script|<iframe|<object|<embed|<svg/i.test(v),
    { message: "Tentativa de XSS previnida." }
  );
const imageField = imageFileSchema;
const dateField = z.date({ required_error: "A data do evento é obrigatória." });
const timeField = z.string().time();

// Base schema with all required fields
const baseEventSchema = z.object({
  name: nameField,
  type: typeField,
  location: locationField,
  date: dateField,
  starting_time: timeField.refine(v => v, "Formato de horário inválido para o início."),
  ending_time: timeField.refine(v => v, "Formato de horário inválido para o término."),
});

// Create schema - all fields required, image required, markdown optional
export const createEventSchema = baseEventSchema.extend({
  cover_image: imageField,
  markdown: markdownField.optional().nullable(),
});

// Update schema - all fields optional
export const updateEventSchema = baseEventSchema.partial().extend({
  cover_image: imageField.optional().nullable(),
  markdown: markdownField.optional().nullable(),
});

// Legacy export for backward compatibility
export const eventsFormSchema = createEventSchema;

export type CreateEventValues = z.infer<typeof createEventSchema>;
export type UpdateEventValues = z.infer<typeof updateEventSchema>;
export type EventFormValues = CreateEventValues; // Legacy type
