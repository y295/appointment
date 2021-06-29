import axios from "axios"

const http = axios.create({

    baseURL: 'http://192.168.0.122/api/v1'
})

http.interceptors.request.use(config => {
    const _token = sessionStorage.getItem("token");
    if (_token) {
        config.headers.Authorization = 'Bearer ' + _token
    }

    return config
}, error => {
    Promise.reject(error);
})

http.interceptors.response.use((response) => {
    // Do something with response data
    return response;
}, (error) => {
    if (error.response.status == 401) {
        sessionStorage.removeItem("token")
        window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx508a866c53a362a5&redirect_uri=http://192.168.0.178:8082/login&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
    }
    return Promise.reject(error);
});

export default http