export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface CreateUserInput {
  name: string;
  email: string;
  role: string;
}

export interface UpdateUserInput extends CreateUserInput {
  id: string;
}

export interface ApiError {
  message: string;
  status: number;
} 