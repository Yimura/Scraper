# YouTube Scraper
## Why use this package?

It is a YouTube scraper with zero dependencies.
Everything has been coded to have a minimal footprint creating a small package which also makes very fast.

### Timings

These are the timings I would get on average over 20 tests, ofcourse the Fetch time depends on how good your connection is to YouTube and how loaded YouTube is at that point.

| Fetch Time | Processing Time |
|---|---|
| 773.918144 ms | 3.117175 ms |

```
These are results for the VIDEO search type only, these are by far the slowest to fetch.
Any other type will in general be over 200ms faster.
```

## Options

| Property | Default | Description |
|---|---|---|
| language | `en` | Set the language that you would like for results to be returned in. A list of supported language types can be found [here](http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry). |
| searchType | `video` | Which type to search for on YouTube, supported types are `any`,`live`, `movie`, `playlist` and `video` |

### Example
You can set the global language which YouTube should return results in or set the return language per search/request:
```js
import youtube from '@yimura/scraper'

// This will set the language to French from France globally
const yt = new youtube.default('fr-FR');

// Sets the language communicated to YouTube to Dutch from Belgium for this search
const results = yt.search('Never gonna give you up', { language: 'nl-BE' });
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

## Return Object Structure
```js
{
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

