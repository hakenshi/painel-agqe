'use server'

import { db, usersSchema } from "@/db/schema";
import { userFormSchema, UserFormValues } from "@/lib/zod/zod-user-schema";
import bcrypt from 'bcrypt';
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";

export async function getAllUsers() {
    try {
        return await db.select().from(usersSchema).orderBy(usersSchema.firstName);
    } catch (error) {
        console.error("Error fetching users:", error);
        throw new Error("Failed to fetch users");
    }
}

export async function createUser(userData: UserFormValues) {
    try {
        const parsedData = userFormSchema.parse(userData);

        if (!parsedData.password) {
            throw new Error("Password is required");
        }

        const hashedPassword = await bcrypt.hash(parsedData.password, 10);

        const newUser = await db.insert(usersSchema).values({
            ...parsedData,
            birthDate: parsedData.birthDate.toISOString().slice(0, 10),
            joinedAt: parsedData.joinedAt.toISOString().slice(0, 10),
            password: hashedPassword
        }).returning();

        revalidatePath('/usuarios');
        return {
            sucess: true,
            userData: `${newUser[0].firstName} ${newUser[0].secondName}`
        };
    } catch (error) {
        if (error instanceof ZodError) {
            console.error("Validation error:", error.errors);
            throw new Error("Invalid user data: " + error.errors.map(e => e.message).join(", "));
        }
        console.error("Error creating user:", error);
        throw new Error("Failed to create user");
    }
}

export async function updateUser(userId: number, userData: Partial<UserFormValues>) {
    try {
        const parsedData = userFormSchema.parse(userData);

        const oldUserData = await db.select().from(usersSchema).where(eq(usersSchema.id, userId))
        const updateFields = {
            ...parsedData,
            birthDate: parsedData.birthDate ? parsedData.birthDate.toISOString().slice(0, 10) : oldUserData[0].birthDate,
            joinedAt: parsedData.joinedAt ? parsedData.joinedAt.toISOString().slice(0, 10) : oldUserData[0].joinedAt
        }
        if (parsedData.password) {
            updateFields.password = await bcrypt.hash(parsedData.password, 10)
        } else {
            updateFields.password = oldUserData[0].password
        }

        const updatedUser = await db.update(usersSchema).set(updateFields).where(eq(usersSchema.id, userId)).returning();

        revalidatePath('/usuarios');
        return {
            sucess: true,
            userData: `${updatedUser[0].firstName} ${updatedUser[0].secondName}`
        };
    } catch (error) {
        if (error instanceof ZodError) {
            console.error("Validation error:", error.errors);
            throw new Error("Invalid user data: " + error.errors.map(e => e.message).join(", "));
        }
        console.error("Error updating user:", error);
        throw new Error("Failed to update user");
    }
}

export async function deleteUser(userId: number) {
    try {
        if (!userId || typeof userId !== 'number') {
            throw new Error("Valid user ID is required");
        }

        const result = await db.delete(usersSchema).where(eq(usersSchema.id, userId));
        revalidatePath('/usuarios');
        return result;
    } catch (error) {
        console.error("Error deleting user:", error);
        throw new Error("Failed to delete user");
    }
}
