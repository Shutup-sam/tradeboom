import { submitContactForm, subscribeNewsletter } from '@/actions/actions';
import { expect, test, describe, vi, beforeEach } from 'vitest';

// Mock next/cache revalidatePath helper
vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}));

// Mock Supabase client to remain offline in tests
vi.mock('@/lib/supabase', () => ({
  supabase: null,
}));

// Mock fs module and promises sub-module
vi.mock('fs', () => {
  const mockPromises = {
    mkdir: vi.fn(),
    readFile: vi.fn().mockRejectedValue(new Error('File not found')),
    writeFile: vi.fn(),
  };
  return {
    promises: mockPromises,
    default: {
      promises: mockPromises,
    },
  };
});

// Mock global fetch for Telegram bot notifications
global.fetch = vi.fn().mockResolvedValue({
  ok: true,
  json: async () => ({}),
} as Response);

describe('Server Actions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('submitContactForm validates and parses valid fields successfully', async () => {
    const formData = new FormData();
    formData.append('firstName', 'Ankit');
    formData.append('lastName', 'Kirola');
    formData.append('email', 'ankit@tradeboom.in');
    formData.append('interest', 'Beginner Trading');
    formData.append('message', 'Hello, this is a test message!');

    const result = await submitContactForm(null, formData);

    expect(result.success).toBe(true);
    expect(result.message).toContain('successfully');
  });

  test('submitContactForm fails on empty first name or invalid email', async () => {
    const formData = new FormData();
    formData.append('firstName', '');
    formData.append('email', 'invalid-email');
    formData.append('interest', 'Beginner Trading');

    const result = await submitContactForm(null, formData);

    expect(result.success).toBe(false);
    expect(result.errors?.firstName?.[0]).toContain('required');
    expect(result.errors?.email?.[0]).toContain('Invalid email');
  });

  test('subscribeNewsletter succeeds on valid email structure', async () => {
    const result = await subscribeNewsletter('subscribe@tradeboom.in');
    expect(result.success).toBe(true);
  });

  test('subscribeNewsletter fails on invalid email', async () => {
    const result = await subscribeNewsletter('bad-email');
    expect(result.success).toBe(false);
    expect(result.message).toContain('Invalid email');
  });
});
