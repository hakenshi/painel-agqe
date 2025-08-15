'use server'

import { db } from "@/db";
import { sponsorsSchema } from "@/db/schema";
import { logger } from "@/lib/logger";
import { storeFileUrl, updateFileInBucket, deleteFileFromBucket } from "@/server/bucket";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

const BUCKET_FOLDER = "sponsors";

export async function getAllSponsors() {
    try {
        return await db.select().from(sponsorsSchema).orderBy(sponsorsSchema.name);
    } catch (error) {
        logger.error("Error fetching sponsors", error);
        throw new Error("Failed to fetch sponsors");
    }
}

export async function createSponsor(sponsorData: {
    name: string;
    logo: File;
    website: string;
}) {
    try {
        const logoUrl = await storeFileUrl(sponsorData.logo, BUCKET_FOLDER);
        
        if (!logoUrl) {
            throw new Error("Failed to upload logo");
        }

        const newSponsor = await db
            .insert(sponsorsSchema)
            .values({
                name: sponsorData.name,
                logo: logoUrl,
                website: sponsorData.website,
                sponsoringSince: new Date(),
            })
            .returning();

        revalidatePath("/apoiadores");
        return {
            success: true,
            sponsor: newSponsor[0],
        };
    } catch (error) {
        logger.error("Error creating sponsor", error);
        throw new Error("Failed to create sponsor");
    }
}

export async function updateSponsor(
    sponsorId: number,
    sponsorData: {
        name: string;
        logo?: File;
        website: string;
    }
) {
    try {
        const oldSponsor = await db.query.sponsorsSchema.findFirst({
            where: eq(sponsorsSchema.id, sponsorId),
        });

        if (!oldSponsor) {
            logger.error("Sponsor not found for update", { sponsorId });
            throw new Error("Sponsor not found");
        }

        let logoUrl = oldSponsor.logo;

        if (sponsorData.logo) {
            const updatedLogoUrl = await updateFileInBucket(
                oldSponsor.logo,
                sponsorData.logo,
                BUCKET_FOLDER
            );
            if (updatedLogoUrl) {
                logoUrl = updatedLogoUrl;
            }
        }

        const updatedSponsor = await db
            .update(sponsorsSchema)
            .set({
                name: sponsorData.name,
                logo: logoUrl,
                website: sponsorData.website,
            })
            .where(eq(sponsorsSchema.id, sponsorId))
            .returning();

        revalidatePath("/apoiadores");
        return {
            success: true,
            sponsor: updatedSponsor[0],
        };
    } catch (error) {
        logger.error("Error updating sponsor", error);
        throw new Error("Failed to update sponsor");
    }
}

export async function deleteSponsor(sponsorId: number) {
    try {
        const sponsorToDelete = await db.query.sponsorsSchema.findFirst({
            where: eq(sponsorsSchema.id, sponsorId),
        });

        if (!sponsorToDelete) {
            logger.info("Sponsor not found for deletion", { sponsorId });
            return {
                success: false,
                message: "Apoiador não encontrado",
            };
        }

        // Delete logo from bucket
        if (sponsorToDelete.logo) {
            const r2PublicDomain = process.env.NEXT_PUBLIC_CLOUDFLARE_R2_ENDPOINT;
            if (r2PublicDomain) {
                const baseUrl = `${r2PublicDomain}/`;
                let objectKey = sponsorToDelete.logo;

                if (sponsorToDelete.logo.startsWith(baseUrl)) {
                    objectKey = sponsorToDelete.logo.substring(baseUrl.length);
                }

                try {
                    await deleteFileFromBucket(objectKey);
                } catch (error) {
                    logger.error("Failed to delete sponsor logo", { objectKey, error });
                }
            }
        }

        await db.delete(sponsorsSchema).where(eq(sponsorsSchema.id, sponsorId));
        revalidatePath("/apoiadores");

        return {
            success: true,
            message: "Apoiador excluído com sucesso",
        };
    } catch (error) {
        logger.error("Error deleting sponsor", error);
        throw new Error("Failed to delete sponsor");
    }
}