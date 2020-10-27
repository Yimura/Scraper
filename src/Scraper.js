"use strict"
const https = require('https');
const { BaseParams, YouTubeURL } = require('./Constants.js');
const Util = require('./Util.js');

class Scraper {
    constructor() { }

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
     * @param {string} webPage The YouTube webpage with search results
     */
    _getSearchData(webPage) {
        const data =
            // Split at the start of our Data
            webPage.split('// scraper_data_begin')[1].trim()
            // Split at the end of our data
            .split('// scraper_data_end')[0].trim()
            // Remove the last ";" character
            .slice(0, -1)
            // Remove the variable at the start of our data
            .slice('var ytInitialData = '.length);

        try {
            return JSON.parse(data);
        } catch (e) {
            throw new Error('Failed to parse YouTube search data. YouTube might have updated their site or no results returned.');
        }
    }

    /**
     * @private
     * @param {string} search_query
     * @returns {string} The entire YouTube webpage as a string
     */
    _fetch(search_query) {
        YouTubeURL.search = new URLSearchParams(this._assign(BaseParams, { search_query }));

        return new Promise((resolve, reject) => {
            https.get(YouTubeURL, res => {
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
    async search(query) {
        const webPage = await this._fetch(query);
        const parsedJson = this._getSearchData(webPage);

        return this._extractData(parsedJson);
    }

    /**
     * @param {string} query The string to search for on youtube
     */
    async searchOne(query) {
        return (await this.search(query))[0];
    }
}
module.exports = Scraper;
