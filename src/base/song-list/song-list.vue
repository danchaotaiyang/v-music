<template>
<div class="song-list">
    <ul>
        <li v-for="song in songs" class="item">
            <div class="content">
                <h2 class="name">{{song.name}}</h2>
                <div class="desc">{{getDesc(song)}}</div>
            </div>
        </li>
    </ul>
</div>
</template>

<script>
export default {
    props: {
        songs: {
            type: Array,
            default: []
        }
    },
    methods: {
        getDesc(song) {
            return `${song.singer} . ${song.album}`;
        }
    }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/sass/util/variables";
@import "../../assets/sass/util/mixins";

.song-list {
    .item {
        display: flex;
        align-items: center;
        height: 64px;
        font-size: $font-size-medium;
        @include box-sizing(border-box);
        .rank {
            flex: 0 0 25px;
            width: 25px;
            margin-right: 30px;
            text-align: center;
            .icon {
                display: inline-block;
                width: 25px;
                height: 24px;
                background-size: 25px 24px;
                &.icon0 {
                    @include background-image-png('first');
                }
                &.icon1 {
                    @include background-image-png('second');
                }
                &.icon2 {
                    @include background-image-png('third');
                }
            }
            .text {
                color: $color-theme;
                font-size: $font-size-large;
            }
        }
        .content {
            flex: 1;
            line-height: 20px;
            overflow: hidden;
            .name {
                color: $color-text;
                @include ellipsis;
            }
            .desc {
                margin-top: 4px;
                color: $color-text-d;
                @include ellipsis;
            }
        }
    }
}
</style>
