<template>
  <div>
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ this.$store.getters.getLength }})</div>
    </nav-bar>
    <CartBottomBar />
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
};
</script>

<style scoped>
.nav-bar {
  background: var(--color-tint);
  color: #fff;
  font-size: 0.16rem;
}
</style>