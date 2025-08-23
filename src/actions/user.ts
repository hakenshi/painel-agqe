"use server";

import { apiClient } from "@/lib/api";
import { revalidatePath } from "next/cache";

export async function getAllUsers() {
  return await apiClient.get('/users');
}

export async function createUser(userData: FormData) {
  try {
    const formData = {
      firstName: userData.get('firstName') as string,
      secondName: userData.get('secondName') as string,
      cpf: userData.get('cpf') as string,
      occupation: userData.get('occupation') as string,
      color: userData.get('color') as string,
      birthDate: userData.get('birthDate') as string,
      joinedAt: userData.get('joinedAt') as string,
      password: userData.get('password') as string,
    };
    const response = await apiClient.post('/users', formData);
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
    const formData = {
      firstName: userData.get('firstName') as string,
      secondName: userData.get('secondName') as string,
      cpf: userData.get('cpf') as string,
      occupation: userData.get('occupation') as string,
      color: userData.get('color') as string,
      birthDate: userData.get('birthDate') as string,
      joinedAt: userData.get('joinedAt') as string,
      password: userData.get('password') as string,
    };
    const response = await apiClient.put(`/users/${userId}`, formData);
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