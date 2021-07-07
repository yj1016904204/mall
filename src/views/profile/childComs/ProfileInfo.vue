<template>
  <div class="profile-info">
    <img
      v-if="userinfo.headIcon"
      class="avatar"
      :src="userinfo.headIcon"
      alt=""
    />
    <img v-else class="avatar" src="~assets/img/profile/avatar.svg" alt="" />
    <div class="info" v-if="userinfo.mobile">
      <div class="login">{{ userinfo.mobile }}</div>
      <div class="phone">
        <span>用户ID：{{ userinfo.userId }}</span>
      </div>
    </div>

    <div class="info" @click="gotoLogin" v-else>
      <div class="login">登录/注册</div>
      <div class="phone">
        <img src="~assets/img/profile/phone.svg" alt="" />
        <span>暂无绑定手机号</span>
      </div>
    </div>

    <div class="arrow">
      <img src="~assets/img/common/arrow-left.svg" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileInfo",
  data() {
    return {};
  },
  components: {},
  methods: {
    gotoLogin() {
      this.$emit("gotoLogin");
    },
  },
  props: {
    userinfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped>
.profile-info {
  height: 0.85rem;
  background-color: var(--color-tint);
  padding: 0.06rem 0.15rem;

  display: flex;
  color: #fff;
}

.profile-info .avatar {
  width: 0.7rem;
  height: 0.7rem;
}

.info {
  padding-left: 0.15rem;
  flex: 1;
}

.info .login {
  margin-top: 0.15rem;
  font-size: 0.17rem;
}

.phone img {
  width: 0.2rem;
  height: 0.3rem;
  vertical-align: middle;
  margin-left: -0.05rem;
}

.phone span {
  font-size: 0.13rem;
}

.arrow {
  width: 0.2rem;
  line-height: 0.85rem;
}

.arrow img {
  width: 0.2rem;
}
</style>