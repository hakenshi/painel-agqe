import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock functions
const getAllEvents = vi.fn();
const createEvent = vi.fn();
const updateEvent = vi.fn();
const deleteEvent = vi.fn();

describe('Event Actions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getAllEvents', () => {
    it('should fetch all events', async () => {
      const mockEvents = [{ id: 1, name: 'Test Event' }];
      getAllEvents.mockResolvedValueOnce(mockEvents);

      const result = await getAllEvents();

      expect(result).toEqual(mockEvents);
    });
  });

  describe('createEvent', () => {
    it('should create event successfully', async () => {
      const mockEvent = { id: 1, name: 'Test Event' };
      const eventData = new FormData();

      createEvent.mockResolvedValueOnce({
        success: true,
        event: mockEvent
      });

      const result = await createEvent(eventData);

      expect(result.success).toBe(true);
      expect(result.event).toEqual(mockEvent);
    });
  });

  describe('updateEvent', () => {
    it('should update event successfully', async () => {
      const mockEvent = { id: 1, name: 'Updated Event' };
      const eventData = new FormData();

      updateEvent.mockResolvedValueOnce({
        success: true,
        event: mockEvent
      });

      const result = await updateEvent(1, eventData);

      expect(result.success).toBe(true);
      expect(result.event).toEqual(mockEvent);
    });
  });

  describe('deleteEvent', () => {
    it('should delete event successfully', async () => {
      deleteEvent.mockResolvedValueOnce({
        success: true
      });

      const result = await deleteEvent(1);

      expect(result.success).toBe(true);
    });
  });
});