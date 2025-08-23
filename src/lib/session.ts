'use server'

import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

export interface SessionData {
  access_token?: string;
  user?: {
    id: number;
    firstName: string;
    secondName: string;
    cpf: string;
    occupation: string;
    color: string;
    photo?: string;
    birthDate: string;
    joinedAt: string;
  };
  isLoggedIn: boolean;
}

const defaultSession: SessionData = {
  isLoggedIn: false,
};

export async function getSession() {
  const session = await getIronSession<SessionData>(await cookies(), {
    password: process.env.SESSION_SECRET!,
    cookieName: 'agqe-session',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    },
  });

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }

  return session;
}