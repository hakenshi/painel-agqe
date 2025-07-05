'use server'

import { db } from "@/db";
import { sponsorsSchema } from "@/db/schema";

export async function getAllSponsors() {
    return db.select().from(sponsorsSchema)
}

