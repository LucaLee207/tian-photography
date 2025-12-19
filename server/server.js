import express from 'express';
import app from './app.js';
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Backend server listening on port ${PORT}`)
});