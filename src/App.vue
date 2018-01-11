<template>
<div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
        <router-view></router-view>
    </keep-alive>
</div>
</template>

<script>
import MHeader from '@/components/m-header/m-header';
import Tab from '@/components/Tab/tab';

export default {
    name: 'app',
    components: {MHeader, Tab}
}
</script>
