import { renderHook, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useUsers } from '../useUsers';
import { userService } from '../../services/api';

jest.mock('../../services/api');

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('useUsers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    queryClient.clear();
  });

  it('should fetch users successfully', async () => {
    const mockUsers = [
      { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
      { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    ];

    (userService.getAllUsers as jest.Mock).mockResolvedValueOnce(mockUsers);

    const { result } = renderHook(() => useUsers(), { wrapper });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBeNull();

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.users).toEqual(mockUsers);
  });

  it('should handle error when fetching users', async () => {
    const error = new Error('Failed to fetch users');
    (userService.getAllUsers as jest.Mock).mockRejectedValueOnce(error);

    const { result } = renderHook(() => useUsers(), { wrapper });

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(error);
    expect(result.current.users).toBeUndefined();
  });

  it('should create a new user', async () => {
    const newUser = {
      name: 'Test User',
      email: 'test@example.com',
      role: 'User',
    };

    const createdUser = {
      id: '3',
      ...newUser,
    };

    (userService.createUser as jest.Mock).mockResolvedValueOnce(createdUser);

    const { result } = renderHook(() => useUsers(), { wrapper });

    await act(async () => {
      await result.current.createUser(newUser);
    });

    expect(userService.createUser).toHaveBeenCalledWith(newUser);
  });

  it('should update an existing user', async () => {
    const updateData = {
      id: '1',
      name: 'Updated Name',
      email: 'updated@example.com',
      role: 'Admin',
    };

    const updatedUser = {
      ...updateData,
    };

    (userService.updateUser as jest.Mock).mockResolvedValueOnce(updatedUser);

    const { result } = renderHook(() => useUsers(), { wrapper });

    await act(async () => {
      await result.current.updateUser(updateData);
    });

    expect(userService.updateUser).toHaveBeenCalledWith(updateData);
  });

  it('should delete a user', async () => {
    const userId = '1';

    (userService.deleteUser as jest.Mock).mockResolvedValueOnce(undefined);

    const { result } = renderHook(() => useUsers(), { wrapper });

    await act(async () => {
      await result.current.deleteUser(userId);
    });

    expect(userService.deleteUser).toHaveBeenCalledWith(userId);
  });
}); 