import { User, CreateUserInput, UpdateUserInput } from '../types/user';

let users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'User',
  },
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  getAllUsers: async (): Promise<User[]> => {
    await delay(500);
    return users;
  },

  getUserById: async (id: string): Promise<User> => {
    await delay(300);
    const user = users.find(u => u.id === id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  },

  createUser: async (user: CreateUserInput): Promise<User> => {
    await delay(500);
    const newUser: User = {
      ...user,
      id: Math.random().toString(36).substr(2, 9),
    };
    users.push(newUser);
    return newUser;
  },

  updateUser: async (user: UpdateUserInput): Promise<User> => {
    await delay(500);
    const index = users.findIndex(u => u.id === user.id);
    if (index === -1) {
      throw new Error('User not found');
    }
    users[index] = { ...users[index], ...user };
    return users[index];
  },

  deleteUser: async (id: string): Promise<void> => {
    await delay(500);
    const index = users.findIndex(u => u.id === id);
    if (index === -1) {
      throw new Error('User not found');
    }
    users = users.filter(u => u.id !== id);
  },

  resetUsers: () => {
    users = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'Admin',
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: 'User',
      },
    ];
  },
}; 