# YouTube Scraper

## Table of Contents

 * [Why use this package](#why-use-this-package)
    - [Timings](#timings)
 * [Options](#options)
    - [Example Options](#example-options)
 * [Example Code](#example-code)
    * [Output](#output)
 * [Return Object Structure](#return-object-structure)

## Why use this package?

This is a YouTube scraper with zero dependencies.
Everything has been coded to have a minimal footprint creating a small package that's aimed at being as fast as possible.

### Timings

These are the timings I would get on average over 20 tests, ofcourse the Fetch time depends on how good your connection is to YouTube and how loaded YouTube is at that point.

| Type | Fetch Time | Processing Time |
|---|---|---|
| `video` | 585.632055 ms | 3.117175 ms |
| `channel` | 494.026065 ms | `not tested` |
| `playlist` | 569.424545 ms | `not tested` |

[Check here](https://prnt.sc/1018ttl)

## Options

| Property | Default | Description |
|---|---|---|
| language | `en` | Set the language that you would like for results to be returned in. A list of supported language types can be found [here](http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry). |
| searchType | `video` | Which type to search for on YouTube, supported types are `any`, `channel`, `live`, `movie`, `playlist` and `video` |
```
"Sort by" has not been implemented as of now.
All data is sorted in the default order that YouTube returns these in.
```

### Example Options
You can set the global language which YouTube should return results in or set the return language per search/request:
```js
import youtube from '@yimura/scraper'

// This will set the language to French from France globally
const yt = new youtube.default('fr-FR');

// Sets the language communicated to YouTube to Dutch from Belgium for this search
const results = yt.search('Never gonna give you up', {
    language: 'nl-BE',
    searchType: 'video' // video is the default search type
});
```

## Example Code

**CommonJS:**
```js
const Scraper = require('@yimura/scraper').default;

const youtube = new Scraper();

youtube.search('Never gonna give you up').then(results => {
    console.log(results.videos[0]);
});
```

**ESModule:**
```js
import youtube from '@yimura/scraper'

const yt = new youtube.default();
yt.search('Never gonna give you up').then(results => {
    console.log(results.videos[0]);
});
```

### Output

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

## Return Object Structure
```js
{
    channels: [
        {
            channelId: String,
            description: String,
            link: String,
            thumbnails: [
                {
                    url: String,
                    width: Number,
                    height: Number
                }
            ],
            subscribed: Boolean,
            uploadedVideos: Number,
            verified: Boolean
        }
    ],
    playlists: [
        {
            preview: [
                {
                    duration: Number,
                    views: Number,
                    id: String,
                    link: String,
                    thumbnail: String,
                    title: String,
                    shareLink: String
                }
            ],
            id: String,
            link: String,
            thumbnail: String,
            title: String,
            videoCount: Number
        }
    ],
    streams: [
        {
            watching: Number,
            channel: {
                name: String,
                link: String,
                verified: Boolean
            },
            id: String,
            link: String,
            thumbnail: String,
            title: String,
            shareLink: String
        }
    ],
    videos: [
        {
            description: String,
            duration: Number,
            uploaded: String,
            views: Number,
            channel: {
                name: String,
                link: String,
                verified: Boolean
            },
            id: String,
            link: String,
            thumbnail: String,
            title: String,
            shareLink: String
        }
    ]
}
```

