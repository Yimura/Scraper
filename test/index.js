"use strict"
const Test = require('./Test.js');

const main = async () => {
    console.log('Starting Tests...\n');

    const startTime = Date.now();
    const tests = 4;

    const uploadDate = await Test.language();
    console.log(`Language test returned a value of "${uploadDate}", this should be an upload date in "fr-FR".`);

    const results = await Test.search();
    console.log(`Normal search returned ${results} results.`);

    const live = await Test.searchLive();
    console.log(`Returned ${live.streams.length} live streams.`);

    const playlist = await Test.searchPlaylist();
    console.log(`Returned ${playlist.playlists.length} playlists.`);

    console.log(`
Finished tests with an average of ${(Date.now() - startTime) / tests}ms over ${tests}.
The overall speed of the tests was ${Date.now() - startTime}ms.
    `);
};

main();
