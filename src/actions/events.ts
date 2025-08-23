"use server";

import { apiClient } from "@/lib/api";

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
    const event = await apiClient.post('/events', data) as unknown as Event;
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