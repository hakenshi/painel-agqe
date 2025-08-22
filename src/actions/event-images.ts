"use server";

import { apiClient } from "@/lib/api";
import { revalidatePath } from "next/cache";

export async function getEventImages(eventId: number) {
  return await apiClient.get(`/events/${eventId}/images`);
}

export async function addEventImage(eventId: number, imageData: FormData) {
  try {
    const response = await apiClient.post(`/events/${eventId}/images`, imageData);
    revalidatePath("/eventos");
    return {
      success: true,
      image: response,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Erro ao adicionar imagem",
    };
  }
}

export async function deleteEventImage(eventId: number, imageId: number) {
  try {
    await apiClient.delete(`/events/${eventId}/images/${imageId}`);
    revalidatePath("/eventos");
    return {
      success: true,
      message: "Imagem removida com sucesso",
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Erro ao remover imagem",
    };
  }
}