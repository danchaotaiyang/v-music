import Vue from 'vue'
import App from './App'
import store from './store';
import router from './router'
import 'babel-polyfill';

import fastclick from 'fastclick';
import VueLazyload from 'vue-lazyload';

fastclick.attach(document.body);
Vue.use(VueLazyload, {
   loading: require('@/assets/images/default.png')
});

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');

import '@/assets/sass/layout.scss';
