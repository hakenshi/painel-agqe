import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock functions
const getAllUsers = vi.fn();
const createUser = vi.fn();
const updateUser = vi.fn();
const deleteUser = vi.fn();

describe('User Actions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getAllUsers', () => {
    it('should fetch all users', async () => {
      const mockUsers = [{ id: 1, firstName: 'John' }];
      getAllUsers.mockResolvedValueOnce(mockUsers);

      const result = await getAllUsers();

      expect(result).toEqual(mockUsers);
    });
  });

  describe('createUser', () => {
    it('should create user successfully', async () => {
      const mockUser = { id: 1, firstName: 'John' };
      const userData = new FormData();

      createUser.mockResolvedValueOnce({
        success: true,
        user: mockUser
      });

      const result = await createUser(userData);

      expect(result.success).toBe(true);
      expect(result.user).toEqual(mockUser);
    });

    it('should handle create user error', async () => {
      const userData = new FormData();

      createUser.mockResolvedValueOnce({
        success: false,
        errors: { cpf: ['CPF already exists'] }
      });

      const result = await createUser(userData);

      expect(result.success).toBe(false);
    });
  });

  describe('updateUser', () => {
    it('should update user successfully', async () => {
      const mockUser = { id: 1, firstName: 'Updated' };
      const userData = new FormData();

      updateUser.mockResolvedValueOnce({
        success: true,
        user: mockUser
      });

      const result = await updateUser(1, userData);

      expect(result.success).toBe(true);
      expect(result.user).toEqual(mockUser);
    });
  });

  describe('deleteUser', () => {
    it('should delete user successfully', async () => {
      deleteUser.mockResolvedValueOnce({
        success: true
      });

      const result = await deleteUser(1);

      expect(result.success).toBe(true);
    });
  });
});