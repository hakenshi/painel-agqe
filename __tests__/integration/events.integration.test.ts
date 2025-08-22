import { describe, it, expect, beforeAll, afterAll } from 'vitest';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

describe('Events Integration Tests', () => {
  let authToken: string;
  let createdEventId: number;

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
    // Cleanup created event
    if (createdEventId && authToken) {
      await fetch(`${API_URL}/events/${createdEventId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${authToken}` }
      });
    }
  });

  it('should get all events (public)', async () => {
    const response = await fetch(`${API_URL}/events`);

    expect(response.ok).toBe(true);
    
    const events = await response.json();
    expect(Array.isArray(events)).toBe(true);
  });

  it('should create a new event', async () => {
    if (!authToken) return;

    const eventData = {
      name: 'Test Event',
      cover_image: 'https://example.com/image.jpg',
      event_type: 'event',
      date: '2024-12-31',
      starting_time: '10:00',
      ending_time: '18:00',
      location: 'Test Location',
      markdown: 'Test description'
    };

    const response = await fetch(`${API_URL}/events`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(eventData)
    });

    expect(response.status).toBe(201);
    
    const event = await response.json();
    expect(event).toHaveProperty('id');
    expect(event).toHaveProperty('slug');
    expect(event.name).toBe('Test Event');
    
    createdEventId = event.id;
  });

  it('should get event by slug', async () => {
    if (!createdEventId) return;

    const response = await fetch(`${API_URL}/events/slug/test-event`);

    expect(response.ok).toBe(true);
    
    const event = await response.json();
    expect(event.slug).toBe('test-event');
  });

  it('should update event', async () => {
    if (!authToken || !createdEventId) return;

    const response = await fetch(`${API_URL}/events/${createdEventId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Updated Test Event'
      })
    });

    expect(response.ok).toBe(true);
    
    const event = await response.json();
    expect(event.name).toBe('Updated Test Event');
  });

  it('should get single event', async () => {
    if (!createdEventId) return;

    const response = await fetch(`${API_URL}/events/${createdEventId}`);

    expect(response.ok).toBe(true);
    
    const event = await response.json();
    expect(event.id).toBe(createdEventId);
  });
});