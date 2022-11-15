"use strict"
function assign(...args) {
    return Object.assign(...args);
}

const compress = (key) => {
    return (key && key['runs'] ? key['runs'].map((v) => v.text) : []).join('');
}

const isChannelVerified = (vRender) => {
    const badges = (vRender['ownerBadges'] ?
        vRender['ownerBadges'].map((badge) => badge['metadataBadgeRenderer']['style']) : []
    );
    return badges.includes('BADGE_STYLE_TYPE_VERIFIED') || badges.includes('BADGE_STYLE_TYPE_VERIFIED_ARTIST');
}

const getChannelData = (vRender) => {
    const channel = vRender.ownerText?.runs[0];
    if (!channel) return {
        name: 'Unknown Channel',
        link: null,
        verified: false
    };

    return {
        name: channel.text,
        link: 'https://www.youtube.com'+ channel['navigationEndpoint']['commandMetadata']['webCommandMetadata']['url'],
        verified: isChannelVerified(vRender)
    };
}

const getChannelLink = (cRender) => {
    return 'https://www.youtube.com' + cRender.navigationEndpoint.browseEndpoint.canonicalBaseUrl;
}

const getChannelVideoCount = (cRender) => {
    if (!cRender.videoCountText?.runs) return 0;
    return +cRender.videoCountText.runs[0].text;
}

const getGeneralData = (renderer) => {
    return {
        channel: getChannelData(renderer),
        id: renderer.videoId,
        link: shareLink(renderer.videoId, false),
        thumbnail: idToThumbnail(renderer.videoId),
        title: compress(renderer.title),
        shareLink: shareLink(renderer.videoId)
    };
}

const getPlaylistGeneralData = (pRender) => {
    const id = pRender.playlistId;

    return {
        channel: getChannelData(pRender),
        id,
        link: 'https://www.youtube.com/playlist?list=' + id,
        thumbnail: getPlaylistThumbnail(pRender),
        title: pRender.title.simpleText
    };
}

const getPlaylistThumbnail = (pRender) => {
    return idToThumbnail(pRender.navigationEndpoint.watchEndpoint.videoId);
}

const getPlaylistVideoData = (renderer) => {
    return {
        duration: parseDuration(renderer),
        duration_raw: renderer.lengthText ? renderer.lengthText.simpleText : '00:00:00',
        id: renderer.videoId,
        link: shareLink(renderer.videoId, false),
        thumbnail: idToThumbnail(renderer.videoId),
        title: compress(renderer),
        shareLink: shareLink(renderer.videoId)
    };
}

const getUploadDate = (vRender) => {
    return vRender['publishedTimeText'] ? vRender['publishedTimeText']['simpleText'] : '';
}

const getViews = (vRender) => {
    if (!vRender.viewCountText?.simpleText) return 0;
    return +vRender.viewCountText.simpleText.replace(/[^0-9]/g, '');
}

const getWatching = (vRender) => {
    if (!vRender.viewCountText?.runs) return 0;
    return +vRender.viewCountText.runs[0].text.replace(/[^0-9]/g, '');
}

const idToThumbnail = function(id) {
    return 'https://i.ytimg.com/vi/'+ id +'/maxresdefault.jpg';
}

const parseDuration = (vRender) => {
    if (!vRender.lengthText?.simpleText) return 0;

    const nums = vRender.lengthText.simpleText.split(':');
    let time = nums.reduce((a, t) => (60 * a) + +t) * 1e3;

    return time;
}

const shareLink = (id, short = true) => {
    return short ? 'https://youtu.be/'+ id : 'https://www.youtube.com/watch?v='+ id;
}

exports.getChannelData = (item) => {
    const cRender = item.channelRenderer;
    const id = cRender.channelId;

    return {
        channelId: id,
        description: compress(cRender.descriptionSnippet),
        link: getChannelLink(cRender),
        thumbnails: cRender.thumbnail.thumbnails,
        subscribed: cRender.subscriptionButton.subscribed,
        uploadedVideos: getChannelVideoCount(cRender),
        verified: isChannelVerified(cRender)
    };
};

exports.getPlaylistData = (item) => {
    const pRender = item.playlistRenderer;
    const preview = [];

    pRender.videos.forEach(video => preview.push(
        getPlaylistVideoData(video.childVideoRenderer)
    ));

    return assign({
        preview,
        videoCount: +pRender['videoCount']
    }, getPlaylistGeneralData(pRender));
}

exports.getStreamData = (item) => {
    const vRender = item.videoRenderer;

    return assign({
        watching: getWatching(vRender)
    }, getGeneralData(vRender))
}

exports.getVideoData = (item) => {
    const vRender = item.videoRenderer;

    return assign({
        description: compress(vRender.descriptionSnippet),
        duration: parseDuration(vRender),
        duration_raw: vRender.lengthText ? vRender.lengthText.simpleText : '00:00:00',
        uploaded: getUploadDate(vRender),
        views: getViews(vRender)
    }, getGeneralData(vRender));
};

exports.isChannel = (item) => typeof item.channelRenderer !== 'undefined';
exports.isPlaylist = (item) => typeof item.playlistRenderer !== 'undefined';
exports.isStream = (item) => item.videoRenderer && !item.videoRenderer.lengthText;
exports.isVideo = (item) => item.videoRenderer && item.videoRenderer.lengthText;
