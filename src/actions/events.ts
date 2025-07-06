"use server";

import { db } from "@/db";
import { eventsSchema } from "@/db/schema";
import { eventsFormSchema } from "@/lib/zod/zod-events-schema";
import { storeFileUrl } from "@/server/bucket";

const BUCKET_FOLDER = "events";

/**
 * Converts a string to a URL-friendly slug.
 * Removes accents, special characters, and trims whitespace.
 * Example: "Olá, Mundo!" -> "ola-mundo"
 */
export function stringToSlug(str: string): string {
  return str
    .normalize("NFD") // decompose accents
    .replace(/[\u0300-\u036f]/g, "") // remove accents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // replace spaces with -
    .replace(/-+/g, "-"); // collapse multiple dashes
}

export async function getAllEvents() {
  return db.select().from(eventsSchema);
}

export async function createEvent(eventData: FormData) {
  const entries = Object.fromEntries(eventData);
  const eventDate = entries.date ? new Date(entries.date as string) : null;
  const eventDataEntries = { ...entries, eventDate };
  const parsedValues = eventsFormSchema.parse(eventDataEntries);

  if(!eventDate){
    throw new Error("A data do evento é obrigatória.")
  }

  const coverPhotoUrl = await storeFileUrl(
    parsedValues.cover_image,
    BUCKET_FOLDER
  );

  const slug = stringToSlug(parsedValues.name);
  const { name, starting_time, ending_time, location, type, markdown } = parsedValues;

  const newEvent = await db.insert(eventsSchema).values({
    name,
    date: eventDate.toISOString(),
    startingTime: starting_time,
    endingTime: ending_time,
    location,
    eventType: type,
    coverImage: coverPhotoUrl ?? "",
    markdown,
    slug,
  });
}
