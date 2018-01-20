<template>
<div class="recommend">
    <scroll ref="scroll" class="recommend-content" :data="discList">
        <div>
            <div v-if="recommends.length" class="slider-wrapper" ref="sliderWrapper">
                <slider>
                    <div v-for="item in recommends">
                        <a :href="item.linkUrl"><img @load="loadImage" :src="item.picUrl" alt=""></a>
                    </div>
                </slider>
            </div>
            <div class="recommend-list">
                <h1 class="list-title">热门歌单推荐</h1>
                <ul>
                    <li v-for="disc in discList" class="item">
                        <div class="icon"><img v-lazy="disc.imgurl" width="60" height="60" alt=""></div>
                        <div class="text">
                            <h2 class="name" v-html="disc.creator.name"></h2>
                            <p class="desc" v-html="disc.dissname"></p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="loading-container" v-show="!discList.length">
            <loading></loading>
        </div>
    </scroll>
</div>
</template>

<script>
import Loading from '@/base/loading/loading';
import Scroll from '@/base/scroll/scroll';
import Slider from '@/base/slider/slider';
import {getRecommend, getDiscList} from '@/api/recommend';
import {ERR_OK} from '@/api/config';

export default {
    data() {
        return {
            recommends: [],
            discList: []
        };
    },
    components: {Loading, Scroll, Slider},
    methods: {
        _getRecommend() {
            getRecommend()
                .then((res) => {
                    if (res.code === ERR_OK) {
                        this.recommends = res.data.slider;
                    }
                });
        },
        _getDiscList() {
            getDiscList()
                .then((res) => {
                    if (res.code === ERR_OK) {
                        this.discList = res.data.list;
                    }
                });
        },
        loadImage() {
            if (!this.checkLoaded) {
                this.$refs.scroll.refresh();
                this.checkLoaded = true;
            }
        }
    },
    created() {
        setTimeout(() => {
            this._getRecommend();
            this._getDiscList();
        }, 2000);
    }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/sass/util/variables";
@import "../../assets/sass/util/mixins";

.recommend {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
}

.recommend-content {
    height: 100%;
    overflow: hidden;
}

.slider-wrapper {
    position: relative;
    width: 100%;
    overflow: hidden;
}

.recommend-list {
    .list-title {
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-theme;
    }
    .item {
        display: flex;
        align-items: center;
        padding: 0 20px 20px 20px;
        @include box-sizing(border-box);
        .icon {
            flex: 0 0 60px;
            width: 60px;
            padding-right: 20px;
        }
        .text {
            display: flex;
            flex-direction: column;
            justify-content: center;
            flex: 1;
            line-height: 20px;
            overflow: hidden;
            font-size: $font-size-medium;
            .name {
                margin-bottom: 10px;
                color: $color-text;
            }
            .desc {
                color: $color-text-d;
            }
        }
    }
}

.loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    @include transform(translateY(-50%));
}
</style>
