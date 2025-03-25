import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '../services/api';
import { CreateUserInput, UpdateUserInput } from '../types/user';

// TODO: Implement the useUsers hook with the following features:
// 1. Fetch users using React Query
// 2. Handle loading and error states
// 3. Implement mutations for create, update, and delete operations
// 4. Invalidate queries after successful mutations
// 5. Return necessary data and functions for the components

export const useUsers = () => {
  const queryClient = useQueryClient();

  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAllUsers,
  });

  const createUserMutation = useMutation({
    mutationFn: userService.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: userService.updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: userService.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  return {
    users: usersQuery.data,
    isLoading: usersQuery.isLoading,
    error: usersQuery.error,
    createUser: createUserMutation.mutate,
    updateUser: updateUserMutation.mutate,
    deleteUser: deleteUserMutation.mutate,
  };
}; 