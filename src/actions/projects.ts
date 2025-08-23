"use server";

import { apiClient } from "@/lib/api";

export async function findProject(id: string) {
  try {
    return await apiClient.get(`/projects/${id}`);
  } catch (error) {
    console.error("Error finding project:", error);
    return null;
  }
}

export async function createProject(data: FormData) {
  try {
    return await apiClient.post('/projects', data);
  } catch (error) {
    console.error("Error creating project:", error);
    throw new Error('Falha ao criar projeto');
  }
}

export async function updateProject(id: string, data: FormData) {
  try {
    return await apiClient.put(`/projects/${id}`, data);
  } catch (error) {
    console.error("Error updating project:", error);
    throw new Error('Falha ao atualizar projeto');
  }
}