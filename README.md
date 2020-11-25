# Scraper
A YouTube scraper that uses no external packages.

## Why use this scraper?

This package only uses/imports one package, "https" with which it can get low latency results.

Aside from that it's so much faster than any other NodeJS YouTube scraper package with requests being easily under 700 milliseconds!

## Options

You can set the global language which YouTube should return results in or set the return language per search/request:
```js
import youtube from '@yimura/scraper'

// This will set the language to French from France globally
const yt = new youtube.default('fr-FR');

// Sets the language communicated to YouTube to Dutch from Belgium for this search
const result = yt.search('Never gonna give you up', { language: 'nl-BE' });
```

As well can you limit the amount of results the package returns to you:
```js
import youtube from '@yimura/scraper'

const yt = new youtube.default();

// Returns only 5 results instead of the usual 19
const result = yt.search('Never gonna give you up', { limit: 5 });
```

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
    uploaded: '11 years ago',
    views: 788551856
}
```
