'use server'

import { db, sponsorsSchema } from "@/db/schema";

export async function getAllSponsors() {
    return db.select().from(sponsorsSchema)
}

