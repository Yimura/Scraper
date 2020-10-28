"use strict"
const Test = require('./Test.js');

const main = async () => {
    console.log('Starting Tests...\n');

    const startTime = Date.now();
    const tests = 4;

    const uploadDate = await Test.language();
    console.log(`Language test returned a value of "${uploadDate}", this should be an upload date in "fr-FR".`);

    const resultCount = await Test.limit();
    if (resultCount !== 5) {
        throw new Error('Limit test did not return the expected amount of results.');
    }
    console.log('Limit test returned the expected amount of results (5).');

    const results = await Test.search();
    console.log(`Normal search returned ${results} results.`);

    const result = await Test.searchOne();
    console.log(`Single Result Search returned a track from "${result.channel.name}"`);

    console.log(`
Finished tests with an average of ${(Date.now() - startTime) / tests}ms over ${tests}.
The overall speed of the tests was ${Date.now() - startTime}ms.
    `);
};

main();
