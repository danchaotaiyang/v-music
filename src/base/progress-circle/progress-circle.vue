<template>
<div class="progress-circle">
    <svg :width="radius" :height="radius" viewBox="0 0 100 100">
        <circle r="50" cx="50" cy="50" fill="transparent" class="progress-background"></circle>
        <circle r="50" cx="50" cy="50" fill="transparent" :stroke-dasharray="dashArray" :stroke-dashoffset="dashOffset" class="progress-bar"></circle>
    </svg>
    <slot></slot>
</div>
</template>

<script>
export default {
    props: {
        radius: {
            type: Number,
            default: 100
        },
        percent: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            dashArray: Math.PI * 100
        };
    },
    computed: {
        dashOffset() {
            return (1 - this.percent) * this.dashArray;
        }
    }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/sass/util/variables";
@import "../../assets/sass/util/mixins";

.progress-circle {
    position: relative;
    circle {
        stroke-width: 8px;
        transform-origin: center;
        &.progress-background {
            stroke: $color-theme-d;
            @include transform(scale(0.9));
        }
        &.progress-bar {
            stroke: $color-theme;
            @include transform(scale(0.9) rotate(-90deg));
        }
    }
}
</style>
