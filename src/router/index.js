import Vue from 'vue'
import VueRouter from 'vue-router'
import home from "../view/home.vue"
import businesses from "../view/businesses.vue"
import records from "../view/records.vue"
import myAddresses from "../view/myAddresses.vue"
import addAndEditAddress from "../view/addAndEditAddress.vue"
import appointment from "../view/appointment.vue"
import appointDates from "../view/appointDates.vue"
import selectAddress from "../view/selectAddress.vue"
import login from "../view/login"


const routers = [
    {
        path: "/",
        redirect: '/home',

    },

    {
        path: "/home", component: home,
        children: [
            { path: "/home", component: businesses, },
            { path: "/home/businesses", component: businesses, },
            { path: "/home/appointDates/:businessCode", name: "appointDates", component: appointDates, props: true },
            { path: "/home/records", component: records, },
            { path: "/home/myAddresses", component: myAddresses, },
            { path: "/home/addAddress", component: addAndEditAddress, },
            { path: "/home/addAddressDefault", name: "addAddressDefault", component: addAndEditAddress, },
            { path: "/home/editAddress/:id", name: "editAddress", component: addAndEditAddress, props: true },
            { path: "/home/appointment", name: "appointment", component: appointment, },
            { path: "/home/selectAddress", name: "selectAddress", component: selectAddress, },
        ]

    },

    {
        path: '/login',
        component: login
    }
];


Vue.use(VueRouter)
const router = new VueRouter({
    mode: 'history',
    routes: routers
})

router.beforeEach(function (to, from, next) {
    // 未登录的情况下尝试进入非登录页
    if (to.path !== '/login') {
        let _token = sessionStorage.getItem('token')
        // 如果没有token，则让它授权
        if (!_token) {
            // 保存当前路由地址，授权后还会跳到此地址
            window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx508a866c53a362a5&redirect_uri=http://192.168.0.178:8082/login&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect"
        } else {
            next()
        }
    } else {
        next()
    }
    if (to.path === "/home" || to.path === "/home/businesses" || to.path === "/home/records" || to.path === "/home/addAddress") {
        sessionStorage.removeItem("choseDateIndex")
    }
})



export default router
