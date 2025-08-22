const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  private async getAuthToken(): Promise<string | null> {
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    return cookieStore.get('auth-token')?.value || null;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = await this.getAuthToken();
    
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    };

    const response = await fetch(`${this.baseUrl}${endpoint}`, config);

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`API Error: ${response.status} - ${error}`);
    }

    return response.json();
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data?: T): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data instanceof FormData ? data : JSON.stringify(data),
      headers: data instanceof FormData ? {} : { 'Content-Type': 'application/json' },
    });
  }

  async put<T>(endpoint: string, data?: T): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data instanceof FormData ? data : JSON.stringify(data),
      headers: data instanceof FormData ? {} : { 'Content-Type': 'application/json' },
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const apiClient = new ApiClient();