/**
 * Express router to handle article-related API routes.
 * 
 * This router provides endpoints for fetching articles based on various criteria,
 * including general articles, filtering by title, author, and keyword.
 * 
 * @module articlesRouter
 */
const express = require('express')
const router = express.Router();
const controller = require('./controller')

router.get('/', controller.getArticles)
router.get('/title', controller.fetchByTitle)
router.get('/author', controller.fetchByAuthor)
router.get('/keyword', controller.fetchByKeyword)

module.exports = router