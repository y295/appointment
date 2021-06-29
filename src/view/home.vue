<template>
  <div class="home_wrap">
    <div class="home_page">
      <div class="tabbar">
        <van-tabbar v-model="active" placeholder route>
          <van-tabbar-item icon="envelop-o" to="/home/businesses"
            >预约挂号</van-tabbar-item
          >
          <van-tabbar-item icon="records" to="/home/records">挂号记录</van-tabbar-item>
          <van-tabbar-item icon="user-o" to="/home/myAddresses">就诊人</van-tabbar-item>
        </van-tabbar>
      </div>
      <div class="view_card">
        <router-view :openid="me.username"> </router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      me: {},
    };
  },
  methods: {
    async getUserInfo() {
      const res = await this.$http.get("/me?");
      this.me = res.data.data;
      //   sessionStorage.setItem("me", JSON.stringify(res.data.data));
    },
  },
  created() {
    this.getUserInfo();
  },
};
</script>

<style scoped>
.home_wrap,
.home_page {
  height: inherit;
  display: flex;
  flex-direction: column;
}
.tabbar {
  height: auto;
}
/deep/.van-tabbar--fixed {
  margin-top: 0;
  position: fixed;
  top: 0;
  left: 0;
  /* z-index: 2; */
}
/deep/.van-tabbar {
  padding-bottom: 0;
}
.view_card {
  flex-grow: 1;
}
</style>
