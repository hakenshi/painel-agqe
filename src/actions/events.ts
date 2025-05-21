'use server'

import { db, eventsSchema } from "@/db/schema";
import { EventFormValues, eventsFormSchema } from "@/lib/zod/zod-events-schema";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getAllEvents() {
    return db.select().from(eventsSchema)
}

export async function createEvent(eventData: EventFormValues) {
    try {
        const parsedData = eventsFormSchema.parse(eventData)
        const cookie = await cookies()

        cookie.set({ name: "event_data", value: JSON.stringify(parsedData), expires: 1.8e+6, httpOnly: true })
        redirect("/eventos/novo")
    } catch (error) {
        console.error(error)
        throw error
    }
}