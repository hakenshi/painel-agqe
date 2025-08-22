import { describe, it, expect, beforeAll, afterAll } from 'vitest';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

describe('Auth Integration Tests', () => {
  let authToken: string;

  beforeAll(async () => {
    // Setup test user if needed
  });

  afterAll(async () => {
    // Cleanup
  });

  it('should login with valid credentials', async () => {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cpf: '123.456.789-00',
        password: 'password123'
      })
    });

    expect(response.ok).toBe(true);
    
    const data = await response.json();
    expect(data).toHaveProperty('access_token');
    expect(data).toHaveProperty('user');
    
    authToken = data.access_token;
  });

  it('should reject invalid credentials', async () => {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cpf: '123.456.789-00',
        password: 'wrongpassword'
      })
    });

    expect(response.status).toBe(401);
    
    const data = await response.json();
    expect(data).toHaveProperty('error');
  });

  it('should get authenticated user', async () => {
    if (!authToken) return;

    const response = await fetch(`${API_URL}/me`, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
      }
    });

    expect(response.ok).toBe(true);
    
    const user = await response.json();
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('firstName');
  });

  it('should logout successfully', async () => {
    if (!authToken) return;

    const response = await fetch(`${API_URL}/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authToken}`,
      }
    });

    expect(response.ok).toBe(true);
    
    const data = await response.json();
    expect(data).toHaveProperty('message');
  });
});