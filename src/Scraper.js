"use strict"
const fetch = require('node-fetch');
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
            // Remove the last character
            .slice(0, -1)
            // Remove the variable at the start of our data
            .slice('var ytInitialData = '.length);

        return JSON.parse(data);
    }

    /**
     * @private
     * @param {string} search_query
     * @returns {string} The entire YouTube webpage as a string
     */
    async _fetch(search_query) {
        YouTubeURL.search = new URLSearchParams(this._assign(BaseParams, { search_query }));

        const res = await fetch(YouTubeURL);
        return res.text();
    }

    async search(query) {
        const webPage = await this._fetch(query);
        const parsedJson = this._getSearchData(webPage);

        return this._extractData(parsedJson);
    }
}
module.exports = Scraper;
