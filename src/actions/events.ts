"use server";

import { apiClient } from "@/lib/api";
import { createEventSchema } from "@/lib/zod/zod-events-schema";
import { storeFileUrl } from "@/server/bucket";

function formDataToObject(formData: FormData): Record<string, unknown> {
  const obj: Record<string, unknown> = {};
  
  for (const [key, value] of formData.entries()) {
    if (key === 'date' && value) {
      obj[key] = new Date(value as string);
    } else if (key === 'cover_image' && value instanceof File) {
      obj[key] = value;
    } else {
      obj[key] = value;
    }
  }
  
  return obj;
}

export async function getAllEvents() {
  try {
    return await apiClient.get<Event[]>("/events");
  } catch (error) {
    console.error("Error fetching events:", error);
    throw new Error('Falha ao carregar eventos');
  }
}

export async function findEvent(id: number) {
  try {
    return await apiClient.get<Event>(`/events/${id}`);
  } catch (error) {
    console.error("Error finding event:", error);
    return null;
  }
}

export async function createEvent(data: FormData): Promise<{ success: boolean; event?: Event; message?: string; error?: string }> {
  try {
    const formObject = formDataToObject(data);
    const parsedValues = createEventSchema.safeParse(formObject);
    
    if (!parsedValues.success) {
      return {
        success: false,
        error: `Dados inválidos: ${parsedValues.error.errors.map(e => e.message).join(', ')}`
      };
    }
    
    const coverImageFile = data.get('cover_image') as File;
    const coverImageUrl = await storeFileUrl(coverImageFile, 'events');
    
    const dataToSend = {
      name: parsedValues.data.name,
      eventType: parsedValues.data.type,
      location: parsedValues.data.location,
      date: parsedValues.data.date,
      starting_time: parsedValues.data.starting_time,
      ending_time: parsedValues.data.ending_time,
      cover_image: coverImageUrl,
      markdown: parsedValues.data.markdown
    };
    
    const event = await apiClient.post('/events', dataToSend) as unknown as Event;
    return {
      success: true,
      event,
      message: "Evento criado com sucesso"
    };
  } catch (error) {
    console.error("Error creating event:", error);
    return {
      success: false,
      error: 'Falha ao criar evento'
    };
  }
}

export async function deleteEvent(id: number): Promise<Event> {
  try {
    return await apiClient.delete(`/events/${id}`);
  } catch (error) {
    console.error("Error deleting event:", error);
    throw new Error('Falha ao deletar evento');
  }
}