'use server'

import { apiClient } from "@/lib/api";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

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
    const response = await apiClient.post<LoginResponse>('/login', {
      cpf,
      password,
    });

    const cookieStore = await cookies();
    cookieStore.set('auth-token', response.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: response.expires_in,
    });

    redirect("/home");
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Erro no login");
  }
};

export async function getAuthUser() {
  try {
    return await apiClient.get('/me');
  } catch (error) {
    throw new Error("Token inválido ou ausente");
  }
}

export async function logout() {
  try {
    await apiClient.post('/logout');
    const cookieStore = await cookies();
    cookieStore.delete('auth-token');
    redirect("/login");
  } catch (error) {
    const cookieStore = await cookies();
    cookieStore.delete('auth-token');
    redirect("/login");
  }
}