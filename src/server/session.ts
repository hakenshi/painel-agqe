'server-only'

import { cookies } from "next/headers"
import { getIronSession } from "iron-session"

const password = process.env.JWT_SECRET
if (!password) {
  throw new Error('JWT_SECRET environment variable is required')
}

export async function getSession() {
    const cookie = await cookies()

    return getIronSession<{ token: string }>(cookie, {
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

export async function saveSession(token: string) {
    const session = await getSession()
    session.token = token
    await session.save()
}

export async function destroySession() {
    const session = await getSession()
    session.token = ''
    await session.save()
}
