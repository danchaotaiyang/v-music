<template>
<div class="player" v-show="playList.length > 0">
    <transition name="normal" @enter="enter" @after-enter="afterEnter" @leave="leave" @after-leave="afterLeave">
        <div class="normal-player" v-show="fullScreen">
            <div class="background">
                <img alt="" width="100%" height="100%" :src="currentSong.image">
            </div>
            <div class="top">
                <div class="back" @click="back">
                    <i class="icon-back"></i>
                </div>
                <h1 class="title" v-html="currentSong.name"></h1>
                <h2 class="subtitle" v-html="currentSong.singer"></h2>
            </div>
            <div class="middle">
                <div class="middle-l">
                    <div class="cd-wrapper" ref="cdWrapper">
                        <div class="cd" :class="cdCls"><img alt="" class="image" :src="currentSong.image"></div>
                    </div>
                </div>
            </div>
            <div class="bottom">
                <div class="progress-wrapper">
                    <span class="time time-l">{{format(currentTime)}}</span>
                    <div class="progress-bar-wrapper">
                        <progress-bar :percent="percent" @percentChange="onProgressBarChange"></progress-bar>
                    </div>
                    <span class="time time-r">{{format(currentSong.duration)}}</span>
                </div>
                <div class="operators">
                    <div class="icon i-left" @click="changeMode"><i :class="iconMode"></i></div>
                    <div class="icon i-left" :class="disableCls" @click="prev"><i class="icon-prev"></i></div>
                    <div class="icon i-center" @click="togglePlaying"><i :class="normalPlayIcon"></i></div>
                    <div class="icon i-right" :class="disableCls" @click="next"><i class="icon-next"></i></div>
                    <div class="icon i-right"><i class="icon icon-not-favorite"></i></div>
                </div>
            </div>
        </div>
    </transition>
    <transition name="mini">
        <div class="mini-player" v-show="!fullScreen" @click="open">
            <div class="icon"><img alt="" width="=40" height="40" :src="currentSong.image" :class="cdCls"></div>
            <div class="text">
                <h2 class="name" v-html="currentSong.name"></h2>
                <p class="desc" v-html="currentSong.singer"></p>
            </div>
            <div class="control">
                <progress-circle radius="32" :percent="percent">
                    <i class="icon-mini" :class="miniPlayIcon" @click.stop.prevent="togglePlaying"></i>
                </progress-circle>
            </div>
            <div class="control"><i class="icon-playlist"></i></div>
        </div>
    </transition>
    <audio ref="audio" :src="currentSong.url" @canplay="ready" @error="error" @timeupdate="updateTime"></audio>
</div>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex';
import ProgressBar from '@/base/progress-bar/progress-bar';
import ProgressCircle from '@/base/progress-circle/progress-circle';
import {playMode} from '@/assets/js/config';
import {prefixStyle} from '@/assets/js/dom';
import animations from 'create-keyframe-animation';

const transform = prefixStyle('transform');

