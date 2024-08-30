/**
 * Main entry point for the Express server application.
 * This file sets up middleware, routes, and starts the server.
 * 
 * The server handles article-related API requests, supports CORS for cross-origin requests,
 * and uses URL-encoded and JSON middleware for handling incoming requests.
 * 
 * @module server
 */
require('dotenv').config({ path: 'env/local.env' });
const express = require('express');
const router = require('./router')
const cors=require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/", router);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});