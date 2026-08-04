'use server';

import { cookies } from 'next/headers';

const ADMIN_COOKIE_NAME = 'tb_admin_session';
const SESSION_EXPIRY = 60 * 60 * 24; // 24 hours

export async function verifyAdminPassword(password: string) {
  const adminPass = process.env.ADMIN_PASSWORD || 'tradeboom2026';

  if (password === adminPass) {
    const cookieStore = await cookies();
    cookieStore.set(ADMIN_COOKIE_NAME, 'authorized_session_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: SESSION_EXPIRY,
      path: '/',
      sameSite: 'strict',
    });
    return { success: true };
  }

  return { success: false, error: 'Incorrect administrator password.' };
}

export async function checkAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_COOKIE_NAME);
  return session?.value === 'authorized_session_token';
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
  return { success: true };
}
