"use server";

import { db } from "@/db";
import { projectsSchema } from "@/db/schema";
import { updateProjectSchema, createProjectSchema } from "@/lib/zod/zod-projects-schema";
import { storeFileUrl, updateFileInBucket } from "@/server/bucket";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

const BUCKET_FOLDER = "projects";

function stringToSlug(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function getAllProjects() {
  return db.select().from(projectsSchema);
}

export async function createProject(projectData: FormData) {
  const entries = Object.fromEntries(projectData);
  const { date, ...restEntries } = entries;
  const parsedDate = date ? new Date(date as string) : null;
  const parsedValues = createProjectSchema.parse({
    date: parsedDate,
    ...restEntries,
  });

  const exists = await db.query.projectsSchema.findFirst({
    where: (projects, { eq }) => eq(projects.slug, stringToSlug(parsedValues.name)),
  });

  if (exists) {
    return {
      success: false,
      message: "Projeto já existe com esse nome",
      error: "Projeto já existe com esse nome",
    };
  }

  const coverImage = await storeFileUrl(
    parsedValues.cover_image,
    BUCKET_FOLDER
  );

  if (!coverImage) {
    return {
      success: false,
      message: "Erro ao fazer upload da imagem de capa",
    };
  }

  const slug = stringToSlug(parsedValues.name);
  const newProject = await db
    .insert(projectsSchema)
    .values({
      coverImage: coverImage,
      date: parsedValues.date ? parsedValues.date.toISOString() : null,
      endingTime: parsedValues.ending_time,
      startingTime: parsedValues.starting_time,
      location: parsedValues.location,
      markdown: parsedValues.markdown,
      name: parsedValues.name,
      projectType: parsedValues.type,
      responsibles: parsedValues.responsibles,
      status: parsedValues.status,
      slug: slug,
    })
    .returning();

  if (newProject) {
    return {
      success: true,
      message: "Projeto criado com sucesso",
      project: newProject[0],
    };
  }
  return {
    success: false,
    message: "Erro ao criar projeto",
    error: "Erro ao criar projeto",
  };
}

export async function findProject(projectId: number) {
  return await db.query.projectsSchema.findFirst({
    where: eq(projectsSchema.id, projectId),
  });
}

export async function updateProject(projectId: number, projectData: FormData) {
  const entries = Object.fromEntries(projectData);
  const { date, ...restEntries } = entries;
  
  const parsedValues = updateProjectSchema.parse({
    date: date ? new Date(date as string) : undefined,
    ...restEntries,
  });

  const existingProject = await db.query.projectsSchema.findFirst({
    where: eq(projectsSchema.id, projectId),
  });

  if (!existingProject) {
    return {
      success: false,
      message: "Projeto não encontrado",
    };
  }

  let coverImageUrl = existingProject.coverImage;
  
  if (parsedValues.cover_image) {
    const updatedImageUrl = await updateFileInBucket(
      existingProject.coverImage,
      parsedValues.cover_image,
      BUCKET_FOLDER
    );
    if (updatedImageUrl) {
      coverImageUrl = updatedImageUrl;
    }
  }

  const updatedProject = await db
    .update(projectsSchema)
    .set({
      name: parsedValues.name ?? existingProject.name,
      projectType: parsedValues.type ?? existingProject.projectType,
      responsibles: parsedValues.responsibles ?? existingProject.responsibles,
      status: parsedValues.status ?? existingProject.status,
      location: parsedValues.location ?? existingProject.location,
      date: parsedValues.date ? parsedValues.date.toISOString() : existingProject.date,
      startingTime: parsedValues.starting_time ?? existingProject.startingTime,
      endingTime: parsedValues.ending_time ?? existingProject.endingTime,
      markdown: parsedValues.markdown ?? existingProject.markdown,
      coverImage: coverImageUrl,
      slug: parsedValues.name ? stringToSlug(parsedValues.name) : existingProject.slug,
    })
    .where(eq(projectsSchema.id, projectId))
    .returning();

  revalidatePath("/projetos");
  return {
    success: true,
    message: "Projeto atualizado com sucesso",
    project: updatedProject[0],
  };
}

export async function deleteProject(projectId: number) {
  const project = await db.query.projectsSchema.findFirst({
    where: eq(projectsSchema.id, projectId),
  });

  if (!project) {
    return {
      success: false,
      message: "Projeto não encontrado",
    };
  }

  await db.delete(projectsSchema).where(eq(projectsSchema.id, projectId));
  revalidatePath("/projetos");
  return {
    success: true,
    message: "Projeto excluído com sucesso.",
  };
}