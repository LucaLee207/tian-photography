import { createEventService, deleteEventService, getAllEventsService, getEventByIdService, updateEventService, orderEventsService } from "../model/eventModel.js";

const handleResponse = (res, status, message, data=null) => {
    res.status(status).json({
        status,
        message, 
        data,
    });
};

export const createEvent = async (req, res, next) =>{
    const {position, title, content, url, category, filename} = req.body;
    try {
        const newEvent = await createEventService(position, title, content, url, category, filename);
        handleResponse(res, 201, "Event created successfully", newEvent);
    } catch (err) {
        next(err);
    };
};

export const getAllEvents = async (req, res, next) =>{
    try {
        const newEvent = await getAllEventsService();
        handleResponse(res, 200, "All events fetched successfully", newEvent);
    } catch (err) {
        next(err);
    };
};
export const getEventById = async (req, res, next) =>{
    try {
        const event = await getEventByIdService(req.params.id);
        if (!event) return handleResponse(res, 404, "Event not found");
        handleResponse(res, 200, "Event fetched successfully", event);
    } catch (err) {
        next(err);
    };
};
export const updateEvent = async (req, res, next) =>{
    const {title, content} = req.body;
    try {
        const event = await getEventByIdService(req.params.id);
        if (!event) return handleResponse(res, 404, "Event not found");
        const updatedEvent = await updateEventService(req.params.id, title, content);
        handleResponse(res, 200, "Event updated successfully", updatedEvent);
    } catch (err) {
        next(err);
    };
};

export const deleteEvent = async (req, res, next) =>{
    try {
        const findEvent = await getEventByIdService(req.params.id);
        if (!findEvent) return handleResponse(res, 404, "Event not found");
        const deletedEvent = await deleteEventService(req.params.id);
        handleResponse(res, 200, "Event deleted successfully", deletedEvent);
    } catch (err) {
        next(err);
    };
};

export const orderEvents = async (req, res, next) =>{
    try {
        const orderedEvents = await orderEventsService(req.body);
        handleResponse(res, 200, "Event order updated successfully", orderedEvents);
    } catch (err) {
        next(err);
    };
};