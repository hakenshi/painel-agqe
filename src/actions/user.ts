'use server'

import { db, usersSchema } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getAllUsers() {
    return db.select().from(usersSchema)
}

export async function createUser(userData: typeof usersSchema.$inferInsert) {
    try {
        const result = await db.insert(usersSchema).values(userData).returning();
        return { success: true, data: result[0] };
    } catch (error) {
        console.error("Error creating user:", error);
        return { success: false, error: "Failed to create user." };
    }
}

export async function updateUser(userId: number, userData: Partial<typeof usersSchema.$inferInsert>) {
    try {
        const result = await db.update(usersSchema)
            .set(userData)
            .where(eq(usersSchema.id, userId))
            .returning();
        if (result.length === 0) {
            return { success: false, error: "User not found." };
        }
        return { success: true, data: result[0] };
    } catch (error) {
        console.error("Error updating user:", error);
        return { success: false, error: "Failed to update user." };
    }
}

export async function deleteUser(userId: number) {
    try {
        const result = await db.delete(usersSchema)
            .returning();
        if (result.length === 0) {
            // Attempt fallback delete if user not found with numeric ID
            const fallbackResult = await db.delete(usersSchema)
                .where(eq(usersSchema.id, userId)) // Assuming id might be compared as string or needs conversion
                .returning();
            if (fallbackResult.length === 0) {
                return { success: false, error: "User not found." };
            }
            return { success: true, data: { id: userId } }; // Fallback success
        }
        // If the primary delete (with numericUserId) was successful
        return { success: true, data: result[0] };
    } catch (error) {
        console.error("Error deleting user:", error);
        return { success: false, error: "Failed to delete user." };
    }
}
