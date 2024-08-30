/**
 * Sorts an array of articles based on how closely the specified field values match a query string.
 * Since there is no API to specifically retrieve topics like titles, keywords, or authors, 
 * this function handles the sorting to prioritize the most relevant results by matching 
 * the query with the specified field.
 * 
 * It supports both direct and nested fields within the article objects.
 */

const SortArticles = (articles, query, field) => {
    const queryWords = query?.toLowerCase().split(' ');

    const isNestedField = field.includes('.');

    return articles
        .sort((a, b) => {
            const aValue = isNestedField ? getNestedValue(a, field) : a[field];
            const bValue = isNestedField ? getNestedValue(b, field) : b[field];
            
            const aStr = aValue ? aValue.toLowerCase() : '';
            const bStr = bValue ? bValue.toLowerCase() : '';

            const aMatches = queryWords.filter(word => aStr.includes(word)).length;
            const bMatches = queryWords.filter(word => bStr.includes(word)).length;

            return bMatches - aMatches;
        });
};

const getNestedValue = (obj, path) => {
    return path
        .split('.')
        .reduce((acc, part) => acc && acc[part], obj);
};

module.exports = {
    SortArticles
}