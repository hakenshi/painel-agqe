"use server";

import { apiClient } from "@/lib/api";

export async function getAllEvents() {
  try {
    return await apiClient.get("/events");
  } catch (error) {
    console.error("Error fetching events:", error);
    throw new Error('Falha ao carregar eventos');
  }
}

export async function findEvent(id: number) {
  try {
    return await apiClient.get(`/events/${id}`);
  } catch (error) {
    console.error("Error finding event:", error);
    return null;
  }
}

export async function createEvent(data: FormData) {
  try {
    return await apiClient.post('/events', data);
  } catch (error) {
    console.error("Error creating event:", error);
    throw new Error('Falha ao criar evento');
  }
}

export async function deleteEvent(id: number) {
  try {
    return await apiClient.delete(`/events/${id}`);
  } catch (error) {
    console.error("Error deleting event:", error);
    throw new Error('Falha ao deletar evento');
  }
}