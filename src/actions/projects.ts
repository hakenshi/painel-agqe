"use server";

import { apiClient } from "@/lib/api";

export async function findProject(id: string): Promise<Project | null> {
  try {
    return await apiClient.get(`/projects/${id}`);
  } catch (error) {
    console.error("Error finding project:", error);
    return null;
  }
}

export async function createProject(data: FormData): Promise<{ success: boolean; project?: Project; message?: string }> {
  try {
    const project = await apiClient.post('/projects', data) as unknown as Project;
    return {
      success: true,
      project,
      message: "Projeto criado com sucesso"
    };
  } catch (error) {
    console.error("Error creating project:", error);
    return {
      success: false,
      message: 'Falha ao criar projeto'
    };
  }
}

export async function updateProject(id: string, data: FormData): Promise<{ success: boolean; project?: Project; message?: string }> {
  try {
    const project = await apiClient.put(`/projects/${id}`, data) as unknown as Project;
    return {
      success: true,
      project,
      message: "Projeto atualizado com sucesso"
    };
  } catch (error) {
    console.error("Error updating project:", error);
    return {
      success: false,
      message: 'Falha ao atualizar projeto'
    };
  }
}