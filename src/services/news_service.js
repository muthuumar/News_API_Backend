const axios = require('axios');

/**
 * NewsService class provides methods to fetch news articles from a remote API using specific search queries.
 * This class implements the Singleton pattern to ensure only one instance is created.
 *
 * @class NewsService
 */
class NewsService {

    constructor(apiKey, baseUrl) {
        if (NewsService.instance) {
            return NewsService.instance;
        }

        this.apiKey = apiKey;
        this.baseUrl = baseUrl;

        NewsService.instance = this;
    }

    async fetchArticles(query, maxResults = 10) {
        try {
            const response = await axios.get(`${this.baseUrl}/search`, {
                params: {
                    q: query,
                    max: maxResults,
                    lang:'en',
                    token: this.apiKey,
                },
            });
            return response.data.articles;
        } catch (error) {
            console.error('Error fetching articles:', error.message);
            throw new Error('Error fetching articles');
        }
    }

    async fetchArticleByTitle(title) {
        return this.fetchArticles(title);
    }

    async fetchArticlesByAuthor(author) {
        return this.fetchArticles(author);
    }

    async searchArticlesByKeyword(keyword) {
        return this.fetchArticles(keyword);
    }
}

const NewsServices = new NewsService(process.env.GNEWS_API_KEY, process.env.GNEWS_BASE_URL);

module.exports = NewsServices;