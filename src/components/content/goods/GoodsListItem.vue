<template>
  <div class="goods-item" @click="itemClick">
    <img v-lazy="showImage" alt="" @load="imageLoad" />
    <div class="goods-info">
      <p>{{ goodItem.title }}</p>
      <span class="price">{{ goodItem.price }}</span>
      <span class="collect">{{ goodItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  data() {
    return {};
  },
  components: {},
  methods: {
    imageLoad() {
      this.$bus.$emit("itemImageLoad");
    },
    itemClick() {
      this.goodItem.iid && this.$router.push("/detail/" + this.goodItem.iid);
    },
  },
  computed: {
    showImage() {
      return this.goodItem.img || this.goodItem.image || this.goodItem.show.img;
    },
  },
  props: {
    goodItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped>
.goods-item {
  padding-bottom: 40px;
  position: relative;
  width: 48%;
}

.goods-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  font-size: 0.12rem;
  position: absolute;
  bottom: 0.05rem;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0.03rem;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 0.2rem;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -0.15rem;
  top: -1px;
  width: 0.14rem;
  height: 0.14rem;
  background: url("~assets/img/common/collect.svg") 0 0/0.14rem 0.14rem;
}
</style>