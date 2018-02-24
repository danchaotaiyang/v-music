import * as types from './mutation-types';
import {getSongUrl} from '@/api/singer';
import {ERR_OK} from '@/api/config';
import {playMode} from '@/assets/js/config';
import {shuffle} from '@/assets/js/util';

export const selectPlay = ({commit, state}, {list, index}) => {
    let currentSong = list[index];
    getSongUrl(currentSong.id)
        .then((res) => {
            if (res.code !== ERR_OK) {
                return;
            }
            console.log(res.data.items[0].vkey);
            if (!res.data.items[0].vkey) {
                alert('应版权方要求，该数字专辑单独付费后即可畅享！');
                commit(types.SET_SONG_READY, true);
                return false;
            }
            currentSong.url = `http://dl.stream.qqmusic.qq.com/C400${currentSong.id}.m4a?vkey=${res.data.items[0].vkey}&guid=1408057560&uin=0&fromtag=66`;
            commit(types.SET_SEQUENCE_LIST, list);
            commit(types.SET_PLAY_LIST, list);
            commit(types.SET_CURRENT_INDEX, index);
            commit(types.SET_FULL_SCREEN, true);
            commit(types.SET_PLAYING_STATE, true);
            commit(types.SET_SONG_READY, true);

        });
};

export const randomPlay = ({commit}, {list, index}) => {
    let randomList = shuffle(list);
    let currentSong = randomList[index];
    getSongUrl(currentSong.id)
        .then((res) => {
            if (res.code !== ERR_OK) {
                return;
            }
            console.log(res.data.items[0].vkey);
            if (!res.data.items[0].vkey) {
                alert('应版权方要求，该数字专辑单独付费后即可畅享！');
                commit(types.SET_SONG_READY, true);
                return false;
            }
            currentSong.url = `http://dl.stream.qqmusic.qq.com/C400${currentSong.id}.m4a?vkey=${res.data.items[0].vkey}&guid=1408057560&uin=0&fromtag=66`;
            commit(types.SET_PLAY_MODE, playMode.random);
            commit(types.SET_SEQUENCE_LIST, list);
            commit(types.SET_PLAY_LIST, randomList);
            commit(types.SET_CURRENT_INDEX, 0);
            commit(types.SET_FULL_SCREEN, true);
            commit(types.SET_PLAYING_STATE, true);
            commit(types.SET_SONG_READY, true);
        });
};
