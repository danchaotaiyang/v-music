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
    console.log(musicData);
    return new Song({
        id: musicData.songmid,
        mid: musicData.mid,
        singer: filterSinger(musicData.singer),
        name: musicData.songname,
        album: musicData.albumname,
        duration: musicData.interval,
        image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
        url: `http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?vkey=350B34525FE8B1C0A5BDFFDDE9ECAB86BBFAACEA96EDAB44C6601FCADCA9A449E277FFEF9DF2E1749C546D5B8144203CFEE160584076348B&guid=1408057560&uin=0&fromtag=66`
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
