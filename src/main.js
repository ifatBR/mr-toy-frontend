import Vue from 'vue';
import app from './app.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import main from './assets/style/main.css';
import './assets/style/main.scss'
import * as VueGoogleMaps from 'vue2-google-maps';
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);
import {i18nService} from './services/i18n.service.js'

Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyB9oCnA8wIbOktG_dJ68_mtitzR8xqc-Lc',
        libraries: 'places',
    },
});

Vue.use(ElementUI);
Vue.config.productionTip = false;

const i18n= i18nService.getI18n();

new Vue({
    router,
    store,
    i18n,
    render: (h) => h(app),
}).$mount('#app');

