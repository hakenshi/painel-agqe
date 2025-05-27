import { z } from "zod";

export const eventsFormSchema = z.object({
    name: z.string().trim().min(1, "O nome é obrigatório."),
    type: z.enum(['event', 'gallery', 'event_gallery']),
    location: z.string().trim().min(1, "A localização do evento é obrigatória."),
    date: z.date(),
    starting_time: z.string().time(),
    ending_time: z.string().time(),
})

export type EventFormValues = z.infer<typeof eventsFormSchema>