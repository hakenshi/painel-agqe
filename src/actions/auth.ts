"use server";

import { apiClient } from "@/lib/api";
import { redirect } from "next/navigation";
import { destroySession, getSession, saveSession } from "@/server/session";
import { cache } from "react";

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

export const login = async (
  cpf: string,
  password: string
): Promise<{ success: boolean; user?: User; message?: string }> => {
  try {
    if (!password || password.trim() === '') {
      return {
        success: false,
        message: "Senha é obrigatória para acessar o sistema",
      };
    }

    const response = await apiClient.post<{ cpf: string, password: string }, LoginResponse>("/login", {
      cpf,
      password,
    });
    if (!response.access_token) {
      return {
        success: false,
        message: "Credenciais inválidas ou usuário sem senha cadastrada",
      };
    }
    await saveSession(response.access_token);
    return {
      success: true,
      message: "Login efetuado com sucesso.",
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Credenciais inválidas ou usuário sem senha cadastrada",
    };
  }
};
export const getAuthUser = cache(async () => {
  const session = await getSession();

  if (!session.token) {
    throw new Error("Token inválido ou ausente");
  }

  try {
    return await apiClient.get<User>("/me");
  } catch {
    await logout();
    throw new Error("Token inválido ou ausente");
  }
});

export async function logout() {
  const session = await getSession();

  try {
    if (session.token) {
      await apiClient.post("/logout");
    }
  } catch {
    // Ignora erro da API
  } finally {
    destroySession()
    redirect("/login");
  }
}
