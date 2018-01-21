export default class Song {
    constructor({id, mid, singer, name, album, duration, image, url}) {
        this.id = id;
        this.mid = mid;
        this.singer = singer;
        this.name = name;
        this.album = album;
        this.duration = duration;
        this.image = image;
        this.url = url;
    };
};

export const createSong = musicData => {
    return new Song({
        id: musicData.songid,
        mid: musicData.mid,
        singer: filterSinger(musicData.singer),
        name: musicData.songname,
        album: musicData.albumname,
        duration: musicData.interval,
        image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
        url: `http://dl.stream.qqmusic.qq.com/${musicData.songid}.m4a?vkey=51257F6D49A0C42EB5590D4778483E787EE8B9E53E1FE9D6D1BD16E25DC6179684E93B61B70AD496E6092FC076D2078992DAA2734391E448&guid=1408057560&uin=0&fromtag=66`
    });
};

const filterSinger = singer => {
    let ret = [];
    if (!singer) {
        return '';
    }
    singer.forEach(s => {
        ret.push(s.name);
    });
    return ret.join('/');
};
