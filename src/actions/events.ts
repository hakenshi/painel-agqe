"use server";

import { db } from "@/db";
import { eventsSchema } from "@/db/schema";
import { eventsFormSchema } from "@/lib/zod/zod-events-schema";
import { storeFileUrl } from "@/server/bucket";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

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

  const exists = await db.query.eventsSchema.findFirst({
    where: (events, { eq }) => eq(events.slug, stringToSlug(parsedValues.name)),
  })

  if (exists) {
    return {
      success: false,
      message: "Evento já existe com esse nome",
      error: "Evento já existe com esse nome",
    }
  }

  const coverImage = await storeFileUrl(parsedValues.cover_image, BUCKET_FOLDER);

  if (!coverImage) {
    return {
      success: false,
      message: "Erro ao fazer upload da imagem de capa",
    }
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

  if (newEvent) {
    return {
      success: true,
      message: "Evento criado com sucesso",
      event: newEvent[0],
    }
  }
  return {
    success: false,
    message: "Erro ao criar evento",
    error: "Erro ao criar evento",
  }
}

export async function deleteEvent(eventId: number) {
  const event = await db.query.eventsSchema.findFirst({
    where: eq(eventsSchema.id, eventId),
  })

  if (!event) {
    return {
      success: false,
      message: "Evento não encontrado"
    }
  }

  await db.delete(eventsSchema).where(eq(eventsSchema.id, eventId))
  revalidatePath("/eventos")
  return {
    success: true,
    message: "Evento excluído com sucesso."
  }
}