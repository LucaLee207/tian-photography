
import { expect, it, describe, vi, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../app.js';
// import db from '../src/model/eventModel.js';

// 1. Tell Jest to mock the db module
vi.mock('../src/model/eventModel.js', () => ({
    getEventByIdService: vi.fn(),
    getAllEventsService: vi.fn(),
    createEventService: vi.fn(),
    updateEventService: vi.fn(),
    deleteEventService: vi.fn(),
    orderEventsService: vi.fn()
}));

// 2. Import the mock AFTER calling vi.mock (Vitest hoists this automatically, but it's cleaner)
import * as db from '../src/model/eventModel.js';


describe('Event CRUD API', () => {
  
  // Clear mocks before each test so they don't interfere
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('GET /event', async () => {
    // 2. Setup the "Fake" return value for this specific test
    const mockEvents = [{
            id: 28,
            position: 1,
            title: "test122",
            content: "fagwewgwe",
            url: "https://pub-2d6a4cb96ef24e38986e5da6015ec8b3.r2.dev/travel/homepage.jpg",
            category: "travel",
            filename: "travel/homepage.jpg"
        },{
            id: 44,
            position: 1,
            title: "sdfas",
            content: "asdfsa",
            url: "https://pub-2d6a4cb96ef24e38986e5da6015ec8b3.r2.dev/activity/53693296889_bd86ae6936_b.jpg",
            category: "activity",
            filename: "activity/53693296889_bd86ae6936_b.jpg"
        },
        {
            id: 31,
            position: 1,
            title: "WEDDING",
            content: "tweloatwl",
            url: "https://pub-2d6a4cb96ef24e38986e5da6015ec8b3.r2.dev/wedding/380356884_848900839935700_4054933828359381838_n.jpg",
            category: "wedding",
            filename: "wedding/380356884_848900839935700_4054933828359381838_n.jpg"
        }
    ]
    db.getAllEventsService.mockResolvedValue(mockEvents);

    const res = await request(app).get('/api/event');
    const expectedData = res.body.data;
    
    expect(res.statusCode).toBe(200);

    for (let i = 0; i < expectedData.length; i++) {
        expect(mockEvents[i]).toMatchObject({
            id: expectedData[i].id,
            position: expectedData[i].position,
            title: expectedData[i].title,
            content: expectedData[i].content,
            url: expectedData[i].url,
            category: expectedData[i].category,
            filename: expectedData[i].filename,
        });
    }
    
    
  });
  it('GET /event - error', async () => {
    // 1. Create a fake error object
    const error = new Error('Database connection failed');
    
    // 2. Mock the service to REJECT (throw) instead of resolve
    db.getAllEventsService.mockRejectedValue(error);
    
    // 3. Make the request
    const res = await request(app).get('/api/event');
    // 4. Assertions
    // Usually, a 500 error if your global error handler is set up
    expect(res.statusCode).toBe(500); 
    expect(res.body.message).toBe('Database connection failed');
  });
  it('GET /event/:id - success', async () => {
    // 2. Setup the "Fake" return value for this specific test
    const mockUser = {
            id: 28,
            position: 1,
            title: "test122",
            content: "fagwewgwe",
            url: "https://pub-2d6a4cb96ef24e38986e5da6015ec8b3.r2.dev/travel/homepage.jpg",
            category: "travel",
            filename: "travel/homepage.jpg"
        }
    db.getEventByIdService.mockResolvedValue(mockUser);

    const res = await request(app).get('/api/event/28');
 
    expect(res.statusCode).toBe(200);
    expect(res.body.data.position).toBe(1);
    expect(res.body.data.title).toBe( "test122");
    expect(res.body.data.content).toBe( "fagwewgwe");
    expect(res.body.data.url).toBe( "https://pub-2d6a4cb96ef24e38986e5da6015ec8b3.r2.dev/travel/homepage.jpg");
    expect(res.body.data.category).toBe( "travel");
    expect(res.body.data.filename).toBe( "travel/homepage.jpg");

    // Ensure the DB was actually called with the right ID
    expect(db.getEventByIdService).toHaveBeenCalledWith('28');
  });
  it('GET /event/:id - not found', async () => {
    db.getEventByIdService.mockResolvedValue(null); // Simulate "not in database"

    const res = await request(app).get('/api/event/999');

    expect(res.statusCode).toBe(404);
  });
  it('GET /event/id - error', async () => {
    // 1. Create a fake error object
    const error = new Error('Database connection failed');
    
    // 2. Mock the service to REJECT (throw) instead of resolve
    db.getEventByIdService.mockRejectedValue(error);
    
    // 3. Make the request
    const res = await request(app).get('/api/event/28');
    // 4. Assertions
    // Usually, a 500 error if your global error handler is set up
    expect(res.statusCode).toBe(500); 
    expect(res.body.message).toBe('Database connection failed');
  });

  it('POST /event - success', async () => {
    const mockUser = { position: 1,
            title: "test122",
            content: "fagwewgwe",
            url: "https://pub-2d6a4cb96ef24e38986e5da6015ec8b3.r2.dev/travel/homepage.jpg",
            category: "travel",
            filename: "travel/homepage.jpg"
         };
    db.createEventService.mockResolvedValue({ id: '456', ...mockUser });

    const res = await request(app).post('/api/event').send(mockUser);

    expect(res.statusCode).toBe(201);
    expect(res.body.data.id).toBe('456');
  });
    it('POST /event - error', async () => {
        // 1. Create a fake error object
        const error = new Error('Database connection failed');
        
        // 2. Mock the service to REJECT (throw) instead of resolve
        db.createEventService.mockRejectedValue(error);
        
        // 3. Make the request
        const res = await request(app).post('/api/event').send({});
        // 4. Assertions
        // Usually, a 500 error if your global error handler is set up
        expect(res.statusCode).toBe(500); 
        expect(res.body.message).toBe('Database connection failed');
    });



  it('PUT /event/:id - success', async () => {
    const mockEvent = {
            id: 28,
            position: 1,
            title: "test122",
            content: "fagwewgwe",
            url: "https://pub-2d6a4cb96ef24e38986e5da6015ec8b3.r2.dev/travel/homepage.jpg",
            category: "travel",
            filename: "travel/homepage.jpg"
    }
    const updatedEvent = {
            id: 28,
            position: 1,
            title: "test111",
            content: "test111",
            url: "https://pub-2d6a4cb96ef24e38986e5da6015ec8b3.r2.dev/travel/homepage.jpg",
            category: "travel",
            filename: "travel/homepage.jpg"
    }
    
    db.getEventByIdService.mockResolvedValue(mockEvent);
    db.updateEventService.mockResolvedValue(updatedEvent);

    const res = await request(app).put('/api/event/28').send(updatedEvent);
    
    expect(res.statusCode).toBe(200);
    expect(res.body.data.position).toBe(1);
    expect(res.body.data.title).toBe( "test111");
    expect(res.body.data.content).toBe( "test111");
    expect(res.body.data.url).toBe( "https://pub-2d6a4cb96ef24e38986e5da6015ec8b3.r2.dev/travel/homepage.jpg");
    expect(res.body.data.category).toBe( "travel");
    expect(res.body.data.filename).toBe( "travel/homepage.jpg");
    
  });
  it('PUT /event/:id - not found', async () => {
    const updatedEvent = {
            id: 28,
            position: 1,
            title: "test111",
            content: "test111",
            url: "https://pub-2d6a4cb96ef24e38986e5da6015ec8b3.r2.dev/travel/homepage.jpg",
            category: "travel",
            filename: "travel/homepage.jpg"
    }
    
    db.getEventByIdService.mockResolvedValue(null);
    db.updateEventService.mockResolvedValue(updatedEvent);

    const res = await request(app).put('/api/event/28').send(updatedEvent);
    
    expect(res.statusCode).toBe(404);
    
  });
    it('PUT /event/:id - error', async () => {
        // 1. Create a fake error object
        const error = new Error('Database connection failed');
        
        // 2. Mock the service to REJECT (throw) instead of resolve
        db.getEventByIdService.mockResolvedValue({})
        db.updateEventService.mockRejectedValue(error);
        
        // 3. Make the request
        const res = await request(app).put('/api/event/28').send({});
        // 4. Assertions
        // Usually, a 500 error if your global error handler is set up
        expect(res.statusCode).toBe(500); 
        expect(res.body.message).toBe('Database connection failed');
    });
  it('DELETE /event/:id - success', async () => {
    const mockEvent = {
            id: 28,
            position: 1,
            title: "test122",
            content: "fagwewgwe",
            url: "https://pub-2d6a4cb96ef24e38986e5da6015ec8b3.r2.dev/travel/homepage.jpg",
            category: "travel",
            filename: "travel/homepage.jpg"
    }
    db.getEventByIdService.mockResolvedValue(mockEvent);
    db.deleteEventService.mockResolvedValue({});
  

    const res = await request(app).delete('/api/event/28');
    
    expect(res.statusCode).toBe(200);
    
    
  });
  it('DELETE /event/:id - not found', async () => {
    const deletedEvent = {
            id: 28,
            position: 1,
            title: "test111",
            content: "test111",
            url: "https://pub-2d6a4cb96ef24e38986e5da6015ec8b3.r2.dev/travel/homepage.jpg",
            category: "travel",
            filename: "travel/homepage.jpg"
    }
    
    db.getEventByIdService.mockResolvedValue(null);
    db.updateEventService.mockResolvedValue(deletedEvent);

    const res = await request(app).delete('/api/event/28');
    
    expect(res.statusCode).toBe(404);
    
  });
  it('DELETE /event/:id - error', async () => {
    // 1. Create a fake error object
    const error = new Error('Database connection failed');
    
    // 2. Mock the service to REJECT (throw) instead of resolve
    db.getEventByIdService.mockResolvedValue({})
    db.deleteEventService.mockRejectedValue(error);
    
    // 3. Make the request
    const res = await request(app).delete('/api/event/28');
    // 4. Assertions
    // Usually, a 500 error if your global error handler is set up
    expect(res.statusCode).toBe(500); 
    expect(res.body.message).toBe('Database connection failed');
    });
    it("PATCH event/order", async () =>{
        const mockEvents = [
            {
            id: 31,
            position: 1,
            title: "WEDDING",
            content: "tweloatwl",
            url: "https://pub-2d6a4cb96ef24e38986e5da6015ec8b3.r2.dev/wedding/380356884_848900839935700_4054933828359381838_n.jpg",
            category: "wedding",
            filename: "wedding/380356884_848900839935700_4054933828359381838_n.jpg"
        },
            {
            id: 28,
            position: 1,
            title: "test122",
            content: "fagwewgwe",
            url: "https://pub-2d6a4cb96ef24e38986e5da6015ec8b3.r2.dev/travel/homepage.jpg",
            category: "travel",
            filename: "travel/homepage.jpg"
        },{
            id: 44,
            position: 1,
            title: "sdfas",
            content: "asdfsa",
            url: "https://pub-2d6a4cb96ef24e38986e5da6015ec8b3.r2.dev/activity/53693296889_bd86ae6936_b.jpg",
            category: "activity",
            filename: "activity/53693296889_bd86ae6936_b.jpg"
        },
        
    ]
    const newOrder = [31, 28, 44];
    db.orderEventsService.mockResolvedValue(mockEvents);
    const res = await request(app).patch('/api/event/order').send(newOrder);
    expect(res.statusCode).toBe(200);
    const expectedData = res.body.data;
    for (let i = 0; i < expectedData.length; i++) {
        expect(mockEvents[i]).toMatchObject({
            id: expectedData[i].id,
            position: expectedData[i].position,
            title: expectedData[i].title,
            content: expectedData[i].content,
            url: expectedData[i].url,
            category: expectedData[i].category,
            filename: expectedData[i].filename,
        });
    }


    })
    it("PATCH event/order - error", async () => {
        const error = new Error("Database connection failed");
        const newOrder = [28, 31, 44]
        db.orderEventsService.mockRejectedValue(error);
        const res = await request(app).patch("/api/event/order").send(newOrder);

        expect(res.statusCode).toBe(500);
        expect(res.body.message).toBe("Database connection failed");
    })
});