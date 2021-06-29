<template>
  <div class="addAddress_wrap">
    <div class="addAddress_page">
      <van-nav-bar
        :left-text="id ? '编辑就诊人信息' : ' 创建就诊人信息'"
        @click-right="goBack"
      >
        <template #right>
          <van-icon name="cross" size="20" />
        </template>
      </van-nav-bar>
      <div class="addAddress_form">
        <van-form @submit="onSubmit">
          <van-field
            v-model="model.firstName"
            name="姓名"
            label="姓名*"
            placeholder="请输入姓名"
            :rules="rules.firstName"
          />
          <van-field
            v-model="model.identity"
            name="身份证"
            label="身份证*"
            placeholder="请输入身份证"
            :rules="rules.identity"
          />

          <van-field name="radio" label="单选框">
            <template #input>
              <van-radio-group v-model="model.gender" direction="horizontal">
                <van-radio name="M">男</van-radio>
                <van-radio name="F">女</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field
            v-model="model.mobile"
            type="tel"
            label="手机号*"
            placeholder="请输入手机号"
            :rules="rules.mobile"
          />
          <div class="formButton">
            <div class="save">
              <van-button round block type="info" native-type="submit">保存</van-button>
            </div>
            <div class="delete" v-if="id">
              <van-button round block type="danger" native-type="button" @click="isDelete"
                >删除</van-button
              >
            </div>
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>

<script>
import validateIdCard from "../commonJs/validateIdCard.js";
import getBirthdayFromIdCard from "../commonJs/getBirthdayFromIdCard";
export default {
  props: ["id"],
  data() {
    return {
      model: {
        dob: "",
        firstName: "",
        gender: "M",
        idType: "ID",
        identity: "",
        mobile: "",
        sortOrder: 1,
      },
      rules: {
        firstName: [{ required: true }],
        identity: [
          { required: true },
          {
            validator: (value) => {
              //   console.log(value.length);
              if (!validateIdCard(value)) {
                return false;
              }
            },
            message: "身份证格式错误",
          },
        ],
        mobile: [{ required: true }],
      },
      //   editORAdd: JSON.parse(sessionStorage.getItem("editAddressItem")),
    };
  },

  methods: {
    async getAddressModel() {
      const res = await this.$http.get(`/myAddresss/${this.id}`);
      this.model = res.data.data;
    },
    goBack() {
      this.$router.back();
    },
    async onSubmit() {
      this.model.dob = getBirthdayFromIdCard(this.model.identity);
      if (this.$route.name === "addAddressDefault") {
        const res = await this.$http.post("/myAddresss/default", this.model);
        if (res.data.success) {
          this.$notify({
            type: "success",
            message: "添加成功",
          });
          this.$router.push("/home/appointment");
        } else {
          this.$notify({
            type: "danger",
            message: res.data.message,
          });
        }
      } else {
        const res = await this.$http.post("/myAddresss", this.model);
        if (res.data.success) {
          this.$notify({
            type: "success",
            message: this.$route.params.id ? "修改成功" : "添加成功",
          });
          this.$router.back();
        } else {
          this.$notify({
            type: "danger",
            message: res.data.message,
          });
        }
      }
    },
    async deleteAddress(AddressId) {
      const res = await this.$http.delete(`/myAddresss/${AddressId}`);
      if (res.data.success) {
        this.$notify({
          type: "success",
          message: "删除成功",
        });
        this.$router.back();
      } else {
        this.$notify({
          type: "danger",
          message: res.data.message,
        });
      }
    },
    async isDelete() {
      this.$dialog
        .confirm({
          title: "提醒",
          message: "将删除所选地址，是否确定？",
        })
        .then(() => {
          this.deleteAddress(this.model.id);
        })
        .catch(() => {
          // on cancel
        });
    },
  },
  created() {
    if (this.id) {
      this.getAddressModel();
    }
  },
};
</script>

<style scoped>
.addAddress_wrap,
.addAddress_page {
  height: 100%;
}
.addAddress_form {
  /* padding: 0.5rem 0; */
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
.formButton {
  margin: 0.5rem;
}
.save {
  margin-bottom: 0.4rem;
}
.delete {
}
</style>
