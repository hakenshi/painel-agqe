"use server";

import { db } from "@/db";
import { projectsSchema } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getAllProjects() {
  // TODO: Implementar busca de todos os projetos
  return [];
}

export async function getProjectById(id: number) {
  // TODO: Implementar busca por ID
  return null;
}

export async function createProject(formData: FormData) {
  // TODO: Implementar criação de projeto
  return {
    success: false,
    message: "Não implementado",
  };
}

export async function updateProject(id: number, formData: FormData) {
  // TODO: Implementar atualização de projeto
  return {
    success: false,
    message: "Não implementado",
  };
}

export async function deleteProject(id: number) {
  // TODO: Implementar exclusão de projeto
  return {
    success: false,
    message: "Não implementado",
  };
}