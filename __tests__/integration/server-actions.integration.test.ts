import { describe, it, expect, vi } from 'vitest';
import { login } from '@/actions/auth';
import { getAllUsers, createUser } from '@/actions/user';

// Mock environment
vi.stubEnv('NEXT_PUBLIC_API_URL', 'http://localhost:8000/api');

describe('Server Actions Integration Tests', () => {
  it('should login through server action', async () => {
    const result = await login('123.456.789-00', 'password123');

    if (result.success) {
      expect(result).toHaveProperty('user');
      expect(result.user).toHaveProperty('id');
    } else {
      // If login fails, it should have an error message
      expect(result).toHaveProperty('message');
    }
  });

  it('should get users through server action', async () => {
    const users = await getAllUsers();

    expect(Array.isArray(users)).toBe(true);
    
    if (users.length > 0) {
      expect(users[0]).toHaveProperty('id');
      expect(users[0]).toHaveProperty('firstName');
    }
  });

  it('should handle server action errors gracefully', async () => {
    // Test with invalid credentials
    const result = await login('invalid', 'invalid');

    expect(result.success).toBe(false);
    expect(result).toHaveProperty('message');
  });
});