export default {
    data() {
        return {
            currentTime: 0
        };
    },
    components: {ProgressBar, ProgressCircle},
    computed: {
        ...mapGetters([
            'fullScreen', 'playList', 'currentIndex', 'currentSong', 'playing', 'songReady', 'mode'
        ]),
        normalPlayIcon() {
            return this.playing ? 'icon-pause' : 'icon-play';
        },
        miniPlayIcon() {
            return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
        },
        cdCls() {
            return this.playing ? 'play' : 'pause';
        },
        disableCls() {
            return this.songReady ? '' : 'disable'
        },
        iconMode() {
            return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random';
        },
        percent() {
            return this.currentTime / this.currentSong.duration;
        }
    },
    methods: {
        ...mapMutations({
            setFullScreen: 'SET_FULL_SCREEN',
            setPlayingState: 'SET_PLAYING_STATE',
            setCurrentIndex: 'SET_CURRENT_INDEX',
            setSongReady: 'SET_SONG_READY',
            setPlayMode: 'SET_PLAY_MODE'
        }),
        ...mapActions([
            'selectPlay'
        ]),
        _getPosAndScale() {
            const targetWidth = 40;
            const paddingLeft = 40;
            const paddingBottom = 30;
            const paddingTop = 80;
            const width = window.innerWidth * 0.8;
            const scale = targetWidth / width;
            const x = -(window.innerWidth / 2 - paddingLeft);
            const y = window.innerHeight - paddingTop - (width / 2) - paddingBottom;
            return {x, y, scale};
        },
        back() {
            this.setFullScreen(false);
        },
        open() {
            this.setFullScreen(true);
        },
        enter(el, done) {
            const {x, y, scale} = this._getPosAndScale();
            let animation = {
                0: {
                    transform: `translate(${x}px, ${y}px) scale(${scale})`
                },
                60: {
                    transform: `translate(0, 0) scale(1.1)`
                },
                100: {
                    transform: `translate(0, 0) scale(1)`
                }
            };
            animations.registerAnimation({
                name: 'move',
                animation,
                presets: {
                    duration: 400,
                    easing: 'linear'
                }
            });
            animations.runAnimation(this.$refs.cdWrapper, 'move', done);
        },
        afterEnter() {
            animations.unregisterAnimation('move');
            this.$refs.cdWrapper.style.animation = '';
        },
        leave(el, done) {
            this.$refs.cdWrapper.style.transition = 'all 0.4s';
            const {x, y, scale} = this._getPosAndScale();
            this.$refs.cdWrapper.style[transform] = `translate(${x}px, ${y}px) scale(${scale})`;
            this.$refs.cdWrapper.addEventListener('transitionend', done);
        },
        afterLeave() {
            this.$refs.cdWrapper.style.transition = '';
            this.$refs.cdWrapper.style[transform] = '';
        },
        togglePlaying() {
            this.setPlayingState(!this.playing);
        },
        prev() {
            if (!this.songReady) {
                return;
            }
            let index = this.currentIndex - 1;
            if (index === -1) {
                index = this.playList.length - 1;
            }
            if (!this.playing) {
                this.togglePlaying();
            }
            let song = this.playList[index];
            this.selectItem(song, index);
            this.setSongReady(false);
        },
        next() {
            if (!this.songReady) {
                return;
            }
            let index = this.currentIndex + 1;
            if (index === this.playList.length) {
                index = 0;
            }
            if (!this.playing) {
                this.togglePlaying();
            }
            let song = this.playList[index];
            this.selectItem(song, index);
            this.setSongReady(false);
        },
        selectItem(song, index) {
            this.selectPlay({
                list: this.playList,
                index
            });
        },
        ready() {
            this.setSongReady(true);
        },
        error() {
            this.setSongReady(true);
        },
        changeMode() {
            const mode = (this.mode + 1) % 3;
            this.setPlayMode(mode);
        },
        updateTime(e) {
            this.currentTime = e.target.currentTime;
        },
        format(interval) {
            interval = interval | 0;
            const minute = interval / 60 | 0;
            const second = this._pad(interval % 60);
            return `${minute}:${second}`;
        },
        _pad(num, n = 2) {
            let len = num.toString().length;
            while (len < n) {
                num = '0' + num;
                len++;
            }
            return num;
        },
        onProgressBarChange(percent) {
            this.$refs.audio.currentTime = this.currentSong.duration * percent;
            if (!this.playing) {
                this.togglePlaying();
            }
        }
    },
    watch: {
        currentSong() {
            this.$nextTick(() => {
                this.$refs.audio.play();
            });
        },
        playing(status) {
            this.$nextTick(() => {
                const audio = this.$refs.audio;
                status ? audio.play() : audio.pause();
            });
        }
    }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/sass/util/variables";
@import "../../assets/sass/util/mixins";

.player {
    .normal-player {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 150;
        background: $color-background;
        .background {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            opacity: 0.6;
            filter: blur(20px);
        }
        .top {
            position: relative;
            margin-bottom: 25px;
            .back {
                position: absolute;
                top: 0;
                left: 6px;
                z-index: 50;
                .icon-back {
                    display: block;
                    padding: 9px;
                    font-size: $font-size-large-x;
                    color: $color-theme;
                    @include transform(rotate(-90deg));
                }
            }
            .title {
                width: 70%;
                margin: 0 auto;
                line-height: 40px;
                text-align: center;
                font-size: $font-size-large;
                color: $color-text;
                @include ellipsis;
            }
            .subtitle {
                line-height: 20px;
                text-align: center;
                font-size: $font-size-medium;
                color: $color-text;
            }
        }
        .middle {
            position: fixed;
            width: 100%;
            top: 80px;
            bottom: 170px;
            white-space: nowrap;
            font-size: 0;
            .middle-l {
                display: inline-block;
                vertical-align: top;
                position: relative;
                width: 100%;
                height: 0;
                padding-top: 80%;
                .cd-wrapper {
                    position: absolute;
                    left: 10%;
                    top: 0;
                    width: 80%;
                    height: 100%;
                    .cd {
                        width: 100%;
                        height: 100%;
                        border: 10px solid rgba(255, 255, 255, 0.1);
                        @include border-radius(50%);
                        @include box-sizing(border-box);
                        &.play {
                            animation: rotate 20s linear infinite;
                        }
                        &.pause {
                            animation-play-state: paused;
                        }
                        .image {
                            position: absolute;
                            left: 0;
                            top: 0;
                            width: 100%;
                            height: 100%;
                            @include border-radius(50%);
                        }
                    }
                }
                .playing-lyric-wrapper {
                    width: 80%;
                    margin: 30px auto 0 auto;
                    overflow: hidden;
                    text-align: center;
                    .playing-lyric {
                        height: 20px;
                        line-height: 20px;
                        font-size: $font-size-medium;
                        color: $color-text-l;
                    }
                }
            }
            .middle-r {
                display: inline-block;
                vertical-align: top;
                width: 100%;
                height: 100%;
                overflow: hidden;
                .lyric-wrapper {
                    width: 80%;
                    margin: 0 auto;
                    overflow: hidden;
                    text-align: center;
                    .text {
                        line-height: 32px;
                        color: $color-text-l;
                        font-size: $font-size-medium;
                        &.current {
                            color: $color-text;
                        }
                    }
                }
            }
        }
        .bottom {
            position: absolute;
            bottom: 50px;
            width: 100%;
            .dot-wrapper {
                text-align: center;
                font-size: 0;
                .dot {
                    display: inline-block;
                    vertical-align: middle;
                    margin: 0 4px;
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: $color-text-l;
                    &.active {
                        width: 20px;
                        border-radius: 5px;
                        background: $color-text-ll;
                    }
                }
            }
            .progress-wrapper {
                display: flex;
                align-items: center;
                width: 80%;
                margin: 0px auto;
                padding: 10px 0;
                .time {
                    color: $color-text;
                    font-size: $font-size-small;
                    flex: 0 0 30px;
                    line-height: 30px;
                    width: 30px;
                    &.time-l {
                        text-align: left;
                    }
                    &.time-r {
                        text-align: right;
                    }
                }
                .progress-bar-wrapper {
                    flex: 1;
                }
            }
            .operators {
                display: flex;
                align-items: center;
                .icon {
                    flex: 1;
                    color: $color-theme;
                    &.disable {
                        color: $color-theme-d;
                    }
                    i {
                        font-size: 30px;
                    }
                }
                .i-left {
                    text-align: right;
                }
                .i-center {
                    padding: 0 20px;
                    text-align: center;
                    i {
                        font-size: 40px;
                    }
                }
                .i-right {
                    text-align: left;
                }
                .icon-favorite {
                    color: $color-sub-theme;
                }
            }
        }
        &.normal-enter-active, &.normal-leave-active {
            @include transition(all 0.4s);
            .top, .bottom {
                @include transition(all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32));
            }
        }
        &.normal-enter, &.normal-leave-to {
            opacity: 0;
            .top {
                @include transform(translate3d(0, -100px, 0));
            }
            .bottom {
                @include transform(translate3d(0, 100px, 0));
            }
        }
    }
    .mini-player {
        display: flex;
        align-items: center;
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 180;
        width: 100%;
        height: 60px;
        background: $color-highlight-background;
        &.mini-enter-active, &.mini-leave-active {
            @include transition(all 0.4s);
        }
        &.mini-enter, &.mini-leave-to {
            opacity: 0;
        }
        .icon {
            flex: 0 0 40px;
            width: 40px;
            padding: 0 10px 0 20px;
            img {
                @include border-radius(50%);
                &.play {
                    @include animation(rotate 10s linear infinite);
                }

                &.pause {
                    animation-play-state: paused;
                }
            }
        }
        .text {
            display: flex;
            flex-direction: column;
            justify-content: center;
            flex: 1;
            line-height: 20px;
            overflow: hidden;
            .name {
                margin-bottom: 2px;
                font-size: $font-size-medium;
                color: $color-text;
                @include ellipsis;
            }
            .desc {
                font-size: $font-size-small;
                color: $color-text-d;
                @include ellipsis;
            }
        }
        .control {
            flex: 0 0 30px;
            width: 30px;
            padding: 0 10px;
            .icon-play-mini, .icon-pause-mini, .icon-playlist {
                font-size: 30px;
                color: $color-theme-d;
            }
            .icon-mini {
                font-size: 32px;
                position: absolute;
                left: 0;
                top: 0;
            }
        }
    }
    @include keyframes(rotate) {
        0% {
            @include transform(rotate(0));
        }
        100% {
            @include transform(rotate(360deg));
        }
    }
;
}
</style>
