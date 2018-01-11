<template>
<div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
        <slot></slot>
    </div>
    <div class="dots">
        <span class="dot" v-for="(item, index) in dots" :class="{'active': currentIndex === index}"></span>
    </div>
</div>
</template>

<script>
import BScroll from 'better-scroll';
import {addClass} from '@/assets/js/dom';

export default {
    name: 'slider',
    props: {
        loop: {
            type: Boolean,
            default: true
        },
        autoPlay: {
            type: Boolean,
            default: true
        },
        interval: {
            type: Number,
            default: 4000
        }
    },
    data() {
        return {
            dots: [],
            currentIndex: 0
        };
    },
    mounted() {
        setTimeout(() => {
            this._setSliderWidth(true);
            this._initSlider();
            this._initDots();
            if (this.autoPlay) {
                this._autoPlay();
            }
        }, 20);
        window.addEventListener('resize', () => {
            if (!this.slider) return;
            this._setSliderWidth();
            this.slider.refresh();
        });
    },
    methods: {
        _setSliderWidth(isInit) {
            this.children = this.$refs.sliderGroup.children;
            let width = 0;
            let sliderWidth = this.$refs.slider.clientWidth;
            for (let i = 0; i < this.children.length; i++) {
                let child = this.children[i];
                addClass(child, 'slider-item');
                child.style.width = sliderWidth + 'px';
                width += sliderWidth;
            }
            if (this.loop && isInit) {
                width += 2 * sliderWidth;
            }
            this.$refs.sliderGroup.style.width = width + 'px';
        },
        _initSlider() {
            this.slider = new BScroll(this.$refs.slider, {
                scrollX: true,
                scrollY: false,
                momentum: false,
                snap: {
                    loop: true,
                    threshold: 0.3,
                    speed: 400
                }
            });
            if (this.autoPlay) {
                clearInterval(this.timer);
            }
            this.slider.on('scrollEnd', () => {
                this.currentIndex = this.slider.getCurrentPage().pageX;
            });
        },
        _initDots() {
            let length = this.children.length;
            if (this.loop) {
                length -= 2;
            }
            this.dots = new Array(length);
        },
        _autoPlay() {
            this.timer = setInterval(() => {
                this.slider.next(400);
            }, this.interval);
        }
    }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/sass/util/variables";
@import "../../assets/sass/util/mixins";

.slider {
    position: relative;
    min-height: 1px;
    .slider-group {
        position: relative;
        overflow: hidden;
        white-space: nowrap;
        .slider-item {
            float: left;
            overflow: hidden;
            text-align: center;
            @include box-sizing(border-box);
            a {
                display: block;
                width: 100%;
                overflow: hidden;
                text-decoration: none;
                img {
                    display: block;
                    width: 100%;
                }
            }
        }
    }
    .dots {
        position: absolute;
        right: 0;
        left: 0;
        bottom: 12px;
        text-align: center;
        font-size: 0;
        .dot {
            display: inline-block;
            margin: 0 4px;
            width: 8px;
            height: 8px;
            background: $color-text-l;
            @include border-radius(50%);
            &.active {
                width: 20px;
                background: $color-text-ll;
                @include border-radius(5px);
            }
        }
    }
}
</style>
