"use server";

import { db } from "@/db";
import { eventsSchema } from "@/db/schema";
import { eventsFormSchema } from "@/lib/zod/zod-events-schema";

const BUCKET_FOLDER = "events";

export async function getAllEvents() {
  return db.select().from(eventsSchema);
}

export async function createEvent(eventData: FormData) {
  const entries = Object.fromEntries(eventData);
  const date = entries.date ? new Date(entries.date as string) : null;
  const eventDataEntries = { ...entries, date };
  const parsedValues = eventsFormSchema.parse(eventDataEntries);
  
}
