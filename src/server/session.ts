'server-only'

import { usersSchema } from './../db/schema';
import { cookies } from "next/headers"
import { getIronSession } from "iron-session"

const password = `${process.env.NEXT_JWT_SECRET}`

export async function getSession() {
    const cookie = await cookies()
    return getIronSession<{ token: string, user: string }>(cookie, {
        password,
        cookieName: "token",
        ttl: 0,
        cookieOptions: {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production" ? true : false,
            sameSite: "lax",
        }
    })
}

export async function saveSession({ token, user }: { token: string, user: typeof usersSchema.$inferSelect }) {
    const session = await getSession()
    session.token = token
    session.user = JSON.stringify(user)
    await session.save()
}

export async function destroySession() {
    const session = await getSession()
    await session.destroy()
}
