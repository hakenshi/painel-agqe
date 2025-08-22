'use server'

import { apiClient } from "@/lib/api";
import { revalidatePath } from "next/cache";

export async function getAllSponsors() {
    return await apiClient.get('/sponsors');
}

export async function createSponsor(sponsorData: FormData) {
    try {
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