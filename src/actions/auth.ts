import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import { db, usersSchema } from "@/db/schema";
import { getSession, saveSession } from "@/server/session";
import jwt from "jsonwebtoken"
import { redirect } from "next/navigation";

export const login = async (cpf: string, password: string) => {
    'use server'
    const user = await db.select().from(usersSchema).where(eq(usersSchema.cpf, cpf)).limit(1);
    if (!user.length) {
        throw new Error("Usuário não encontrado");
    }
    const valid = await bcrypt.compare(password, user[0].password);

    if (!valid) {
        throw new Error("Senha inválida");
    }
    const token = jwt.sign(user[0], `${process.env.JWT_TOKEN}`)

    await saveSession(token)

    const session = await getSession()

    if (session.token) {
        redirect("/home")
    }
}

export async function getAuthUser(): Promise<typeof usersSchema.$inferSelect> {
    const { token } = await getSession()
    const decodedToken = jwt.decode(token)

    if (!decodedToken || typeof decodedToken === "string") {
        throw new Error("Token inválido ou ausente");
    }

    return decodedToken as typeof usersSchema.$inferSelect;
}