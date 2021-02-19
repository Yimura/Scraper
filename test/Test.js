"use strict"
const Scraper = require('../index.js').default;

const youtube = new Scraper();

exports.language = () => {
    return youtube.search('Never gonna give you up', { language: 'fr-FR' });
}

exports.search = (q = 'Never gonna give you up') => {
    return youtube.search(q);
};

exports.searchChannel = (q = 'NCS') => {
    return youtube.search(q, {
        searchType: 'channel'
    });
};

exports.searchLive = (q = 'NCS') => {
    return youtube.search(q, {
        searchType: 'live'
    });
}

exports.searchPlaylist = (q = 'NCS') => {
    return youtube.search(q, {
        searchType: 'playlist'
    });
}