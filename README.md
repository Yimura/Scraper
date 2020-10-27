# Scraper
A YouTube scraper that uses minimal dependencies.

## Why use this scraper?

This scraper only uses the HTTPS package from NodeJS, no other dependencies required.

In general this scraper will perform up to several 100 milliseconds better than others, from testing "node-fetch" vs "https" we could already denote a difference of 300ms on average.

## Example Code

CommonJS:
```js
const Scraper = require('@yimura/scraper').default;

const youtube = new Scraper();

youtube.search('Never gonna give you up').then(results => {
    console.log(results[0]);
});
```

ESModule:
```js
import youtube from '@yimura/scraper'

const yt = new youtube.default();
yt.search('Never gonna give you up').then(results => {
    console.log(results[0]);
});
```

## Example Result

```js
{
    channel: {
        name: 'Official Rick Astley',
        link: 'https://www.youtube.com/channel/UCuAXFkgsw1L7xaCfnd5JJOw',
        verified: true
    },
    description: "Rick Astley's official music video for “Never Gonna Give You Up” Listen to Rick Astley: https://RickAstley.lnk.to/_listenYD Subscribe ...",
    duration: 213,
    id: 'dQw4w9WgXcQ',
    link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQhqdefault.jpg',
    shareLink: 'https://youtu.be/dQw4w9WgXcQ',
    title: 'Rick Astley - Never Gonna Give You Up (Video)',
    uploaded: '11 jaar geleden',
    views: 788551856
}
```
