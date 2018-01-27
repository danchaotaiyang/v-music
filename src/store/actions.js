import * as types from './mutation-types';
import {getSongUrl} from '@/api/singer';
import {ERR_OK} from '@/api/config';

export const selectPlay = ({commit, state}, {list, index}) => {
    let currentSong = list[index];
    getSongUrl(currentSong.id)
        .then((res) => {
            if (res.code !== ERR_OK) {
                return;
            }
            console.log(res.data.items[0].vkey);
            commit(types.SET_SONG_READY, true);
            if (!res.data.items[0].vkey) {
                alert('歌曲地址未获取到');
                commit(types.SET_SONG_READY, true);
                return false;
            }
            currentSong.url = `http://dl.stream.qqmusic.qq.com/C400${list[index].id}.m4a?vkey=${res.data.items[0].vkey}&guid=1408057560&uin=0&fromtag=66`;
            commit(types.SET_SEQUENCE_LIST, list);
            commit(types.SET_PLAY_LIST, list);
            commit(types.SET_CURRENT_INDEX, index);
            commit(types.SET_FULL_SCREEN, true);
            commit(types.SET_PLAYING_STATE, true);
            commit(types.SET_SONG_READY, true);

        });
};

