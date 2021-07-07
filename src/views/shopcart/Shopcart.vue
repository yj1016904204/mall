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
      let WIDtotal_fee = (sum / 10).toFixed(2);
      let WIDsubject = "购买mall商场内的商品";
      let token = localStorage.getItem("token");
      if (token) {
        /* this.$axios.interceptors.request.use((res) => {
          res.headers["access-control-allow-origin"] = "*";
          // res.headers["Access-Control-Allow-Methods"] = "GET,PUT,POST,DELETE";
          // res.headers["Access-Control-Allow-Headers"] = "Content-Type";
          return res;
        });
        this.$axios
          .get(
            "https://m.28sjw.com/alipay_wap/alipayapi.php?WIDtotal_fee=" +
              WIDtotal_fee +
              "&WIDsubject=" +
              WIDsubject
          )
          .then((res) => {
            console.log(res);
          }); */
        window.open(
          "https://m.28sjw.com/alipay_wap/alipayapi.php?WIDtotal_fee=" +
            WIDtotal_fee +
            "&WIDsubject=" +
            WIDsubject +
            "WIDout_trade_no=1010000000"
        );
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