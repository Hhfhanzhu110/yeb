import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {postRequest} from "./utils/api";
import {putRequest} from "./utils/api";
import {getRequest} from "./utils/api";
import {deleteRequest} from "./utils/api";
import store from "./store"
import {initMenu} from "./utils/menus";
import 'font-awesome/css/font-awesome.css'

Vue.use(ElementUI);
Vue.config.productionTip = false
//插件形式使用组件
Vue.prototype.postRequest = postRequest
Vue.prototype.putRequest = putRequest
Vue.prototype.getRequest = getRequest
Vue.prototype.deleteRequest = deleteRequest
router.beforeEach((to, from, next) => {
    if (window.sessionStorage.getItem("token")) {
        initMenu(router, store);
        next();
    } else {
        if (to.path == '/loginPage') {
            next();
        } else if (to.path == '/registerUser' || to.path == 'register') {
            next();
        } else {
            next("/?redirect=" + to.path);
        }
    }


})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
