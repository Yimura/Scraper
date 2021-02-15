"use strict"
const Scraper = require('../index.js').default;

const youtube = new Scraper();

exports.language = () => {
    return new Promise((resolve, reject) => {
        youtube.search('Never gonna give you up', { language: 'fr-FR' }).then(results => {
            resolve(results.videos[0].uploaded);
        });
    });
}

exports.search = () => {
    return new Promise((resolve, reject) => {
        youtube.search('Never gonna give you up').then(results => {
            resolve(results.videos.length);
        });
    });
};

exports.searchLive = () => {
    return new Promise((resolve, reject) => {
        youtube.search('NCS', {
            searchType: 'live'
        }).then(resolve);
    });
}

exports.searchPlaylist = () => {
    return new Promise((resolve, reject) => {
        youtube.search('NCS', {
            searchType: 'playlist'
        }).then(resolve);
    });
}