"use strict"
const https = require('https');
const { BaseParams, YouTubeURL } = require('./Constants.js');
const Util = require('./Util.js');

class Scraper {
    /**
     * @param {string} [language = 'en'] An IANA Language Subtag, see => http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry
     */
    constructor(language = 'en') {
        this._lang = language;
    }

    /**
     * @private
     */
    _assign(...args) {
        return Object.assign({}, ...args);
    }

    /**
     * @param {Object} json
     */
    _extractData(json) {
        json = json.contents
            .twoColumnSearchResultsRenderer
            .primaryContents
            .sectionListRenderer
            .contents[0]
            .itemSectionRenderer
            .contents;

        const results = [];
        json.forEach((item, i) => {
            if (!item?.videoRenderer) return;

            const vRender = item.videoRenderer;
            const id = vRender.videoId;

            const result = {
                channel: Util.getChannelData(vRender),
                description: Util.compress(vRender.descriptionSnippet),
                duration: Util.parseDuration(vRender),
                id,
                link: Util.shareLink(id, false),
                thumbnail: Util.idToThumbnail(id),
                shareLink: Util.shareLink(id),
                title: Util.compress(vRender.title),
                uploaded: Util.getUploadDate(vRender),
                views: Util.getViews(vRender)
            };

            results.push(result);
        });

        return results;
    }

    /**
     * @private
     * @param {string} webPage The YouTube webpage with search results
     */
    _getSearchData(webPage) {
        const startString = 'var ytInitialData = ';
        const start = webPage.indexOf(startString);
        const end = webPage.indexOf(';</script>', start);

        const data = webPage.substring(start + startString.length, end);

        try {
            return JSON.parse(data);
        } catch (e) {
            throw new Error('Failed to parse YouTube search data. YouTube might have updated their site or no results returned.');
        }
    }

    /**
     * @private
     * @param {string} search_query
     * @param {string} [requestedLang=null]
     * @returns {string} The entire YouTube webpage as a string
     */
    _fetch(search_query, requestedLang = null) {
        if (requestedLang && typeof requestedLang !== 'string') {
            throw new TypeError('The request language property was not a string while a valid IANA language subtag is expected.');

            return;
        }

        YouTubeURL.search = new URLSearchParams(this._assign(BaseParams, { search_query }));

        return new Promise((resolve, reject) => {
            https.get(YouTubeURL, {
                headers: {
                    'Accept-Language': requestedLang ? requestedLang : this._lang
                }
            }, res => {
                res.setEncoding('utf8');

                let data = '';

                res.on('data', chunk => {
                    data += chunk;
                });
                res.on('end', () => resolve(data));
            }).on('error', reject);
        });
    }

    /**
     * @param {string} query The string to search for on youtube
     */
    async search(query, options = {}) {
        const webPage = await this._fetch(query, options.language);
        const parsedJson = this._getSearchData(webPage);

        const limit = isNaN(options.limit) ? 50 : options.limit;

        return this._extractData(parsedJson).slice(0, limit);
    }

    /**
     * @param {string} query The string to search for on youtube
     */
    async searchOne(query, options) {
        return (await this.search(query, options))[0];
    }

    /**
     * @param {string} [language='en']
     */
    setLang(language = 'en') {
        this._lang = language;
    }
}
module.exports = Scraper;
