"use strict"
const searchType = {
    ANY: 'CAA%253D',
    CHANNEL: 'EgIQAg%253D%253D',
    PLAYLIST: 'EgIQAw%253D%253D',
    MOVIE: 'EgIQBA%253D%253D',
    LIVE: 'EgJAAQ%253D%253D',
    VIDEO: 'EgIQAQ%253D%253D'
};

exports.BaseParams = { sp: searchType['VIDEO'] };
exports.SearchType = searchType;
exports.YouTubeURL = new URL('https://youtube.com/results');
