import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import { userService } from './services/api';

jest.mock('./services/api');

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

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    queryClient.clear();
  });

  it('renders the user management dashboard', () => {
    render(<App />, { wrapper });
    expect(screen.getByText('User Management Dashboard')).toBeInTheDocument();
  });

  it('displays loading state while fetching users', () => {
    (userService.getAllUsers as jest.Mock).mockImplementation(() => new Promise(() => {}));
    render(<App />, { wrapper });
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays error state when fetching users fails', async () => {
    const error = new Error('Failed to fetch users');
    (userService.getAllUsers as jest.Mock).mockRejectedValueOnce(error);
    render(<App />, { wrapper });

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch users')).toBeInTheDocument();
    });
  });

  it('displays user list when data is fetched successfully', async () => {
    const mockUsers = [
      { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
      { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    ];

    (userService.getAllUsers as jest.Mock).mockResolvedValueOnce(mockUsers);
    render(<App />, { wrapper });

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });
  });

  it('opens add user form when clicking Add New User button', () => {
    render(<App />, { wrapper });
    fireEvent.click(screen.getByText('Add New User'));
    expect(screen.getByText('Add New User')).toBeInTheDocument();
  });

  it('opens edit user form when clicking Edit button', async () => {
    const mockUsers = [
      { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    ];

    (userService.getAllUsers as jest.Mock).mockResolvedValueOnce(mockUsers);
    render(<App />, { wrapper });

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Edit'));
    expect(screen.getByText('Edit User')).toBeInTheDocument();
  });

  it('creates a new user when submitting the form', async () => {
    const newUser = {
      name: 'Test User',
      email: 'test@example.com',
      role: 'User',
    };

    (userService.createUser as jest.Mock).mockResolvedValueOnce({ id: '3', ...newUser });
    render(<App />, { wrapper });

    fireEvent.click(screen.getByText('Add New User'));

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: newUser.name } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: newUser.email } });
    fireEvent.change(screen.getByLabelText('Role'), { target: { value: newUser.role } });

    fireEvent.click(screen.getByText('Create'));

    await waitFor(() => {
      expect(userService.createUser).toHaveBeenCalledWith(newUser);
    });
  });

  it('deletes a user when clicking Delete button', async () => {
    const mockUsers = [
      { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    ];

    (userService.getAllUsers as jest.Mock).mockResolvedValueOnce(mockUsers);
    render(<App />, { wrapper });

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    // Mock window.confirm to return true
    const confirmSpy = jest.spyOn(window, 'confirm');
    confirmSpy.mockImplementation(() => true);

    await waitFor(() => {
      expect(userService.deleteUser).toHaveBeenCalledWith('1');
    });
  });
}); 