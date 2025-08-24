const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface User {
  id: string;
  email: string;
  username: string;
  role: 'consumer' | 'supplier';
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface RegisterData {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  role: 'consumer' | 'supplier';
}

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export const api = {
  async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(response.status, data.message || 'An error occurred');
    }

    return data;
  },

  async login(loginData: LoginData): Promise<AuthResponse> {
    return this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(loginData),
    });
  },

  async register(registerData: RegisterData): Promise<AuthResponse> {
    // Remove confirmPassword before sending to server
    const { confirmPassword, ...dataToSend } = registerData;
    return this.request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(dataToSend),
    });
  },

  async getCurrentUser(token: string): Promise<{ user: User }> {
    return this.request('/api/auth/me', {
      method: 'GET',
      headers: {
        'Authorization': token,
      },
    });
  },

  // Health check
  async healthCheck(): Promise<{ status: string; message: string }> {
    return this.request('/api/health');
  },
};

// Utility to store and retrieve token from localStorage
export const authStorage = {
  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken');
    }
    return null;
  },

  setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', token);
    }
  },

  removeToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
    }
  },

  getUser(): User | null {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('authUser');
      return userStr ? JSON.parse(userStr) : null;
    }
    return null;
  },

  setUser(user: User): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('authUser', JSON.stringify(user));
    }
  },

  removeUser(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authUser');
    }
  },

  clear(): void {
    this.removeToken();
    this.removeUser();
  },
};
