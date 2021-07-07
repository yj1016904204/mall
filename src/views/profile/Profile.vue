<template>
  <div>
    <nav-bar class="profile-nav"><div slot="center">我的档案</div></nav-bar>

    <ProfileInfo @gotoLogin="gotoLogin" :userinfo="userinfo" />
    <AccountInfo />
    <NormalListView :list-data="orderList" />
    <NormalListView :list-data="serviceList" />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

import ProfileInfo from "./childComs/ProfileInfo.vue";
import AccountInfo from "./childComs/AccountInfo.vue";
import NormalListView from "./childComs/NormalListView.vue";

import { getUserInfo } from "network/login";

export default {
  name: "Profile",
  data() {
    return {
      orderList: [
        { icon: "message.svg", info: "我的消息" },
        { icon: "pointer.svg", info: "积分商城" },
        { icon: "vip.svg", info: "会员卡" },
      ],
      serviceList: [
        { icon: "cart.svg", info: "我的购物车" },
        { icon: "shopping.svg", info: "下载购物APP" },
      ],
      userinfo: {},
    };
  },
  components: {
    NavBar,
    ProfileInfo,
    AccountInfo,
    NormalListView,
  },
  methods: {
    gotoLogin() {
      let returnUrl = this.$route.fullPath;
      this.$router.push("/login?returnUrl=" + returnUrl);
    },
  },
  created() {
    let token = localStorage.getItem("token");
    if (token) {
      getUserInfo(token).then((res) => {
        if (res.code === 0) {
          this.userinfo = res.userinfo;
        } else {
          Toast.fail(res.msg);
        }
      });
    }
  },
};
</script>

<style scoped>
.profile-nav {
  background: var(--color-tint);
  color: #fff;
  font-size: 0.16rem;

  z-index: 9;
}
</style>