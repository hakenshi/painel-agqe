"use server";

import { apiClient } from "@/lib/api";
import { createUserSchema, CreateUserValues, updateUserSchema, UpdateUserValues } from "@/lib/zod/zod-user-schema";
import { revalidatePath } from "next/cache";

function formDataToObject(userData: FormData) {
  return {
    firstName: userData.get('firstName') as string,
    secondName: userData.get('secondName') as string,
    cpf: userData.get('cpf') as string,
    occupation: userData.get('occupation') as string,
    color: userData.get('color') as string,
    birthDate: userData.get('birthDate') ? new Date(userData.get('birthDate') as string) : undefined,
    joinedAt: userData.get('joinedAt') ? new Date(userData.get('joinedAt') as string) : undefined,
    password: userData.get('password') as string || undefined,
    photo: userData.get('photo') as File | null,
  };
}

export async function getAllUsers() {
  return await apiClient.get<User[]>('/users');
}

export async function createUser(userData: FormData) {
  try {
    const formData = formDataToObject(userData);
    const parsedValues = createUserSchema.safeParse(formData);

    if (!parsedValues.success) {
      throw new Error(`Dados inválidos: ${parsedValues.error.errors.map(e => e.message).join(', ')}`);
    }

    const response = await apiClient.post<CreateUserValues, User>('/users', parsedValues.data);
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
    const formData = formDataToObject(userData);
    const parsedValues = updateUserSchema.safeParse(formData);

    if (!parsedValues.success) {
      throw new Error(`Dados inválidos: ${parsedValues.error.errors.map(e => e.message).join(', ')}`);
    }

    const response = await apiClient.put<UpdateUserValues, User>(`/users/${userId}`, parsedValues.data);
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
    const response = await apiClient.delete(`/users/${userId}`) as User;
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