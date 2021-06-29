import Vue from 'vue'
import router from './router'
import http from "./http"
import Vant from 'vant';
import 'vant/lib/index.css';
import './assets/all.css'
import 'amfe-flexible'
import { v1 as uuidv1 } from 'uuid'
import App from './App.vue'

Vue.use(Vant);

Vue.prototype.$http = http
Vue.prototype.$uuidv1 = uuidv1

Vue.config.productionTip = false
// axios.get("https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx508a866c53a362a5&redirect_uri=http://127.0.0.1:8082/index.html/&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect ")

// window.location.href ="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx508a866c53a362a5&redirect_uri=http://127.0.0.1:8083/login/&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect"

new Vue({
    render: h => h(App),
    router
}).$mount('#app')
