<template>
  <div class="bottom-menu">
    <CheckButton
      class="select-all"
      @checkBtnClick="checkBtnClick"
      :value="isSelectAll"
    ></CheckButton>
    <span>全选</span>
    <span class="total-price">合计: ¥{{ totalPrice.toFixed(2) }}</span>
    <span class="buy-product">去计算({{ cartLength }})</span>
  </div>
</template>

<script>
import CheckButton from "./CheckButton";
import { mapGetters } from "vuex";
export default {
  name: "CartBottomBar",
  data() {
    return {};
  },
  components: {
    CheckButton,
  },
  methods: {
    checkBtnClick() {
      if (this.isSelectAll) {
        this.getCartList.forEach((item) => {
          item.checked = false;
        });
      } else {
        this.getCartList.forEach((item) => {
          item.checked = true;
        });
      }
    },
  },
  computed: {
    ...mapGetters(["getCartList"]),
    totalPrice() {
      return this.getCartList.reduce((pre, item) => {
        if (item.checked) {
          pre += item.price * item.count;
        }
        return pre;
      }, 0);
    },
    cartLength() {
      let length = 0;
      this.getCartList.forEach((item) => {
        if (item.checked) {
          length += item.count;
        }
      });
      return length;
    },
    isSelectAll() {
      if (this.getCartList.length === 0) return false;
      return this.getCartList.every((item) => item.checked);
    },
  },
};
</script>

<style scoped>
.bottom-menu {
  width: 100%;
  height: 0.44rem;
  background-color: #eee;
  position: fixed;
  bottom: 0.49rem;
  left: 0;
  box-shadow: 0 -2px 3px rgba(0, 0, 0, 0.2);
  font-size: 0.14rem;
  color: #888;
  line-height: 0.44rem;
  padding-left: 0.35rem;
  box-sizing: border-box;
}

.bottom-menu .select-all {
  position: absolute;
  line-height: 0;
  left: 0.12rem;
  top: 0.13rem;
}

.bottom-menu .total-price {
  margin-left: 0.15rem;
  font-size: 0.16rem;
  color: #666;
}

.bottom-menu .buy-product {
  background-color: orangered;
  color: #fff;
  width: 1rem;
  height: 0.44rem;
  text-align: center;
  line-height: 0.44rem;
  float: right;
}
</style>