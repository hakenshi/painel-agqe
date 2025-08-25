"use server";

import { apiClient } from "@/lib/api";
import { createProjectSchema, updateProjectSchema } from "@/lib/zod/zod-projects-schema";
import { revalidatePath } from "next/cache";
import { storeFileUrl } from "@/server/bucket";

function formDataToObject(formData: FormData): Record<string, unknown> {
  const obj: Record<string, unknown> = {};
  for (const [key, value] of formData.entries()) {
    if (key === 'date' && value) {
      obj[key] = new Date(value as string);
    } else if (key === 'cover_image' && value instanceof File && value.size === 0) {
      continue;
    } else {
      obj[key] = value;
    }
  }
  return obj;
}

export async function getAllProjects() {
  try {
    return await apiClient.get<Project[]>("/projects")
  } catch {
    return []
  }
}

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
    const formObject = formDataToObject(data);
    const parsedValues = createProjectSchema.safeParse(formObject);

    if (!parsedValues.success) {
      return {
        success: false,
        message: 'Dados inválidos: ' + parsedValues.error
      };
    }

    const coverImageFile = data.get('cover_image') as File;
    const coverImageUrl = await storeFileUrl(coverImageFile, 'projects');
    
    const dataToSend = {
      ...parsedValues.data,
      cover_image: coverImageUrl
    };

    const project = await apiClient.post('/projects', dataToSend) as unknown as Project;
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
    const formObject = formDataToObject(data);
    const parsedValues = updateProjectSchema.safeParse(formObject);
    if (!parsedValues.success) {
      return {
        success: false,
        message: 'Dados inválidos: ' + parsedValues.error
      };
    }

    const coverImageFile = data.get('cover_image') as File;
    const coverImageUrl = coverImageFile?.size > 0 ? await storeFileUrl(coverImageFile, 'projects') : undefined;
    
    const dataToSend = {
      ...parsedValues.data,
      ...(coverImageUrl && { cover_image: coverImageUrl })
    };

    const project = await apiClient.put(`/projects/${id}`, dataToSend) as unknown as Project;

    revalidatePath('/home/projetos');

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

export async function deleteProject(id: number): Promise<Project> {
  try {
    const project = await apiClient.delete(`/projects/${id}`) as unknown as Project;
    revalidatePath('/projetos');
    return project;
  } catch (error) {
    console.error("Error deleting project:", error);
    throw new Error('Falha ao excluir projeto');
  }
}