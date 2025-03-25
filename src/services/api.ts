import axios from 'axios';
import { User, CreateUserInput, UpdateUserInput, ApiError } from '../types/user';

const API_BASE_URL = 'https://api.example.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// TODO: Implement the following API service functions:
// 1. getAllUsers: Fetch all users
// 2. getUserById: Fetch a single user by ID
// 3. createUser: Create a new user
// 4. updateUser: Update an existing user
// 5. deleteUser: Delete a user
// 6. handleApiError: Implement error handling

export const userService = {
  // Implement your API service methods here
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