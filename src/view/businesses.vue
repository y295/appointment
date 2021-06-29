<template>
  <div class="businesses_wrap">
    <div class="businesses_page">
      <div class="businesses_page_title">
        <span>请选择医生</span>
      </div>
      <div class="businesses_card">
        <div class="businessesList">
          <van-list>
            <van-card
              v-for="(item, index) in businesses"
              :key="index"
              :price="item.price"
              :desc="item.businessDesc"
              :title="item.businessName"
              thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
              @click="goappointDates(item)"
            >
              <template #tags>
                <span>{{ item.groupName }}</span>
              </template>
            </van-card>
          </van-list>
        </div>
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
      businesses: [],
      show: true,
    };
  },
  methods: {
    async getbusinesses() {
      //   const _token = localStorage.getItem("token");
      const res = await this.$http.get("locations/1/canbeappointed/businesses");
      this.businesses = res.data.data;
      if (res.data.success) {
        this.show = false;
      }
    },
    goappointDates(item) {
      sessionStorage.setItem("appointBusiness", JSON.stringify(item));
      this.$router.push(`/home/appointDates/${item.businessCode}`);
    },
  },

  mounted() {},
  created() {
    this.getbusinesses();
  },
};
</script>

<style scoped>
.businesses_wrap,
.businesses_page {
  height: 100%;
}
.businesses_page {
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
}
.businesses_page_title {
  height: auto;
  margin: 0;
  background-color: #f7f8fa;
}
.businesses_wrap .businesses_page .businesses_page_title span {
  color: rgba(69, 90, 100, 0.6);
  background-color: #f7f8fa;
  display: inline-block;
  padding: 0.1rem 0.74rem 0.1rem;
  font-weight: normal;
  font-size: 14px;
  clear: both;
}
.businesses_card {
  background: #ffffff;
  flex-grow: 1;
}
.businesses_card ul {
  border-bottom: 1px solid #ddd;
  padding: 0.5rem;
}
.businesses_card ul li {
  font-size: 0.45rem;
}
.van-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
