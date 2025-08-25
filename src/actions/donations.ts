'use server'

import { apiClient } from "@/lib/api";
import { createDonationSchema } from "@/lib/zod/zod-donations-schema";

export async function getAllDonations() {
  try {
    return await apiClient.get('/donations');
  } catch {
    return [];
  }
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
      return {
        success: false,
        donation: null,
        message: `Dados inválidos: ${parsedValues.error.errors.map(e => e.message).join(', ')}`
      };
    }

    const response = await apiClient.post('/donations', parsedValues.data);
    return {
      success: true,
      donation: response,
    };
  } catch (error) {
    return {
      success: false,
      donation: null,
      message: error instanceof Error ? error.message : "Erro ao criar doação"
    };
  }
}