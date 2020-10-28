"use strict"
const Scraper = require('../index.js').default;

const youtube = new Scraper();

exports.language = () => {
    return new Promise((resolve, reject) => {
        youtube.search('Never gonna give you up', { language: 'fr-FR' }).then(results => {
            resolve(results[0].uploaded);
        });
    });
}

exports.limit = () => {
    return new Promise((resolve, reject) => {
        youtube.search('Never gonna give you up', { limit: 5 }).then(results => {
            resolve(results.length);
        });
    });
}

exports.search = () => {
    return new Promise((resolve, reject) => {
        youtube.search('Never gonna give you up').then(results => {
            resolve(results.length);
        });
    });
};

exports.searchOne = () => {
    return new Promise((resolve, reject) => {
        youtube.searchOne('Never gonna give you up').then(results => {
            resolve(results);
        });
    });
}
