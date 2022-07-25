<template>
<div class="ranking">
    排行

    {{ test }}
</div>
</template>

<script>
export default {
    name: "rank",
    data() {
        return {
            test: Math.random()
        };
    }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>
