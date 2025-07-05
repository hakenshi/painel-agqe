"use server";

import { db } from "@/db";
import { eventsSchema } from "@/db/schema";

export async function getAllEvents() {
  return db.select().from(eventsSchema);
}

// export async function createEvent(eventData: EventFormValues) {
// }
