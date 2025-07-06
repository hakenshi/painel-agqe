import { z } from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 2;

const VALID_MIME_TYPES = ["png", "jpeg", "jpg", "webp"];

export const eventsFormSchema = z.object({
  name: z.string().trim().min(1, "O nome do evento é obrigatório."),
  type: z.enum(["event", "gallery", "event_gallery"], {
    errorMap: () => ({ message: "Selecione um tipo de evento válido." }),
  }),
  location: z.string().trim().min(1, "A localização do evento é obrigatória."),
  markdown: z
    .string()
    .min(50, { message: "O markdown deve ter no mínimo 50 caractéres." })
    .nullish()
    .refine(
      (v) => {
        if (!v) return true;
        return !/<script|<iframe|<object|<embed|<svg/i.test(v);
      },
      { message: "Tentativa de XSS previnida." }
    ),
  cover_image: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "A imagem deve ter no máximo 2 MB",
    })
    .refine(
      (file) => {
        const extension = file.type.split("/").pop();
        return extension && VALID_MIME_TYPES.includes(extension);
      },
      {
        message: `A imagem deve seguir um dos seguintes formatos: ${VALID_MIME_TYPES.join(
          ", "
        )}`,
      }
    )
    .nullish(),
    
  date: z.date({
    required_error: "A data do evento é obrigatória.",
    invalid_type_error: "Selecione uma data válida.",
  }),
  starting_time: z.string().time("Formato de horário inválido para o início."),
  ending_time: z.string().time("Formato de horário inválido para o término."),
});

export type EventFormValues = z.infer<typeof eventsFormSchema>;
