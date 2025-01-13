import './test.config.js';
import request from 'supertest';
import { app } from '../main.js';
import { connect, clearDatabase, disconnect } from './setup.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../users/user.model.js';

const TEST_USER = {
  username: 'testuser',
  password: 'testpass123',
  email: 'testuser@example.com',
};

const createTestUser = async () => {
  const hashedPassword = await bcrypt.hash(TEST_USER.password, 10);
  const user = new User({
    username: TEST_USER.username,
    password: hashedPassword,
    email: TEST_USER.email,
  });
  await user.save();
  return user;
};

const createTestToken = (email) => jwt.sign({ email: email }, process.env.JWT_SECRET);

describe('Snippets API', () => {
  let testUser;

  beforeAll(async () => {
    await connect();
  });

  beforeEach(async () => {
    testUser = await createTestUser();
  });

  afterEach(async () => {
    await clearDatabase();
  });

  afterAll(async () => {
    await disconnect();
  });

  describe('GET /api/snippets', () => {
    test('should return 401 without token', async () => {
      const response = await request(app)
        .get('/api/snippets');

      expect(response.status).toBe(401);
    });

    test('should return snippets with valid token', async () => {
      const token = createTestToken(testUser.email);
      const response = await request(app)
        .get('/api/snippets')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
});
