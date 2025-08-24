'use server'

import { apiClient } from "@/lib/api";
import { createDonationSchema } from "@/lib/zod/zod-donations-schema";

export async function getAllDonations() {
  return await apiClient.get('/donations');
}

export async function createDonation(donationData: {
  amount: number;
  donorName?: string;
  donorEmail?: string;
  message?: string;
}) {
  try {
    const parsedValues = createDonationSchema.safeParse(donationData);
    
    if (!parsedValues.success) {
      throw new Error(`Dados inválidos: ${parsedValues.error.errors.map(e => e.message).join(', ')}`);
    }
    
    const response = await apiClient.post('/donations', donationData);
    return {
      success: true,
      donation: response,
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Erro ao criar doação");
  }
}