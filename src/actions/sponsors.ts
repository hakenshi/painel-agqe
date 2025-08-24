'use server'

import { apiClient } from "@/lib/api";
import { revalidatePath } from "next/cache";
import { createSponsorSchema, updateSponsorSchema } from "@/lib/zod/zod-sponsors-schema";

function formDataToObject(formData: FormData): Record<string, unknown> {
  const obj: Record<string, unknown> = {};
  for (const [key, value] of formData.entries()) {
    if (key === 'logo' && value instanceof File && value.size === 0) {
      continue;
    } else {
      obj[key] = value;
    }
  }
  return obj;
}

export async function getAllSponsors(): Promise<Sponsor[]> {
    return await apiClient.get('/sponsors');
}

export async function createSponsor(sponsorData: FormData) {
    try {
        const formObject = formDataToObject(sponsorData);
        const parsedValues = createSponsorSchema.safeParse(formObject);
        
        if (!parsedValues.success) {
            throw new Error(`Dados inválidos: ${parsedValues.error.errors.map(e => e.message).join(', ')}`);
        }
        
        const response = await apiClient.post('/sponsors', sponsorData);
        revalidatePath("/apoiadores");
        return {
            success: true,
            sponsor: response,
        };
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Erro ao criar apoiador");
    }
}

export async function updateSponsor(sponsorId: number, sponsorData: FormData) {
    try {
        const formObject = formDataToObject(sponsorData);
        const parsedValues = updateSponsorSchema.safeParse(formObject);
        
        if (!parsedValues.success) {
            throw new Error(`Dados inválidos: ${parsedValues.error.errors.map(e => e.message).join(', ')}`);
        }
        
        const response = await apiClient.put(`/sponsors/${sponsorId}`, sponsorData);
        revalidatePath("/apoiadores");
        return {
            success: true,
            sponsor: response,
        };
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Erro ao atualizar apoiador");
    }
}

export async function deleteSponsor(sponsorId: number) {
    try {
        await apiClient.delete(`/sponsors/${sponsorId}`);
        revalidatePath("/apoiadores");
        return {
            success: true,
            message: "Apoiador excluído com sucesso",
        };
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : "Erro ao excluir apoiador",
        };
    }
}