import Vue from 'vue'
import App from './App'
import router from './router'

import fastclick from 'fastclick';

fastclick.attach(document.body);

import '@/assets/sass/base/_redefine.scss';

new Vue({
    el: '#app',
    router,
    render: h => h(App)
});
