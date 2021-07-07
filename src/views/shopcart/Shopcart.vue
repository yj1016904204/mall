<template>
  <div>
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ this.$store.getters.getLength }})</div>
    </nav-bar>
    <CartBottomBar @gotoBuys="gotoBuys" />
    <CartList />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

import CartList from "./childComs/CartList.vue";
import CartBottomBar from "./childComs/CartBottomBar.vue";

import axios from "axios";

import Vue from "vue";
import { Dialog } from "vant";

Vue.use(Dialog);

export default {
  name: "Shopcart",
  data() {
    return {};
  },
  components: {
    NavBar,
    CartList,
    CartBottomBar,
  },
  methods: {
    gotoBuys(sum) {
      let WIDtotal_fee = (sum / 100).toFixed(2);
      let WIDsubject = "购买mall商场内的商品";
      let WIDout_trade_no = "10283293810238193111";
      let token = localStorage.getItem("token");
      if (token) {
        window.open(
          "https://m.28sjw.com/alipay_wap/alipayapi.php?WIDtotal_fee=" +
            WIDtotal_fee +
            "&WIDsubject=" +
            WIDsubject +
            "WIDout_trade_no=" +
            WIDout_trade_no
        );
        Dialog.confirm({
          title: "支付成功？",
          message: "如果您已经支付成功，请点击“确定”。",
        })
          .then(() => {
            axios
              .get(
                "https://m.28sjw.com/order/orderPayStatusCheck.php?_oid=" +
                  WIDout_trade_no
              )
              .then((res) => {
                if (res.data.status === 0) {
                  this.$toast.show("支付失败");
                } else {
                  this.$toast.show("支付成功");
                }
              });
          })
          .catch(() => {});
      } else {
        this.$toast.show("未登录，前去登录");
        let returnUrl = this.$route.fullPath;
        setTimeout(() => {
          this.$router.push("/login?returnUrl=" + returnUrl);
        }, 1500);
      }
    },
  },
};
</script>

<style scoped>
.nav-bar {
  background: var(--color-tint);
  color: #fff;
  font-size: 0.16rem;
}
</style>