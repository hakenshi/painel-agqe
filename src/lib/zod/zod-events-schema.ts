import { z } from "zod";

export const eventsFormSchema = z.object({
    name: z.string().trim().min(1, "O nome do evento é obrigatório."),
    type: z.enum(['event', 'gallery', 'event_gallery'], {
        errorMap: () => ({ message: "Selecione um tipo de evento válido." })
    }),
    location: z.string().trim().min(1, "A localização do evento é obrigatória."),
    date: z.date({
        required_error: "A data do evento é obrigatória.",
        invalid_type_error: "Selecione uma data válida."
    }),
    starting_time: z.string().time("Formato de horário inválido para o início."),
    ending_time: z.string().time("Formato de horário inválido para o término."),
})

export type EventFormValues = z.infer<typeof eventsFormSchema>