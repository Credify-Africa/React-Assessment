import { userService } from '../api';
import { mockApi } from '../mockApi';

jest.mock('../mockApi');

describe('userService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockApi.resetUsers();
  });

  describe('getAllUsers', () => {
    it('should fetch all users successfully', async () => {
      const users = await userService.getAllUsers();
      expect(users).toHaveLength(2);
      expect(users[0]).toHaveProperty('id');
      expect(users[0]).toHaveProperty('name');
      expect(users[0]).toHaveProperty('email');
      expect(users[0]).toHaveProperty('role');
    });

    it('should handle errors when fetching users', async () => {
      jest.spyOn(mockApi, 'getAllUsers').mockRejectedValueOnce(new Error('API Error'));
      
      await expect(userService.getAllUsers()).rejects.toThrow('API Error');
    });
  });

  describe('createUser', () => {
    it('should create a new user successfully', async () => {
      const newUser = {
        name: 'Test User',
        email: 'test@example.com',
        role: 'User',
      };

      const createdUser = await userService.createUser(newUser);
      expect(createdUser).toHaveProperty('id');
      expect(createdUser.name).toBe(newUser.name);
      expect(createdUser.email).toBe(newUser.email);
      expect(createdUser.role).toBe(newUser.role);
    });

    it('should handle errors when creating a user', async () => {
      jest.spyOn(mockApi, 'createUser').mockRejectedValueOnce(new Error('API Error'));
      
      await expect(userService.createUser({
        name: 'Test User',
        email: 'test@example.com',
        role: 'User',
      })).rejects.toThrow('API Error');
    });
  });

  describe('updateUser', () => {
    it('should update an existing user successfully', async () => {
      const updateData = {
        id: '1',
        name: 'Updated Name',
        email: 'updated@example.com',
        role: 'Admin',
      };

      const updatedUser = await userService.updateUser(updateData);
      expect(updatedUser.name).toBe(updateData.name);
      expect(updatedUser.email).toBe(updateData.email);
      expect(updatedUser.role).toBe(updateData.role);
    });

    it('should handle errors when updating a user', async () => {
      jest.spyOn(mockApi, 'updateUser').mockRejectedValueOnce(new Error('API Error'));
      
      await expect(userService.updateUser({
        id: '1',
        name: 'Updated Name',
        email: 'updated@example.com',
        role: 'Admin',
      })).rejects.toThrow('API Error');
    });
  });

  describe('deleteUser', () => {
    it('should delete a user successfully', async () => {
      const userId = '1';
      await expect(userService.deleteUser(userId)).resolves.not.toThrow();
    });

    it('should handle errors when deleting a user', async () => {
      jest.spyOn(mockApi, 'deleteUser').mockRejectedValueOnce(new Error('API Error'));
      
      await expect(userService.deleteUser('1')).rejects.toThrow('API Error');
    });
  });
}); 