<template>
  <div class="selectAdress_wrap">
    <div class="selectAdress_page">
      <van-nav-bar
        left-text="选择就诊人"
        @click-right="
          () => {
            $router.back();
          }
        "
      >
        <template #right>
          <van-icon name="cross" size="20" />
        </template>
      </van-nav-bar>
      <div class="selectAdress_card">
        <div class="selectAdressList">
          <van-contact-list
            v-model="chosenAddressId"
            :list="myAddressesFormat"
            default-tag-text="默认"
            @select="onSelect"
            @add="onAdd"
            @edit="onEdit"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      myAddresses: [],
      chosenAddressId: parseInt(sessionStorage.getItem("defaultAddressId")),
    };
  },
  computed: {
    myAddressesFormat() {
      let middleArr = [];
      if (this.myAddresses.length) {
        this.myAddresses.forEach((currentValue, index) => {
          middleArr[index] = {
            id: currentValue.id,
            name: currentValue.firstName,
            tel: currentValue.mobile,
          };
        });
      }
      return middleArr;
    },
  },
  methods: {
    async getmyAddresses() {
      const res = await this.$http.get("/myAddresss?includeItems=true&page=1&limit=10");
      this.myAddresses = res.data.data;
    },
    async onSelect(address) {
      const res = await this.$http.put(`/myAddresss/${address.id}/default`);
      if (res.data.success) {
        this.$router.back();
      }
    },
    onAdd() {
      this.$router.push("/home/addAddressDefault");
    },
    onEdit(address) {
      this.$router.push(`/home/editAddress/${address.id}`);
    },
  },
  created() {
    this.getmyAddresses();
  },
};
</script>

<style scoped>
.selectAdress_wrap,
.selectAdress_page {
  height: 100%;
}
.selectAdress_page {
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
</style>
