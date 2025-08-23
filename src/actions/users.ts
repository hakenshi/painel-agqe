"use server";

import { apiClient } from "@/lib/api";

export async function getAllUsers(): Promise<User[]> {
  try {
    return await apiClient.get("/users");
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error('Falha ao carregar usuários');
  }
}

export async function createUser(data: FormData) {
  try {
    const userData = {
      firstName: data.get('firstName') as string,
      secondName: data.get('secondName') as string,
      cpf: data.get('cpf') as string,
      occupation: data.get('occupation') as string,
      color: data.get('color') as string,
      birthDate: data.get('birthDate') as string,
      joinedAt: data.get('joinedAt') as string,
      password: data.get('password') as string,
    };

    return await apiClient.post("/users", userData);
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error('Falha ao criar usuário');
  }
}