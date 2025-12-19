import { expect, it, describe, vi, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../app.js';

describe('Cloud Storage Controller', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('POST /login - success',  async () => {
    const user = {
        email: process.env.LOGIN_EMAIL,
        password: process.env.LOGIN_PASSWORD
    }

    const res = await request(app).post('/api/login').send(user);
    
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Login Successfully');
  });

  it('POST /login - email invalid', async () => {
    const user = {
        email: 'wrongemail',
        password: process.env.LOGIN_PASSWORD
    }
    const res = await request(app).post('/api/login').send(user);
    
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Invalid credentials.');
  })
  it('POST /login - password invalid', async () => {
    const user = {
        email: process.env.LOGIN_EMAIL,
        password: 'wrongpassword'
    }
    const res = await request(app).post('/api/login').send(user);
    
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Invalid credentials.');
  })
}
)