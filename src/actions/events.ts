"use server";

import { apiClient } from "@/lib/api";
import { revalidatePath } from "next/cache";

export async function getAllEvents() {
  return await apiClient.get('/events');
}

export async function createEvent(eventData: FormData) {
  try {
    const response = await apiClient.post('/events', eventData);
    revalidatePath("/eventos");
    return {
      success: true,
      message: "Evento criado com sucesso",
      event: response,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Erro ao criar evento",
    };
  }
}

export async function findEvent(eventId: number) {
  return await apiClient.get(`/events/${eventId}`);
}

export async function updateEvent(eventId: number, eventData: FormData) {
  try {
    const response = await apiClient.put(`/events/${eventId}`, eventData);
    revalidatePath("/eventos");
    return {
      success: true,
      message: "Evento atualizado com sucesso",
      event: response,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Erro ao atualizar evento",
    };
  }
}

export async function deleteEvent(eventId: number) {
  try {
    await apiClient.delete(`/events/${eventId}`);
    revalidatePath("/eventos");
    return {
      success: true,
      message: "Evento excluído com sucesso",
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Erro ao excluir evento",
    };
  }
}
