<template>
<transition name="slide">
    <music-list class="singer-detail" :songs="songs" :title="title" :bg-image="bgImage"></music-list>
</transition>
</template>

<script>
import {mapGetters} from 'vuex';
import {getSingerDetail} from '@/api/singer';
import {ERR_OK} from '@/api/config';
import {createSong} from '@/assets/js/song';
import MusicList from '@/components/music-list/music-list';
export default {
    data() {
        return {
            detail: [],
            songs: []
        };
    },
    components: {MusicList},
    computed: {
        title() {
            return this.singer.name;
        },
        bgImage() {
            return this.singer.avatar;
        },
        ...mapGetters([
            'singer'
        ])
    },
    methods: {
        _getSingerDetail() {
            if (!this.singer.id) {
                this.$router.push({path: '/singer'});
                return;
            }
            getSingerDetail(this.singer.id)
                .then((res) => {
                    if (res.code === ERR_OK) {
                        this.songs = this._normalizeSong(res.data.list);
                    }
                });
        },
        _normalizeSong(list) {
            let ret = [];
            list.forEach(item => {
                let {musicData} = item;
                if (musicData.songid && musicData.albummid) {
                    ret.push(createSong(musicData));
                }
            });
            return ret;
        }
    },
    created() {
        this._getSingerDetail();
    }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/sass/util/variables";
@import "../../assets/sass/util/mixins";

.singer-detail {
    position: fixed;
    z-index: 100;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: $color-background;
}

.slide-enter-active,
.slide-leave-active {
    @include transition(all .15s ease-out);
}

.slide-enter,
.slide-leave-to {
    @include transform(translate(100%, 0));
}
</style>
