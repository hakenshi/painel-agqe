"use server";

import { apiClient } from "@/lib/api";
import { revalidatePath } from "next/cache";

export async function getAllProjects() {
  return await apiClient.get('/projects');
}

export async function getProjectById(id: number) {
  return await apiClient.get(`/projects/${id}`);
}

export async function createProject(formData: FormData) {
  try {
    const response = await apiClient.post('/projects', formData);
    revalidatePath("/projetos");
    return {
      success: true,
      message: "Projeto criado com sucesso",
      project: response,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Erro ao criar projeto",
    };
  }
}

export async function updateProject(id: number, formData: FormData) {
  try {
    const response = await apiClient.put(`/projects/${id}`, formData);
    revalidatePath("/projetos");
    return {
      success: true,
      message: "Projeto atualizado com sucesso",
      project: response,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Erro ao atualizar projeto",
    };
  }
}

export async function deleteProject(id: number) {
  try {
    await apiClient.delete(`/projects/${id}`);
    revalidatePath("/projetos");
    return {
      success: true,
      message: "Projeto excluído com sucesso",
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Erro ao excluir projeto",
    };
  }
}