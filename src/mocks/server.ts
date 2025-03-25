import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { mockApi } from '../services/mockApi';

export const handlers = [
  rest.get('https://api.example.com/users', async (req, res, ctx) => {
    try {
      const users = await mockApi.getAllUsers();
      return res(ctx.status(200), ctx.json(users));
    } catch (error) {
      return res(ctx.status(500), ctx.json({ message: 'Failed to fetch users' }));
    }
  }),

  rest.get('https://api.example.com/users/:id', async (req, res, ctx) => {
    try {
      const user = await mockApi.getUserById(req.params.id as string);
      return res(ctx.status(200), ctx.json(user));
    } catch (error) {
      return res(ctx.status(404), ctx.json({ message: 'User not found' }));
    }
  }),

  rest.post('https://api.example.com/users', async (req, res, ctx) => {
    try {
      const user = await mockApi.createUser(req.body as any);
      return res(ctx.status(201), ctx.json(user));
    } catch (error) {
      return res(ctx.status(500), ctx.json({ message: 'Failed to create user' }));
    }
  }),

  rest.put('https://api.example.com/users/:id', async (req, res, ctx) => {
    try {
      const user = await mockApi.updateUser({
        ...req.body,
        id: req.params.id,
      } as any);
      return res(ctx.status(200), ctx.json(user));
    } catch (error) {
      return res(ctx.status(404), ctx.json({ message: 'User not found' }));
    }
  }),

  rest.delete('https://api.example.com/users/:id', async (req, res, ctx) => {
    try {
      await mockApi.deleteUser(req.params.id as string);
      return res(ctx.status(204));
    } catch (error) {
      return res(ctx.status(404), ctx.json({ message: 'User not found' }));
    }
  }),
];

export const server = setupServer(...handlers); 