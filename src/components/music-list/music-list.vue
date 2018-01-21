<template>
<div class="music-list">
    <div class="back"><i class="icon-back"></i></div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" :style="bgStyle" ref="bgImage">
        <div class="filter" ref="filter"></div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <scroll :data="songs" class="list" ref="list" :probeType="probeType" :listen-scroll="listenScroll" @scroll="scroll">
        <div class="song-list-wrapper">
            <song-list :songs="songs"></song-list>
        </div>
        <div class="loading-container" v-show="!songs.length">
            <loading></loading>
        </div>
    </scroll>
</div>
</template>

<script>
import Loading from '@/base/loading/loading';
import Scroll from '@/base/scroll/scroll';
import SongList from '@/base/song-list/song-list';

const RESERVE_HEIGHT = 40;

export default {
    props: {
        bgImage: {
            type: String,
            default: ''
        },
        songs: {
            type: Array,
            default: []
        },
        title: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            scrollY: 0
        };
    },
    components: {Loading, Scroll, SongList},
    methods: {
        scroll(pos) {
            this.scrollY = pos.y;
        }
    },
    computed: {
        bgStyle() {
            return `background-image: url(${this.bgImage})`;
        }
    },
    created() {
        this.probeType = 3;
        this.listenScroll = true;
    },
    mounted() {
        this.imageHeight = this.$refs.bgImage.clientHeight;
        this.minTranslateY = -this.imageHeight + RESERVE_HEIGHT;
        this.$refs.list.$el.style.top = `${this.$refs.bgImage.clientHeight}px`;
    },
    watch: {
        scrollY(y) {
            let translateY = Math.max(this.minTranslateY, y);
            let zIndex = 0;
            let scale = 1;
            let blur = 0;
            this.$refs.layer.style['transform'] = `translate(0, ${translateY}px)`;
            this.$refs.layer.style['webkitTransform'] = `translate(0, ${translateY}px)`;

            const percent = Math.abs(y / this.imageHeight);
            if (y > 0) {
                scale = 1 + percent;
                zIndex = 10;
            } else {
                blur = Math.min(20 * percent, 20);
            }
            if (y < this.minTranslateY) {
                zIndex = 10;
                this.$refs.bgImage.style.paddingTop = `${RESERVE_HEIGHT}px`;
            } else {
                this.$refs.bgImage.style.paddingTop = '70%';
            }
            this.$refs.filter.style['backdrop-filter'] = `blur(${blur}px)`;
            this.$refs.filter.style['-webkitBackdrop-filter'] = `blur(${blur}px)`;
            this.$refs.bgImage.style.zIndex = zIndex;
            this.$refs.bgImage.style.transform = `scale(${scale})`;
        }
    }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/sass/util/variables";
@import "../../assets/sass/util/mixins";

.music-list {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: $color-background;
    .back {
        position: absolute;
        top: 0;
        left: 6px;
        z-index: 50;
        .icon-back {
            display: block;
            padding: 10px;
            font-size: $font-size-large-x;
            color: $color-theme;
        }
    }
    .title {
        position: absolute;
        top: 0;
        left: 10%;
        z-index: 40;
        width: 80%;
        text-align: center;
        line-height: 40px;
        font-size: $font-size-large;
        color: $color-text;
        @include ellipsis;
    }
    .bg-image {
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 70%;
        transform-origin: top;
        @include background-size(cover);
        .play-wrapper {
            position: absolute;
            bottom: 20px;
            z-index: 50;
            width: 100%;
            .play {
                width: 135px;
                padding: 7px 0;
                margin: 0 auto;
                text-align: center;
                border: 1px solid $color-theme;
                color: $color-theme;
                font-size: 0;
                @include border-radius(100px);
                @include box-sizing(border-box);
                .icon-play {
                    display: inline-block;
                    vertical-align: middle;
                    margin-right: 6px;
                    font-size: $font-size-medium-x;
                }
                .text {
                    display: inline-block;
                    vertical-align: middle;
                    font-size: $font-size-small;
                }
            }
        }
        .filter {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(7, 17, 27, 0.4);
        }
    }
    .bg-layer {
        position: relative;
        height: 100%;
        background: $color-background;
    }
    .list {
        position: fixed;
        top: 0;
        bottom: 0;
        width: 100%;
        background: $color-background;
        /*overflow: hidden;*/
        .song-list-wrapper {
            padding: 20px 30px;
        }
        .loading-container {
            position: absolute;
            width: 100%;
            top: 50%;
            @include transform(translateY(-50%));
        }
    }
}
</style>
