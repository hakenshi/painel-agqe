import { describe, it, expect, vi } from 'vitest';
import { NextRequest, NextResponse } from 'next/server';
import { middleware } from '@/middleware';

// Mock NextResponse
vi.mock('next/server', async () => {
  const actual = await vi.importActual('next/server');
  return {
    ...actual,
    NextResponse: {
      redirect: vi.fn((url) => ({ redirect: url.toString() })),
      next: vi.fn(() => ({ next: true }))
    }
  };
});

describe('Middleware', () => {
  it('should redirect to login when no auth token', () => {
    const request = new NextRequest('http://localhost:3000/', {
      headers: new Headers()
    });
    
    // Mock cookies.get to return undefined
    vi.spyOn(request.cookies, 'get').mockReturnValue(undefined);

    const response = middleware(request);

    expect(NextResponse.redirect).toHaveBeenCalledWith(
      expect.objectContaining({
        pathname: '/login'
      })
    );
  });

  it('should redirect to home when accessing root with token', () => {
    const request = new NextRequest('http://localhost:3000/', {
      headers: new Headers()
    });
    
    // Mock cookies.get to return a token
    vi.spyOn(request.cookies, 'get').mockReturnValue({ 
      name: 'auth-token', 
      value: 'valid-token' 
    } as any);

    const response = middleware(request);

    expect(NextResponse.redirect).toHaveBeenCalledWith(
      expect.objectContaining({
        pathname: '/home'
      })
    );
  });

  it('should continue when token exists and not on root', () => {
    const request = new NextRequest('http://localhost:3000/dashboard', {
      headers: new Headers()
    });
    
    vi.spyOn(request.cookies, 'get').mockReturnValue({ 
      name: 'auth-token', 
      value: 'valid-token' 
    } as any);

    const response = middleware(request);

    expect(NextResponse.next).toHaveBeenCalled();
  });
});