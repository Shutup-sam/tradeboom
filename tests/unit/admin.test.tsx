import { verifyAdminPassword, checkAdminSession, logoutAdmin } from '@/actions/admin';
import { expect, test, describe, vi, beforeEach } from 'vitest';

const mockSet = vi.fn();
const mockGet = vi.fn();
const mockDelete = vi.fn();

// Mock next/headers cookies store
vi.mock('next/headers', () => ({
  cookies: async () => ({
    set: mockSet,
    get: mockGet,
    delete: mockDelete,
  }),
}));

describe('Admin Server Actions Authentication', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('verifyAdminPassword sets session cookie upon matching password', async () => {
    const result = await verifyAdminPassword('tradeboom2026');

    expect(result.success).toBe(true);
    expect(mockSet).toHaveBeenCalledWith(
      'tb_admin_session',
      'authorized_session_token',
      expect.any(Object)
    );
  });

  test('verifyAdminPassword rejects incorrect password credentials', async () => {
    const result = await verifyAdminPassword('wrongpassword');

    expect(result.success).toBe(false);
    expect(result.error).toContain('Incorrect');
    expect(mockSet).not.toHaveBeenCalled();
  });

  test('checkAdminSession reads session cookie successfully', async () => {
    mockGet.mockReturnValue({ value: 'authorized_session_token' });
    const isSessionValid = await checkAdminSession();

    expect(isSessionValid).toBe(true);
    expect(mockGet).toHaveBeenCalledWith('tb_admin_session');
  });

  test('logoutAdmin deletes the session cookie', async () => {
    const result = await logoutAdmin();

    expect(result.success).toBe(true);
    expect(mockDelete).toHaveBeenCalledWith('tb_admin_session');
  });
});
