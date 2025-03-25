import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { UserList } from '../UserList';
import { User } from '../../types/user';

const mockUsers: User[] = [
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

describe('UserList', () => {
  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state', () => {
    render(
      <UserList
        users={[]}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        isLoading={true}
        error={null}
      />
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error state', () => {
    const errorMessage = 'Failed to fetch users';
    render(
      <UserList
        users={[]}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        isLoading={false}
        error={new Error(errorMessage)}
      />
    );
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('renders empty state', () => {
    render(
      <UserList
        users={[]}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        isLoading={false}
        error={null}
      />
    );
    expect(screen.getByText('No users found')).toBeInTheDocument();
  });

  it('renders user list correctly', () => {
    render(
      <UserList
        users={mockUsers}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        isLoading={false}
        error={null}
      />
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
  });

  it('calls onEdit when edit button is clicked', () => {
    render(
      <UserList
        users={mockUsers}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        isLoading={false}
        error={null}
      />
    );

    const editButtons = screen.getAllByText('Edit');
    fireEvent.click(editButtons[0]);

    expect(mockOnEdit).toHaveBeenCalledWith(mockUsers[0]);
  });

  it('calls onDelete when delete button is clicked', () => {
    render(
      <UserList
        users={mockUsers}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        isLoading={false}
        error={null}
      />
    );

    const deleteButtons = screen.getAllByText('Delete');
    fireEvent.click(deleteButtons[0]);

    expect(mockOnDelete).toHaveBeenCalledWith(mockUsers[0].id);
  });
}); 