import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../app.js';

// 1. Mock the AWS SDK and the Presigner
vi.mock('@aws-sdk/client-s3', () => {
  return {
    S3Client: vi.fn(() => ({})), // Return a dummy object
    PutObjectCommand: vi.fn(),
    DeleteObjectCommand: vi.fn(),
  };
});

vi.mock('@aws-sdk/s3-request-presigner', () => {
  return {
    getSignedUrl: vi.fn(),
  };
});

// Import the mocked functions so we can control their behavior
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

describe('Cloud Storage Controller', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('uploadImg - should return a signed URL', async () => {
    // 2. Mock the signed URL response
    const fakeUrl = 'https://fake-signed-url.com/upload';
    getSignedUrl.mockResolvedValue(fakeUrl);

    const res = await request(app)
      .post('/api/img-R2-upload') // replace with your actual route
      .send({ fileName: 'test.jpg', fileType: 'image/jpeg' });

    // 3. Assertions
    expect(res.statusCode).toBe(200);
    expect(res.body.url).toBe(fakeUrl);
    expect(getSignedUrl).toHaveBeenCalledTimes(1);
  });

  it('deleteImg - should return a delete URL', async () => {
    const fakeDeleteUrl = 'https://fake-signed-url.com/delete';
    getSignedUrl.mockResolvedValue(fakeDeleteUrl);

    const res = await request(app)
      .post('/api/img-R2-delete') // replace with your actual route
      .send({ key: 'travel/photo.jpg' });

    expect(res.statusCode).toBe(200);
    expect(res.body.deleteUrl).toBe(fakeDeleteUrl);
  });
});