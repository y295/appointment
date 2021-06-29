<template>
  <div class="appointDates_wrap">
    <div class="appointDates_page">
      <div class="date-card">
        <div class="availableDates">
          <van-grid :column-num="5">
            <van-grid-item v-for="(item, index) in availableDates" :key="index">
              <div
                :class="[
                  'availableDates_item',
                  choseDateIndex === index ? 'chose_date' : '',
                ]"
                @click="choseDate(index, item)"
              >
                <span>{{ getformatWeek(item.dayOfWeek) }}</span>
                <span>{{ getformatDate(item.date) }}</span>
                <span class="rest" v-if="item.rest">休息</span>
                <span
                  class="noAvailableQty"
                  v-else-if="!item.availableQty && !item.appointedQty"
                  >无号</span
                >
                <span v-else-if="item.availableQty">余号:{{ item.availableQty }}</span>
                <span
                  class="noAvailableQty"
                  v-else-if="!item.availableQty && item.appointedQty"
                  >约满</span
                >
              </div>
            </van-grid-item>
          </van-grid>
        </div>
      </div>
      <div class="timeSolts_card">
        <div class="timeSolts_title">
          <span>{{ appointDate.date }} 选择时间段</span>
        </div>
        <div class="timeSolt">
          <div class="noTimeSolt" v-if="!timeSolts.length">
            <span>暂无时间段</span>
          </div>
          <div class="timeSolyList" v-else>
            <van-list>
              <van-cell
                v-for="(item, index) in timeSolts"
                :key="index"
                :title="item.description"
                :value="item.availableQty ? item.availableQty + '/' + item.max : '已无号'"
                :value-class="!item.availableQty ? 'noAvailableQty' : ''"
                @click="goAppointing(item)"
              />
            </van-list>
          </div>
          <van-overlay :show="show"
            ><van-loading size="24px" vertical>加载中...</van-loading></van-overlay
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import formatWeek from "../commonJs/formatWeek.js";
export default {
  props: ["businessCode"],
  data() {
    return {
      availableDates: [],
      choseDateIndex: parseInt(sessionStorage.getItem("choseDateIndex")) || 0,
      todayOfWeek: "",
      timeSolts: [],
      show: true,
    };
  },
  computed: {
    appointDate() {
      return this.availableDates[this.choseDateIndex]
        ? this.availableDates[this.choseDateIndex]
        : "";
    },
  },
  methods: {
    async getAvailableDates() {
      const res = await this.$http.get(
        `locations/1/canbeappointed/businesses/${this.businessCode}/availableDates`
      );

      this.availableDates = res.data.data;

      this.getTimeSolts(this.appointDate);
    },

    getformatWeek(dayOfWeek) {
      return formatWeek(dayOfWeek);
    },
    getformatDate(date) {
      return new Date(date).getMonth() + 1 + "月" + new Date(date).getDate() + "日";
    },

    //选择预约日
    choseDate(index, item) {
      this.choseDateIndex = index;
      sessionStorage.setItem("choseDateIndex", index);

      this.getTimeSolts(item);
    },
    async getTimeSolts(item) {
      if (!item.rest && item.availableQty && item.availableQty != item.appointedQty) {
        this.timeSolts = [];
        this.show = true;
        const res = await this.$http.get(
          `locations/1/canbeappointed/businesses/${this.businessCode}/availableTimeRanges?&date=${item.date}`
        );
        if (res.data.success) {
          this.show = false;
          this.timeSolts = res.data.data;
        }
      } else {
        this.show = false;
        this.timeSolts = [];
      }
    },
    goAppointing(item) {
      if (item.availableQty) {
        sessionStorage.setItem("appointDate", JSON.stringify(this.appointDate));
        sessionStorage.setItem("appointTimeSolt", JSON.stringify(item));
        this.$router.push("/home/appointment");
      }
    },
  },
  created() {
    // console.log(this.businessCode);
    this.getAvailableDates();
  },
};
</script>

<style scoped>
.appointDates_wrap,
.appointDates_page {
  height: 100%;
}
.appointDates_page {
  background-color: #fff;
  display: flex;
  flex-direction: column;
}
.date-card {
  z-index: 1;
  font-size: 0.3rem;

  /* margin-top: 0.1rem; */
}
.availableDates_item {
  margin: auto;
  width: auto;
  border-radius: 15%;
  padding: 0.1rem;
}
.availableDates_item span {
  display: block;
  /* padding: 0 auto; */
  text-align: center;
}
.rest {
  color: red;
}
.chose_date {
  background-color: rgba(49, 183, 252, 0.5);
  /* color: #00b7ff; */
}
.noAvailableQty {
  color: #808080;
}
.timeSolt {
  position: relative;
}
.noTimeSolt {
  padding: 0.2rem 0.5rem;
}

.timeSolt .noAvailableQty {
  color: red;
}
.timeSolts_card {
  position: relative;
}
.timeSolts_title {
  font-size: 0.45rem;
  font-weight: bold;
  border-bottom: 1px solid #ddd;
  padding: 0.2rem 0.5rem;
}
.noTimeSolt {
  font-size: 0.5rem;
}
.van-overlay {
  position: absolute;

  padding: 2rem 0;
  /* padding-top: 2rem; */
  background-color: #ffffff;
}
</style>
