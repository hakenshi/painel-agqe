'use server'

import { db, usersSchema } from "@/db/schema";

export async function getAllUsers() {
    return db.select().from(usersSchema)
}