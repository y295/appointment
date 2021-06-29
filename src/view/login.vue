<template>
  <div class="login_wrap">
    <div class="login_page">
      <div class="logining">
        <van-loading size="24px" vertical>登录中...</van-loading>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      code: "",
    };
  },
  methods: {
    getRequestString() {
      // 获取?后的字符串
      let str = window.location.search.substr(1);
      let strs = str.split("&");
      let params = {};
      for (let i = 0; i < strs.length; i++) {
        let item = strs[i].split("=");
        let key = item[0];
        let value = item[1];
        params[key] = value;
      }
      // console.log(params)
      return params;
    },
    async login() {
      const res = await this.$http.post(
        "/token?schema=1&source=weixin&code=" + this.code
      );
      if (res.data.success) {
        sessionStorage.setItem("token", res.data.data.access_token);
        // console.log(localStorage.getItem("token"));
        this.$router.push("/home");
      }
    },
  },
  created() {
    if (this.getRequestString().code) {
      this.code = this.getRequestString().code;
      this.login();
    }
  },
};
</script>

<style scoped>
.logining {
  padding-top: 0.5rem;
}
</style>
