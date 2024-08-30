/**
 * Controller for handling article-related API requests.
 * It includes functions to fetch articles, filter by title, author, and keyword,
 * and utilizes caching to optimize performance.
 * 
 * @module articlesController
 */

const NewsService = require('../../services/news_service');
const { SortArticles } = require('../../services/common_service');
const { fetchFromCache, saveToCache } = require('../../services/cache_service');


/**
 * Retrieves all articles based on the query and max results parameters.
 * Utilizes caching to store and retrieve articles to improve performance.
 */
const getArticles = async (req, res) => {
    try {
        const cacheKey = `articles_${req.query.query}_${req.query.max}`;
        const cachedArticles = fetchFromCache(cacheKey);

        if (cachedArticles) {
            return res.json(cachedArticles);
        }

        const articles = await NewsService.fetchArticles(req.query.query, req.query.max);
        saveToCache(cacheKey, articles);
        res.json(articles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

/**
 * Retrieves articles filtered by title.
 * Uses a sorting function to prioritize articles that match the title query.
 * Utilizes caching to store and retrieve filtered articles.
 */
const fetchByTitle = async (req, res) => {
    try {
        const cacheKey = `title_${req.query.q}`;
        const cachedArticles = fetchFromCache(cacheKey);

        if (cachedArticles) {
            return res.json(cachedArticles);
        }

        const articles = await NewsService.fetchArticleByTitle(req.query.q);
        const filteredArticles = SortArticles(articles, req.query.q, 'title');
        saveToCache(cacheKey, filteredArticles);
        res.json(filteredArticles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

/**
 * Retrieves articles filtered by author.
 * Uses a sorting function to prioritize articles that match the author query.
 * Utilizes caching to store and retrieve filtered articles.
 */
const fetchByAuthor = async (req, res) => {
    try {
        const cacheKey = `author_${req.query.q}`;
        const cachedArticles = fetchFromCache(cacheKey);

        if (cachedArticles) {
            return res.json(cachedArticles);
        }

        const articles = await NewsService.fetchArticlesByAuthor(req.query.q);
        const filteredArticles = SortArticles(articles, req.query.q, 'source.name');
        saveToCache(cacheKey, filteredArticles);
        res.json(filteredArticles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

/**
 * Retrieves articles filtered by keyword.
 * Sorts the articles based on how well they match the keyword in different fields (title, description, content).
 * Combines and deduplicates the articles to provide the most relevant results.
 * Utilizes caching to store and retrieve filtered articles.
 */
const fetchByKeyword = async (req, res) => {
    try {
        const cacheKey = `keyword_${req.query.q}`;
        const cachedArticles = fetchFromCache(cacheKey);

        if (cachedArticles) {
            return res.json(cachedArticles);
        }

        const articles = await NewsService.searchArticlesByKeyword(req.query.q);
        const filteredArticles = SortArticles(articles, req.query.q, 'title');
        const filteredByDescription = SortArticles(articles, req.query.q, 'description');
        const filteredByContent = SortArticles(articles, req.query.q, 'content');

        const combinedArticles = [...filteredArticles, ...filteredByDescription, ...filteredByContent];

        const uniqueArticles = Array.from(new Set(combinedArticles.map(a => a.title)))
            .map(title => combinedArticles.find(a => a.title === title));

        saveToCache(cacheKey, uniqueArticles);
        res.json(uniqueArticles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getArticles,
    fetchByTitle,
    fetchByAuthor,
    fetchByKeyword
}
