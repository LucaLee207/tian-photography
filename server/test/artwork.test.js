import { expect, it, describe, vi, beforeEach } from 'vitest';
import request from 'supertest';
import app from '.././src/app.js';
// import db from '../src/model/artworkModel.js';

// 1. Tell Jest to mock the db module
vi.mock('../src/model/artworkModel.js', () => ({
    getArtworkByIdService: vi.fn(),
    getAllArtworksService: vi.fn(),
    createArtworkService: vi.fn(),
    updateArtworkService: vi.fn(),
    deleteArtworkService: vi.fn(),
    orderArtworksService: vi.fn()
}));

// 2. Import the mock AFTER calling vi.mock (Vitest hoists this automatically, but it's cleaner)
import * as db from '../src/model/artworkModel.js';


describe('Artwork CRUD API', () => {
  
  // Clear mocks before each test so they don't interfere
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('GET /artwork', async () => {
    // 2. Setup the "Fake" return value for this specific test
    const mockArtworks = [{
            id: 28,
            position: 1,
            url: "https://pub-2d6a4cb96ef24e38986e5da6015ec8b3.r2.dev/travel/homepage.jpg",
            category: "travel",
            filename: "travel/homepage.jpg"
        },{
            id: 44,
            position: 1,
            url: "https://pub-2d6a4cb96ef24e38986e5da6015ec8b3.r2.dev/activity/53693296889_bd86ae6936_b.jpg",
            category: "activity",
            filename: "activity/53693296889_bd86ae6936_b.jpg"
        },
        {
            id: 31,
            position: 1,
            url: "https://pub-2d6a4cb96ef24e38986e5da6015ec8b3.r2.dev/wedding/380356884_848900839935700_4054933828359381838_n.jpg",
            category: "wedding",
            filename: "wedding/380356884_848900839935700_4054933828359381838_n.jpg"
        }
    ]
    db.getAllArtworksService.mockResolvedValue(mockArtworks);

    const res = await request(app).get('/api/artwork');
    const expectedData = res.body.data;
    
    expect(res.statusCode).toBe(200);

    for (let i = 0; i < expectedData.length; i++) {
        expect(mockArtworks[i]).toMatchObject({
            id: expectedData[i].id,
            position: expectedData[i].position,
            url: expectedData[i].url,
            category: expectedData[i].category,
            filename: expectedData[i].filename,
        });
    }
    
    
  });
  it('GET /artwork - error', async () => {
    // 1. Create a fake error object
    const error = new Error('Database connection failed');
    
    // 2. Mock the service to REJECT (throw) instead of resolve
    db.getAllArtworksService.mockRejectedValue(error);
    
    // 3. Make the request
    const res = await request(app).get('/api/artwork');
    // 4. Assertions
    // Usually, a 500 error if your global error handler is set up
    expect(res.statusCode).toBe(500); 
    expect(res.body.message).toBe('Database connection failed');
  });
  it('GET /artwork/:id - success', async () => {
    // 2. Setup the "Fake" return value for this specific test
    const mockUser = {
            id: 28,
            position: 1,
            url: "https://pub-2d6a4cb96ef24e38986e5da6015ec8b3.r2.dev/travel/homepage.jpg",
            category: "travel",
            filename: "travel/homepage.jpg"
        }
    db.getArtworkByIdService.mockResolvedValue(mockUser);

    const res = await request(app).get('/api/artwork/28');
 
    expect(res.statusCode).toBe(200);
    expect(res.body.data.position).toBe(1);
    expect(res.body.data.url).toBe( "https://pub-2d6a4cb96ef24e38986e5da6015ec8b3.r2.dev/travel/homepage.jpg");
    expect(res.body.data.category).toBe( "travel");
    expect(res.body.data.filename).toBe( "travel/homepage.jpg");

    // Ensure the DB was actually called with the right ID
    expect(db.getArtworkByIdService).toHaveBeenCalledWith('28');
  });
  it('GET /artwork/:id - not found', async () => {
    db.getArtworkByIdService.mockResolvedValue(null); // Simulate "not in database"

    const res = await request(app).get('/api/artwork/999');

    expect(res.statusCode).toBe(404);
  });
  it('GET /artwork/id - error', async () => {
    // 1. Create a fake error object
    const error = new Error('Database connection failed');
    
    // 2. Mock the service to REJECT (throw) instead of resolve
    db.getArtworkByIdService.mockRejectedValue(error);
    
    // 3. Make the request
    const res = await request(app).get('/api/artwork/28');
    // 4. Assertions
    // Usually, a 500 error if your global error handler is set up
    expect(res.statusCode).toBe(500); 
    expect(res.body.message).toBe('Database connection failed');
  });

  it('POST /artwork - success', async () => {
    const mockUser = { position: 1,
            url: "https://pub-2d6a4cb96ef24e38986e5da6015ec8b3.r2.dev/travel/homepage.jpg",
            category: "travel",
            filename: "travel/homepage.jpg"
         };
    db.createArtworkService.mockResolvedValue({ id: '456', ...mockUser });

    const res = await request(app).post('/api/artwork').send(mockUser);

    expect(res.statusCode).toBe(201);
    expect(res.body.data.id).toBe('456');
  });
    it('POST /artwork - error', async () => {
        // 1. Create a fake error object
        const error = new Error('Database connection failed');
        
        // 2. Mock the service to REJECT (throw) instead of resolve
        db.createArtworkService.mockRejectedValue(error);
        
        // 3. Make the request
        const res = await request(app).post('/api/artwork').send({});
        // 4. Assertions
        // Usually, a 500 error if your global error handler is set up
        expect(res.statusCode).toBe(500); 
        expect(res.body.message).toBe('Database connection failed');
    });


  it('DELETE /artwork/:id - success', async () => {
    const mockArtwork = {
            id: 28,
            position: 1,
            url: "https://pub-2d6a4cb96ef24e38986e5da6015ec8b3.r2.dev/travel/homepage.jpg",
            category: "travel",
            filename: "travel/homepage.jpg"
    }
    db.getArtworkByIdService.mockResolvedValue(mockArtwork);
    db.deleteArtworkService.mockResolvedValue({});
  

    const res = await request(app).delete('/api/artwork/28');
    
    expect(res.statusCode).toBe(200);
    
    
  });
  it('DELETE /artwork/:id - not found', async () => {
    const deletedArtwork = {
            id: 28,
            position: 1,
            url: "https://pub-2d6a4cb96ef24e38986e5da6015ec8b3.r2.dev/travel/homepage.jpg",
            category: "travel",
            filename: "travel/homepage.jpg"
    }
    
    db.getArtworkByIdService.mockResolvedValue(null);
    db.updateArtworkService.mockResolvedValue(deletedArtwork);

    const res = await request(app).delete('/api/artwork/28');
    
    expect(res.statusCode).toBe(404);
    
  });
  it('DELETE /artwork/:id - error', async () => {
    // 1. Create a fake error object
    const error = new Error('Database connection failed');
    
    // 2. Mock the service to REJECT (throw) instead of resolve
    db.getArtworkByIdService.mockResolvedValue({})
    db.deleteArtworkService.mockRejectedValue(error);
    
    // 3. Make the request
    const res = await request(app).delete('/api/artwork/28');
    // 4. Assertions
    // Usually, a 500 error if your global error handler is set up
    expect(res.statusCode).toBe(500); 
    expect(res.body.message).toBe('Database connection failed');
    });
    it("PATCH artwork/order", async () =>{
        const mockArtworks = [
            {
            id: 31,
            position: 1,
            url: "https://pub-2d6a4cb96ef24e38986e5da6015ec8b3.r2.dev/wedding/380356884_848900839935700_4054933828359381838_n.jpg",
            category: "wedding",
            filename: "wedding/380356884_848900839935700_4054933828359381838_n.jpg"
        },
            {
            id: 28,
            position: 1,
            url: "https://pub-2d6a4cb96ef24e38986e5da6015ec8b3.r2.dev/travel/homepage.jpg",
            category: "travel",
            filename: "travel/homepage.jpg"
        },{
            id: 44,
            position: 1,
            url: "https://pub-2d6a4cb96ef24e38986e5da6015ec8b3.r2.dev/activity/53693296889_bd86ae6936_b.jpg",
            category: "activity",
            filename: "activity/53693296889_bd86ae6936_b.jpg"
        },
        
    ]
    const newOrder = [31, 28, 44];
    db.orderArtworksService.mockResolvedValue(mockArtworks);
    const res = await request(app).patch('/api/artwork/order').send(newOrder);
    expect(res.statusCode).toBe(200);
    const expectedData = res.body.data;
    for (let i = 0; i < expectedData.length; i++) {
        expect(mockArtworks[i]).toMatchObject({
            id: expectedData[i].id,
            position: expectedData[i].position,
            url: expectedData[i].url,
            category: expectedData[i].category,
            filename: expectedData[i].filename,
        });
    }


    })
    it("PATCH artwork/order - error", async () => {
        const error = new Error("Database connection failed");
        const newOrder = [28, 31, 44]
        db.orderArtworksService.mockRejectedValue(error);
        const res = await request(app).patch("/api/artwork/order").send(newOrder);

        expect(res.statusCode).toBe(500);
        expect(res.body.message).toBe("Database connection failed");
    })
});