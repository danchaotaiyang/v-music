<template>
<div class="singer">
    <list-view :data="singers" @select="selectSinger"></list-view>
    <router-view></router-view>
</div>
</template>

<script>
import {getSingerList} from '@/api/singer';
import {ERR_OK} from '@/api/config';
import Singer from '@/assets/js/singer';
import ListView from '@/base/listview/listview';

import {mapMutations} from 'vuex';

const HOT_NAME = '热门';
const HOT_SINGER_LENGTH = 10;

export default {
    data() {
        return {
            singers: []
        };
    },
    components: {ListView},
    created() {
        setTimeout(() => {
            this._getSingerList();
        }, 80);
    },
    methods: {
        ...mapMutations({
            setSinger: 'SET_SINGER'
        }),
        selectSinger(singer) {
            this.$router.push({
                path: `/singer/${singer.id}`
            });
            this.setSinger(singer);
        },
        _getSingerList() {
            getSingerList()
                .then((res) => {
                    if (res.code === ERR_OK) {
                        this.singers = this._normalizeSinger(res.data.list);
                    }
                });
        },
        _normalizeSinger(list) {
            let map = {
                hot: {
                    title: HOT_NAME,
                    items: []
                }
            };
            list.forEach((item, index) => {
                if (index < HOT_SINGER_LENGTH) {
                    map.hot.items.push(new Singer({
                        id: item.Fsinger_mid,
                        name: item.Fsinger_name
                    }));
                }
                const key = item.Findex;
                if (!map[key]) {
                    map[key] = {
                        title: key,
                        items: []
                    };
                }
                map[key].items.push(new Singer({
                    id: item.Fsinger_mid,
                    name: item.Fsinger_name
                }));
            });
            // 得到有序列表，处理map
            let hot = [];
            let ret = [];
            for(let k in map) {
                let mk = map[k];
                if (mk.title.match(/[a-zA-Z]/)) {
                    ret.push(mk);
                } else if (mk.title === HOT_NAME) {
                    hot.push(mk);
                }
                ret.sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0));
            }
            return [...hot, ...ret];
        }
    }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.singer {
    position: fixed;
    top: 88px;
    bottom: 0;
    width: 100%;
}
</style>
