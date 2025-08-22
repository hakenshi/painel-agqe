import { describe, it, expect, beforeAll, afterAll } from 'vitest';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

describe('Users Integration Tests', () => {
  let authToken: string;
  let createdUserId: number;

  beforeAll(async () => {
    // Login to get auth token
    const loginResponse = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cpf: '123.456.789-00',
        password: 'password123'
      })
    });
    
    if (loginResponse.ok) {
      const { access_token } = await loginResponse.json();
      authToken = access_token;
    }
  });

  afterAll(async () => {
    // Cleanup created user
    if (createdUserId && authToken) {
      await fetch(`${API_URL}/users/${createdUserId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${authToken}` }
      });
    }
  });

  it('should get all users', async () => {
    const response = await fetch(`${API_URL}/users`);

    expect(response.ok).toBe(true);
    
    const users = await response.json();
    expect(Array.isArray(users)).toBe(true);
  });

  it('should create a new user', async () => {
    if (!authToken) return;

    const userData = {
      cpf: '987.654.321-00',
      first_name: 'Test',
      second_name: 'User',
      occupation: 'Developer',
      password: 'password123',
      birth_date: '1990-01-01',
      joined_at: '2024-01-01',
      color: 'blue'
    };

    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    expect(response.status).toBe(201);
    
    const user = await response.json();
    expect(user).toHaveProperty('id');
    expect(user.firstName).toBe('Test');
    
    createdUserId = user.id;
  });

  it('should update user', async () => {
    if (!authToken || !createdUserId) return;

    const response = await fetch(`${API_URL}/users/${createdUserId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        first_name: 'Updated Test'
      })
    });

    expect(response.ok).toBe(true);
    
    const user = await response.json();
    expect(user.firstName).toBe('Updated Test');
  });

  it('should get single user', async () => {
    if (!createdUserId) return;

    const response = await fetch(`${API_URL}/users/${createdUserId}`);

    expect(response.ok).toBe(true);
    
    const user = await response.json();
    expect(user.id).toBe(createdUserId);
  });
});