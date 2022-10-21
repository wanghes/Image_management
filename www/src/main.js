import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import moment from 'moment'
import store from './store'
import * as filters from './filters';

import '@/styles/element_theme/theme/index.css';
import '@/styles/element-variables.scss'
import '@/styles/index.scss'
import './icons' 
import './permission'
import './utils/error-log'

import 'vite-plugin-svg-icons/register'
import svgIcon from './components/SvgIcon/index.vue'





Vue.prototype.$moment = moment;
Vue.component('svg-icon', svgIcon)
Vue.use(Element, {
    size: 'medium'
});


Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
});

Vue.config.productionTip = false


new Vue({
    el: '#app',
    router,
    store,
    components: {
        App
    },
    template: '<App/>'
});
