import { expect, it, describe, vi, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../app.js';

describe('Login Features', () => {
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
    expect(res.body.message).toBe('Wrong email or password');
  })
  it('POST /login - password invalid', async () => {
    const user = {
        email: process.env.LOGIN_EMAIL,
        password: 'wrongpassword'
    }
    const res = await request(app).post('/api/login').send(user);
    
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Wrong email or password');
  })
  it('POST /login - error', async () => {
    const res = await request(app).post('/api/login').send(null);
    
    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBe('Internal server error');
  })
  it('GET /verify-token - success', async () => {
    const user = {
        email: process.env.LOGIN_EMAIL,
        password: process.env.LOGIN_PASSWORD
    }

    const res1 = await request(app).post('/api/login').send(user);


    const res2 = await request(app).get('/api/verify-token').set('Authorization', `Bearer ${res1.body.token}`)

    expect(res2.statusCode).toBe(200);
    expect(res2.body.message).toBe('token vaild, admin mode');
    expect(res2.body.authenticated).toBe(true);
  })
  it('GET /verify-token - failed', async () => {
    const res2 = await request(app).get('/api/verify-token').set('Authorization', `Bearer ${""}`)

    expect(res2.statusCode).toBe(401);
    expect(res2.body.message).toBe('No token, user mode');
    expect(res2.body.authenticated).toBe(false);
  })
  it('GET /verify-token - success', async () => {
    const fakeToken = "faketoken";


    const res2 = await request(app).get('/api/verify-token').set('Authorization', `Bearer ${fakeToken}`)

    expect(res2.statusCode).toBe(403);
    expect(res2.body.message).toBe('token is invalid or expired, user mode');
    expect(res2.body.authenticated).toBe(false);
  })
}
)