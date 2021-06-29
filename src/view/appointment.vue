<template>
  <div class="appointment_wrap">
    <div class="appointment_page">
      <van-nav-bar
        left-text="确认预约"
        @click-right="
          () => {
            $router.push(`/home/appointDates/${appointBusiness.businessCode}`);
          }
        "
      >
        <template #right>
          <van-icon name="cross" size="20" />
        </template>
      </van-nav-bar>
      <div class="appointBussinessInfo">
        <van-card
          :price="appointBusiness.price"
          :desc="appointBusiness.businessDesc"
          :title="appointBusiness.businessName"
          thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
        >
          <template #tags>
            <span>{{ appointBusiness.groupName }}</span>
          </template>
        </van-card>
      </div>
      <div class="appointAdress">
        <div class="appointAdressTitle">
          <span>就诊人信息</span>
        </div>
        <div class="appointAddressInfo" @click="goSelectAddress">
          <span>{{
            appointAddress.firstName ? appointAddress.firstName : "新增就诊人"
          }}</span>
          <span>{{ appointAddress.mobile }}</span>
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="appointButton">
        <van-button round block type="primary" native-type="submit" @click="showPopup"
          >确定挂号</van-button
        >
      </div>
    </div>
    <div class="notice">
      <van-popup v-model="show" :style="{ height: '100%', width: '100%' }">
        <van-nav-bar left-text="挂号须知" @click-right="close">
          <template #right>
            <van-icon name="cross" size="20" />
          </template>
        </van-nav-bar>
        <div class="noticeContent">
          <p>1.首次使用微信公众号预约患者请输入个人详细信息</p>
          <p>2.就医当天在预约时间段凭身份证到场取号，过时自动取消</p>
          <p>
            3.预约患者排队机签到后优先叫号，多个预约患者由签到顺序决定先后就诊顺序。！
          </p>
          <p>4.预约时间不代表实际就诊时间，仅代表预约时间内签到后优先叫号。</p>
          <p>5.如遇特殊情况，请联系现场工作人员。</p>
        </div>
        <div class="noticForm">
          <van-form>
            <van-checkbox
              v-model="checked"
              shape="square"
              :rules="[{ required: true, message: '请填写用户名' }]"
            >
              我已阅读并同意以上挂号须知内容</van-checkbox
            >
            <div class="noticeButton">
              <van-button
                round
                block
                type="primary"
                native-type="submit"
                @click="appointing"
                >同意</van-button
              >
            </div>
          </van-form>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
export default {
  props: ["openid"],
  data() {
    return {
      appointBusiness: JSON.parse(sessionStorage.getItem("appointBusiness")),
      appointDate: JSON.parse(sessionStorage.getItem("appointDate")),
      appointTimeSolt: JSON.parse(sessionStorage.getItem("appointTimeSolt")),
      //   me: JSON.parse(sessionStorage.getItem("me")),
      appointAddress: {},
      barcode: "",
      show: false,
      checked: false,
    };
  },
  computed: {
    appointModel() {
      return {
        addressId: this.appointAddress.id ? this.appointAddress.id : "",
        appointDate: this.appointDate.date,
        barcode: this.barcode,
        beginTime: this.appointTimeSolt.beginTime,
        btCode: this.appointBusiness.businessCode,
        endTime: this.appointTimeSolt.endTime,
        idName: this.appointAddress.firstName,
        identity: this.appointAddress.identity ? this.appointAddress.identity : "",
        openid: this.openid,
        phone: this.appointAddress.mobile ? this.appointAddress.mobile : "",
        price: this.appointBusiness.price,
        type: "UNDEFINED",
      };
    },
  },
  methods: {
    async getdefaultAddress() {
      const res = await this.$http.get("myAddresss/default");
      this.appointAddress = res.data.data;
      sessionStorage.setItem("defaultAddressId", this.appointAddress.id);
    },
    close() {
      this.show = false;
    },
    showPopup() {
      if (this.appointAddress.firstName) {
        this.show = true;
      } else {
        this.$dialog.alert({
          title: "提醒",
          message: "请选择地址",
        });
      }
    },
    async appointing() {
      if (!this.checked) {
        this.$dialog.alert({
          title: "提醒",
          message: "对不起，不同意以上须知内容我们将无法为您提供服务",
        });
      } else {
        this.barcode = this.$uuidv1();
        const res = await this.$http.post("/locations/1/appoints", this.appointModel);
        if (res.data.success) {
          this.$notify({
            type: "success",
            message: "预约成功",
          });
          this.$router.push("/home/records");
        } else {
          this.$notify({
            type: "danger",
            message: res.data.message,
          });
        }
      }
    },
    goSelectAddress() {
      if (this.appointAddress.firstName) {
        this.$router.push("/home/selectAddress");
      } else {
        this.$router.push("/home/addAddressDefault");
      }
    },
  },
  created() {
    this.getdefaultAddress();
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
.van-nav-bar {
  background-color: #48baf3;
}
/deep/.van-nav-bar__text {
  color: #ffffff;
  font-size: 0.5rem;
}
.van-nav-bar .van-icon {
  color: #ffffff;
}
.appointBussinessInfo {
  border-bottom: 0.02667rem solid #ddd;
}
.appointAdress {
  padding: 0.1rem 0.1rem 0 0.1rem;
  font-size: 0.5rem;
  border-bottom: 0.02667rem solid #ddd;
}
.appointAdressTitle {
  padding: 0.2rem 0.5rem;
}
.appointAddressInfo {
  display: flex;
  align-items: center;
  padding: 0.2rem 0.2rem 0.2rem 0.5rem;
  font-size: 0.4rem;
}
.appointAddressInfo span {
  margin-right: 0.3rem;
  line-height: 1;
}
.van-icon {
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
  font-size: 0.5rem;
}
.appointAddressInfo:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
.appointButton,
.noticeButton {
  /* width: 100%; */
  /* padding: 0.5rem; */
  margin: 0.5rem;
}
.noticeContent {
  padding: 0.2rem;
  /* font-size: 0.4rem; */
}
.noticeContent p {
  font-size: 0.41rem;
}
.noticForm {
  padding: 0.2rem;
}
.van-checkbox {
  overflow: visible;
}
/deep/.van-checkbox__icon {
  font-size: 0.35rem;
}

/deep/.van-checkbox__label {
  font-size: 0.35rem;
}
</style>
