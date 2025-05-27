'use server'

import { db, eventsSchema } from "@/db/schema";
import { EventFormValues, eventsFormSchema } from "@/lib/zod/zod-events-schema";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getAllEvents() {
    return db.select().from(eventsSchema)
}

export async function createEvent(eventData: EventFormValues) {
    const parsedData = eventsFormSchema.parse(eventData)
    const cookie = await cookies()

    const expires = new Date(Date.now() + 30 * 60 * 1000) // 30 minutos a partir de agora
    cookie.set({ name: "event_data", value: JSON.stringify(parsedData), expires, httpOnly: true })

    redirect("/eventos/novo")
}