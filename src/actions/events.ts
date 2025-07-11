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

function stringToSlug(str: string): string {
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
  const { date, ...restEntries } = entries;
  const parsedDate = new Date(date as string);
  const parsedValues = eventsFormSchema.parse({ date: parsedDate, ...restEntries });

  const coverImage = await storeFileUrl(parsedValues.cover_image, BUCKET_FOLDER);

  if (!coverImage) {
    throw new Error("Failed to upload cover image");
  }
  const slug = stringToSlug(parsedValues.name);
  const newEvent = await db
    .insert(eventsSchema)
    .values({
      coverImage: coverImage,
      date: new Date(parsedValues.date).toISOString(),
      endingTime: parsedValues.ending_time,
      startingTime: parsedValues.starting_time,
      location: parsedValues.location,
      markdown: parsedValues.markdown,
      name: parsedValues.name,
      eventType: parsedValues.type,
      slug: slug,
    })
    .returning();
  console.log(newEvent);
}
