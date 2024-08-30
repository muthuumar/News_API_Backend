/**
 * Main router module for the application.
 * This module sets up the routing for different API endpoints by delegating to specific route modules.
 * 
 * @module mainRouter
 */
const express = require('express')
const router = express.Router();

const article = require('./routes/articles')

router.use("/articles" , article)

module.exports = router;
