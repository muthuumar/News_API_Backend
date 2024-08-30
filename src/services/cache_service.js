/**
 * A simple caching utility using the `node-cache` module.
 * Provides functions to fetch data from the cache and save data to the cache.
 *
 * The cache has a standard time-to-live (TTL) of 300 seconds (5 minutes).
 *
 * @module cacheUtility
 */

const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: 300 });

const fetchFromCache = (cacheKey) => {
    return cache.get(cacheKey);
};

const saveToCache = (cacheKey, data) => {
    cache.set(cacheKey, data);
};

module.exports = {
    fetchFromCache,
    saveToCache
};