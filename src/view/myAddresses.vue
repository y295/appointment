<template>
  <div class="myAddresses_wrap">
    <div class="myAddresses_page">
      <div class="myAddresses_card">
        <div class="noAdresses" v-if="!myAddresses.length">
          <span>没有就诊人信息</span>
        </div>
        <div class="addressesList" v-else>
          <van-list>
            <van-contact-card
              type="edit"
              :name="item.firstName"
              :tel="item.mobile"
              @click="onEdit(item)"
              v-for="(item, index) in myAddresses"
              :key="index"
            />
          </van-list>
        </div>
      </div>
      <div class="placeholder"></div>
      <div class="add_myAddresses">
        <van-button type="info" @click="goAddAddress">增加就诊人</van-button>
      </div>
    </div>
    <van-overlay :show="show"
      ><van-loading size="24px" vertical>加载中...</van-loading></van-overlay
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "aa",
      myAddresses: [],
      show: true,
    };
  },
  methods: {
    goAddAddress() {
      this.$router.push("/home/addAddress");
    },
    async getmyAddresses() {
      const res = await this.$http.get("/myAddresss?includeItems=true&page=1&limit=10");
      if (res.data.success) {
        this.show = false;
        this.myAddresses = res.data.data;
      }
    },
    onEdit(item) {
      this.$router.push(`/home/editAddress/${item.id}`);
    },
  },
  mounted() {},
  created() {
    this.getmyAddresses();
  },
};
</script>

<style scoped>
.myAddresses_wrap,
.myAddresses_page {
  height: 100%;
}
.myAddresses_wrap {
  position: relative;
}
.myAddresses_page {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.myAddresses_card {
  /* z-index: 1; */
  /* display: flex; */
  flex-grow: 1;
  background: #ffffff;
  flex-grow: 1;
}
.noAdresses {
  display: flex;
  height: 100%;
  color: #606060;
  font-size: 0.5rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.van-button--square {
  height: 100%;
}

.placeholder {
  height: 1.4rem;
}
.add_myAddresses {
  /* height: 1.17333rem; */
  position: fixed;
  bottom: 0;
  left: 0;
  margin: 0;
  height: 1.4rem;
}
.add_myAddresses /deep/.van-button {
  width: 10rem;
  padding: 0;
  height: 100%;
}
.van-overlay {
  position: absolute;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
}
</style>
