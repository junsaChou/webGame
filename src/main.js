import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
// 防止重复点击
import preventReClick from '@/utils/preventReClick'

import 'swiper/dist/css/swiper.min.css';
import 'swiper/dist/js/swiper.min.js';

import './router/auth'
import './assets/css/global.css' 
import 'element-ui/lib/theme-chalk/index.css'
import VueLazyload from 'vue-lazyload'
import ElEMENT from 'element-ui'

Vue.use(VueLazyload, {
    preLoad: 1.3,
    // error: require('@/img/case1.png'),   //请求失败后显示的图片
    // loading: require('@/img/case1.png'),   //加载的loading过渡图片
    attempt: 1     // 加载图片数量
})
import locale from  'element-ui/lib/locale/lang/en'
Vue.use(ElEMENT, { size: 'small',locale })
    // Vue.config.devtools = false;
Vue.prototype.$axios = axios
Vue.config.devtools = true;
Vue.config.productionTip = false

function formatDate(time) {
    const date = new Date(time)
    const year = date.getFullYear()
    /* 在日期格式中，月份是从0开始的，因此要加0
        * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
        * */
    const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
    // 拼接
    return year + '/' + month + '/' + day + ' ' + hours + ':' + minutes + ':' + seconds
}
Vue.filter('FormatDate', function(time) {
return formatDate(time)
})
  

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')