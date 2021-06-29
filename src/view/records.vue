<template>
  <div class="records_wrap">
    <div class="records_page">
      <div class="records_card">
        <div v-if="!records.length" class="noRecords"><span>暂无预约</span></div>
        <div class="recordsList" v-else>
          <van-list>
            <van-cell v-for="(item, index) in records" :key="index">
              <template #title>
                <ul>
                  <li>预约医生：{{ item.btName }}</li>
                  <li>
                    预约时段：{{
                      item.appointDate + " " + item.beginTime + "~" + item.endTime
                    }}
                  </li>
                  <li>就诊人：{{ item.idName }}</li>
                  <li>金额：{{ "￥" + item.price }}</li>
                </ul>
              </template>
              <template #right-icon>
                <van-button
                  plain
                  hairline
                  type="primary"
                  size="small"
                  @click="isCancel(item.appointNo)"
                  >取消预约</van-button
                >
              </template>
            </van-cell>
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
  props: ["openid"],
  data() {
    return {
      value: "aa",
      records: [],
      show: true,
    };
  },
  watch: {
    openid() {
      this.getRecords();
    },
  },
  methods: {
    async getRecords() {
      if (this.openid) {
        const res = await this.$http.get(
          `/locations/1/appoints?status=PENDING&openid=${this.openid}&beginDate=${
            new Date().getFullYear() +
            "-" +
            (new Date().getMonth() + 1) +
            "-" +
            new Date().getDate()
          }&endDate=3000-01-01&beginTime=00%3A00&endTime=23%3A59&page=1&limit=1000`
        );
        if (res.data.success) {
          this.show = false;
          this.records = res.data.data.content;
        }
      }
    },
    isCancel(appointNo) {
      this.$dialog
        .confirm({
          title: "提醒",
          message: "将取消所选预约，是否确定？",
        })
        .then(() => {
          this.cancelAppoint(appointNo);
        });
    },
    async cancelAppoint(appointNo) {
      const res = await this.$http.delete(`locations/1/appoints/${appointNo}`);
      if (res.data.success) {
        this.records.forEach((currentValue, index, arr) => {
          if (currentValue.appointNo === appointNo) {
            arr.splice(index, 1);
            this.$notify({
              type: "success",
              message: "取消成功",
            });
          }
        });
      } else {
        this.$notify({
          type: "danger",
          message: res.data.message,
        });
      }
    },
  },
  created() {
    this.getRecords();
  },
};
</script>

<style scoped>
.records_wrap,
.records_page {
  height: 100%;
}
.records_wrap {
  position: relative;
}
.records_page {
  display: flex;
  flex-direction: column;
  /* justify-content: flex-end; */
}
.records_card {
  background: #ffffff;
  flex-grow: 1;
  height: 100%;
}
.noRecords {
  display: flex;
  height: 100%;
  color: #606060;
  font-size: 0.5rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.van-overlay {
  position: absolute;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
}
</style>
