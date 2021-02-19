"use strict"
const Test = require('./Test.js');

const time = () => process.hrtime.bigint();
const average = (arr) => {
    let acc = BigInt(0);
    arr.forEach(val => acc += val);

    return acc / BigInt(arr.length);
};
const size = 20;

const channelTimings = async () => {
    const timings = [];
    const queries = ['NCS', 'Rick Astley', 'Freddie Mercury', 'ilmango', 'DGR'];

    for (let i = 0; i < size; i++) {
        const t = time();

        await Test.searchChannel(queries[Math.floor(Math.random() * queries.length)]);

        timings.push(time() - t);
    }

    return ['channel', average(timings)];
};

const playlistTimings = async () => {
    const timings = [];
    const queries = ['NCS', 'Gaming Music', 'GTA V Chaos Mod', 'Nature'];

    for (let i = 0; i < size; i++) {
        const t = time();

        await Test.searchPlaylist(queries[Math.floor(Math.random() * queries.length)]);

        timings.push(time() - t);
    }

    return ['playlist', average(timings)];
};

const videoTimings = async () => {
    const timings = [];
    const queries = ['Flo Rida - Right Round', 'Never Gonna Wake You Up', 'Donut-shaped C code that generates a 3D spinning donut', 'LazyPurple Clips: a horribly unfortunate spy'];

    for (let i = 0; i < size; i++) {
        const t = time();

        await Test.search(queries[Math.floor(Math.random() * queries.length)]);

        timings.push(time() - t);
    }

    return ['video', average(timings)];
};

const main = async () => {
    console.log('Running parallel Tests...\n');

    const promises = [];

    promises.push(channelTimings());
    promises.push(playlistTimings());
    promises.push(videoTimings());

    const results = await Promise.all(promises);

    console.log('Type'.padStart(10), ' | ', 'Avg Time (ms)');
    results.forEach(([type, nanos]) => console.log(type.padStart(10), ' | ', Number(nanos) / 1e6));

    console.log('\nFinished all tests, batch size: ', size);
};

main();
