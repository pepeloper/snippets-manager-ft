import './test.config.js';
import request from 'supertest';
import app from '../main.js';
import { clearDatabase, connect, disconnect } from './setup';
import { generateToken } from '../auth/auth.service.js';
import userModel from '../users/user.model.js';
import snippetsModel from '../snippets/snippets.model.js';

describe('Snippets', () => {
  beforeAll(async () => {
    await connect();
  });

  afterEach(async () => {
    await clearDatabase();
  });

  afterAll(async () => {
    await disconnect();
  });

  describe('GET /api/snippets', () => {
    test('should return all snippets', async () => {
      const user = await userModel.create({
        username: 'test',
        email: 'test@test.com',
        password: 'test123',
      });

      const token = generateToken(user.email);

      const snippetData = {
        title: 'Snippet test',
        description: 'Snippet test description',
        content: 'Snippet test content',
        category: 'nodejs',
        author: user.username,
      };

      await snippetsModel.create(snippetData);

      const response = await request(app)
        .get('/api/snippets')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(1);
      expect(response.body[0]).toEqual(expect.objectContaining({
        title: snippetData.title,
        description: snippetData.description,
        content: snippetData.content,
        category: snippetData.category,
        author: snippetData.author,
      }));
    });
    test('should return 401 if user is not authenticated', async () => {
      const response = await request(app).get('/api/snippets');
      expect(response.status).toBe(401);
      expect(response.body).toEqual({ message: 'Unauthorized' });
    });
  });
});
