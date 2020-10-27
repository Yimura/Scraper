"use strict"
exports.compress = function(key) {
    return (key && key['runs'] ? key['runs'].map((v) => v.text) : []).join('');
}

function isChannelVerified(vRender) {
    const badges = (vRender['ownerBadges'] ?
        vRender['ownerBadges'].map((badge) => badge['metadataBadgeRenderer']['style']) : []
    );
    return badges.includes('BADGE_STYLE_TYPE_VERIFIED_ARTIST');
}
exports.getChannelData = function(vRender) {
    const channel = vRender.ownerText.runs[0];

    return {
        name: channel.text,
        link: 'https://www.youtube.com'+ channel['navigationEndpoint']['commandMetadata']['webCommandMetadata']['url'],
        verified: isChannelVerified(vRender)
    };
}

exports.getUploadDate = function(vRender) {
    return vRender['publishedTimeText'] ? vRender['publishedTimeText']['simpleText'] : '';
}

exports.getViews = function(vRender) {
    return parseInt(vRender.viewCountText.simpleText.replace(/[^0-9]/g, ''));
}

exports.idToThumbnail = function(id) {
    return 'https://i.ytimg.com/vi/'+ id +'hqdefault.jpg';
}

exports.parseDuration = function(vRender) {
    const nums = vRender.lengthText.simpleText.split(':');
    let sum = 0;
    let multi = 1;

    while (nums.length > 0) {
        sum += multi * parseInt(nums.pop() || '-1', 10);
        multi *= 60;
    }

    return sum;
}

exports.shareLink = function(id, short = true) {
    return short ? 'https://youtu.be/'+ id : 'https://www.youtube.com/watch?v='+ id;
}
