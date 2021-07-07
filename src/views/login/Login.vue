<template>
  <div class="login">
    <img src="~assets/img/login.webp" alt="" class="login-img" />
    <van-form @submit="onSubmit">
      <van-field
        v-model="mobile"
        name="mobile"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { loginInfo } from "network/login";

import Vue from "vue";
import { Form } from "vant";
import { Field, Button } from "vant";
import { Toast } from "vant";
Vue.use(Toast);
Vue.use(Form);
Vue.use(Field);
Vue.use(Button);
export default {
  name: "Login",
  data() {
    return {
      mobile: "",
      password: "",
    };
  },
  methods: {
    onSubmit(values) {
      // console.log(values);
      loginInfo(values.mobile, values.password).then((res) => {
        if (res.code === 0) {
          Toast.success({
            message: res.msg,
            onClose: () => this.$router.replace(this.$route.query.returnUrl),
          });
        } else {
          Toast.fail(res.msg);
        }
      });
    },
  },
};
</script>

<style scoped>
.login {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background: #fff;
  background: pink;
}
.login-img {
  width: 100%;
  height: 2.5rem;
  margin-bottom: -2px;
}
</style>