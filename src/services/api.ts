import axios from 'axios';
import { User, CreateUserInput, UpdateUserInput, ApiError } from '../types/user';

const API_BASE_URL = 'https://api.example.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const userService = {
  getAllUsers: async (): Promise<User[]> => {
    try {
      const response = await api.get('/users');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getUserById: async (id: string): Promise<User> => {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  createUser: async (user: CreateUserInput): Promise<User> => {
    try {
      const response = await api.post('/users', user);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  updateUser: async (user: UpdateUserInput): Promise<User> => {
    try {
      const response = await api.put(`/users/${user.id}`, user);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  deleteUser: async (id: string): Promise<void> => {
    try {
      await api.delete(`/users/${id}`);
    } catch (error) {
      throw handleApiError(error);
    }
  },
};

const handleApiError = (error: any): ApiError => {
  if (axios.isAxiosError(error)) {
    return {
      message: error.response?.data?.message || 'An error occurred',
      status: error.response?.status || 500,
    };
  }
  return {
    message: 'An unexpected error occurred',
    status: 500,
  };
}; 