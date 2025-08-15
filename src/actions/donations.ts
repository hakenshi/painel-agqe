'use server'

import { db } from "@/db";
import { donationsSchema } from "@/db/donations-schema";
import { logger } from "@/lib/logger";

export async function getAllDonations() {
  try {
    return await db.select().from(donationsSchema).orderBy(donationsSchema.createdAt);
  } catch (error) {
    logger.error("Error fetching donations", error);
    throw new Error("Failed to fetch donations");
  }
}

export async function createDonation(donationData: {
  amount: number;
  donorName?: string;
  donorEmail?: string;
  message?: string;
}) {
  try {
    const newDonation = await db
      .insert(donationsSchema)
      .values(donationData)
      .returning();
    
    return {
      success: true,
      donation: newDonation[0],
    };
  } catch (error) {
    logger.error("Error creating donation", error);
    throw new Error("Failed to create donation");
  }
}