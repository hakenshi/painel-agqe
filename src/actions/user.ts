"use server";

import { apiClient } from "@/lib/api";
import { revalidatePath } from "next/cache";

export async function getAllUsers() {
  return await apiClient.get('/users');
}

export async function createUser(userData: FormData) {
  try {
    const response = await apiClient.post('/users', userData);
    revalidatePath("/usuarios");
    return {
      success: true,
      userData: response.firstName + ' ' + response.secondName,
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Erro ao criar usuário");
  }
}

export async function updateUser(userId: number, userData: FormData) {
  try {
    const response = await apiClient.put(`/users/${userId}`, userData);
    revalidatePath("/usuarios");
    return {
      success: true,
      userData: response.firstName + ' ' + response.secondName,
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Erro ao atualizar usuário");
  }
}

export async function deleteUser(userId: number) {
  try {
    const response = await apiClient.delete(`/users/${userId}`);
    revalidatePath("/usuarios");
    return {
      success: true,
      userData: response.firstName + ' ' + response.secondName,
    };
  } catch (error) {
    return {
      success: false,
      userData: null,
      message: error instanceof Error ? error.message : "Erro ao excluir usuário",
    };
  }
}