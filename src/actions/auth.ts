'use server'

import { apiClient } from "@/lib/api";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

interface LoginResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  user: {
    id: number;
    firstName: string;
    secondName: string;
    cpf: string;
    occupation: string;
    color: string;
    photo?: string;
    birthDate: string;
    joinedAt: string;
  };
}

export const login = async (cpf: string, password: string) => {
  try {
    const response = await apiClient.post('/login', { cpf, password }) as unknown as LoginResponse;
    
    const session = await getSession();
    session.access_token = response.access_token;
    session.user = response.user;
    session.isLoggedIn = true;
    await session.save();

    redirect("/home");
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Erro no login");
  }
};

export async function getAuthUser() {
  const session = await getSession();
  
  if (!session.isLoggedIn || !session.access_token) {
    throw new Error("Token inválido ou ausente");
  }
  
  try {
    return await apiClient.get('/me');
  } catch {
    await logout();
    throw new Error("Token inválido ou ausente");
  }
}

export async function logout() {
  const session = await getSession();
  
  try {
    if (session.access_token) {
      await apiClient.post('/logout');
    }
  } catch {
    // Ignora erro da API
  } finally {
    session.destroy();
    redirect("/login");
  }
}