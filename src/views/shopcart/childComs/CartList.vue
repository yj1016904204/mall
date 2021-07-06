<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item
        v-for="item in getCartList"
        :key="item.iid"
        :item-info="item"
      ></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import CartListItem from "./CartListItem.vue";

import { mapGetters } from "vuex";
export default {
  name: "CartList",
  data() {
    return {};
  },
  components: {
    Scroll,
    CartListItem,
  },
  methods: {},
  computed: {
    ...mapGetters(["getCartList"]),
  },
  activated() {
    this.$refs.scroll.refresh();
  },
};
</script>

<style scoped>
.content {
  position: fixed;
  overflow: hidden;
  top: 0.44rem;
  bottom: 0.93rem;
  left: 0;
  right: 0;
}
.cart-list {
  position: absolute;
  top: 0.44rem;
  left: 0;
  right: 0;
  bottom: 0.93rem;
}
</style>