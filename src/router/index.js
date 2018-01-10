import Vue from 'vue';
import Router from 'vue-router';

import Recommend from '@/components/Recommend/recommend';
import Singer from '@/components/Singer/singer';
import Rank from '@/components/Rank/rank';
import Search from '@/components/Search/search';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/recommend'
        },
        {
            name: 'Recommend',
            path: '/recommend',
            component: Recommend
        },
        {
            name: 'Singer',
            path: '/singer',
            component: Singer
        },
        {
            name: 'Rank',
            path: '/rank',
            component: Rank
        },
        {
            name: 'Search',
            path: '/search',
            component: Search
        }
    ]
})
