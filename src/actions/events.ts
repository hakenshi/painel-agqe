'use server'

import { db, eventsSchema } from "@/db/schema";

export async function getAllEvents(){
    return db.select().from(eventsSchema)
}

