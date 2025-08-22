'use server'

import { apiClient } from "@/lib/api";

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
    const response = await apiClient.post('/donations', donationData);
    return {
      success: true,
      donation: response,
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Erro ao criar doação");
  }
}