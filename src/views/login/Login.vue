<template>
  <div class="login">
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
      <div>
        <van-button round block type="info" native-type="submit"
          >登 录</van-button
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
  background-image: url(~assets/img/login.png);
  background-size: cover;
}
.login-img {
  width: 100%;
  height: 2.5rem;
  margin-bottom: -2px;
}

.van-form {
  margin-top: 90%;
}

.van-cell {
  width: 80%;
  margin: 0.1rem auto;
  border-radius: 5px;
  opacity: 0.4;
}

.van-field__label {
  width: 3.2rem;
  color: white;
}

.van-button--info {
  color: #fff;
  background-color: rgba(245, 192, 211, 0.4);
  border: 1px solid rgb(139, 156, 202);
}

.van-button--round {
  width: 0.9rem;
  height: 0.9rem;
  font-size: 0.18rem;
  border-radius: 50%;
  border: none;
  background-image: linear-gradient(rgb(255, 141, 176), rgb(252, 50, 150));
  margin: 0.3rem auto;
}
</style>