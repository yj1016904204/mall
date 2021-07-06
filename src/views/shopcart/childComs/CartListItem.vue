<template>
  <div id="shop-item">
    <div class="item-selector">
      <CheckButton
        @checkBtnClick="checkedChange"
        v-model="itemInfo.checked"
      ></CheckButton>
    </div>
    <div class="item-img">
      <img :src="itemInfo.image" alt="商品图片" />
    </div>
    <div class="item-info">
      <div class="item-title">{{ itemInfo.title }}</div>
      <div class="item-desc">{{ itemInfo.desc }}</div>
      <div class="info-bottom">
        <div class="item-price left">¥{{ itemInfo.price }}</div>
        <div class="item-count right">x{{ itemInfo.count }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from "./CheckButton.vue";
export default {
  name: "CartListItem",
  props: {
    itemInfo: Object,
    default() {
      return {};
    },
  },
  components: {
    CheckButton,
  },
  methods: {
    checkedChange() {
      this.itemInfo.checked = !this.itemInfo.checked;
    },
  },
};
</script>

<style scoped>
#shop-item {
  width: 100%;
  display: flex;
  font-size: 0;
  padding: 0.05rem;
  border-bottom: 1px solid #ccc;
}

.item-selector {
  width: 0.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.item-title,
.item-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.item-img {
  padding: 0.05rem;
  /*border: 1px solid #ccc;*/
}

.item-img img {
  width: 0.75rem;
  height: 1rem;
  display: block;
  border-radius: 5px;
}

.item-info {
  font-size: 0.17rem;
  color: #333;
  padding: 0.05rem 10px;
  position: relative;
  overflow: hidden;
}

.item-info .item-desc {
  font-size: 0.14rem;
  color: #666;
  margin-top: 0.15rem;
}

.info-bottom {
  margin-top: 0.1rem;
  position: absolute;
  bottom: 0.1rem;
  left: 0.1rem;
  right: 0.1rem;
}

.info-bottom .item-price {
  color: orangered;
}
</style>