'use server'

import { db, usersSchema } from "@/db/schema";
import { userFormSchema, UserFormValues } from "@/lib/zod/zod-user-schema";
import { deleteFileFromBucket, storeFileUrl, updateFileInBucket, uploadFileToBucket } from "@/server/bucket";
import bcrypt from 'bcrypt';
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { v6 } from "uuid";
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
            photo: await storeFileUrl(parsedData.photo),
            birthDate: parsedData.birthDate.toISOString().slice(0, 10),
            joinedAt: parsedData.joinedAt.toISOString().slice(0, 10),
            password: hashedPassword
        }).returning();

        revalidatePath('/usuarios');
        return {
            success: true,
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

        const oldUserData = await db.query.usersSchema.findFirst({
            where: eq(usersSchema.id, userId)
        })

        if (!oldUserData) {
            console.error("User not found")
            throw new Error("User not found")
        }

        const updateFields: Partial<typeof usersSchema.$inferInsert> = {
            birthDate: parsedData.birthDate ? parsedData.birthDate.toISOString().slice(0, 10) : oldUserData.birthDate,
            joinedAt: parsedData.joinedAt ? parsedData.joinedAt.toISOString().slice(0, 10) : oldUserData.joinedAt
        }
        if (parsedData.password) {
            updateFields.password = await bcrypt.hash(parsedData.password, 10)
        } else {
            updateFields.password = oldUserData.password
        }

        if (oldUserData.photo) {
            const updatedFileUrl = await updateFileInBucket(oldUserData.photo, parsedData.photo)
            if (updatedFileUrl) {
                updateFields.photo = updatedFileUrl
            }
        } else if (parsedData.photo) {
            const newFileUrl = await storeFileUrl(parsedData.photo)
            if (newFileUrl) {
                updateFields.photo = newFileUrl
            }
        }
        const updatedUser = await db.update(usersSchema).set({
            ...updateFields,
            firstName: parsedData.firstName,
            secondName: parsedData.secondName,
            color: parsedData.color,
            cpf: parsedData.cpf,
            occupation: parsedData.occupation,
        }).where(eq(usersSchema.id, userId)).returning();

        revalidatePath('/usuarios');
        return {
            success: true,
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

        const userToDelete = await db.query.usersSchema.findFirst({
            where: eq(usersSchema.id, userId),
            columns: {
                photo: true,
                firstName: true,
                secondName: true
            }
        })

        if (!userToDelete) {
            console.log(`User not found`)
            revalidatePath("/")
            return {
                success: false,
                userData: null,
                message: "Usuário não encontrado"
            }
        }

        if (userToDelete.photo) {
            const photoUrl = userToDelete.photo
            const r2PublicDOmain = process.env.NEXT_PUBLIC_CLOUDFLARE_R2_ENDPOINT
            if (!r2PublicDOmain) {
                throw new Error("Bucket public url is undefined.")
            }

            const baseUrl = `${r2PublicDOmain}/`
            let objectKey = photoUrl

            if (photoUrl.startsWith(baseUrl)) {
                objectKey = photoUrl.substring(baseUrl.length)
            } else {
                console.warn(`Url of file ${photoUrl} doesn't start with expected base url "${baseUrl}"`)
            }

            if (objectKey) {
                try {
                    await deleteFileFromBucket(objectKey)
                } catch (error) {
                    console.error(`Failed to deleted file ${objectKey}`, error)
                    throw new Error(`Faild to remove file from storage`)
                }
            }

        }

        const deletedUser = await db.delete(usersSchema).where(eq(usersSchema.id, userId)).returning({
            firstName: usersSchema.firstName,
            secondName: usersSchema.secondName
        });

        revalidatePath('/usuarios');

        return {
            success: true,
            userData: deletedUser.length > 0
                ? `${deletedUser[0].firstName} ${deletedUser[0].secondName}`
                : null
        };
    } catch (error) {
        console.error("Error deleting user:", error);
        if (error instanceof Error) {
            throw new Error(error.message)
        }

        throw new Error("Failed to delete user");
    }
}
