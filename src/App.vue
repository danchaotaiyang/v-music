<template>
<div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
        <router-view></router-view>
    </keep-alive>
    <player></player>
</div>
</template>

<script>
import MHeader from '@/components/m-header/m-header';
import Tab from '@/components/Tab/tab';
import Player from '@/components/player/player';
import {getLocalhostIP} from '@/assets/js/util';

export default {
    name: 'app',
    components: {MHeader, Tab, Player},
    created() {
        getLocalhostIP();
    }
}
</script>
