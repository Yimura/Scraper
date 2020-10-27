const Scraper = require('../index.js').default;

const youtube = new Scraper();
const startTime = Date.now();

youtube.search('Never gonna give you up').then(results => {
    console.log(`Fetched ${results.length} tracks in ${Date.now() - startTime}ms.`);
});
