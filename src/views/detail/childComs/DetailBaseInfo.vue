<template>
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
    <div class="info-title">{{ goods.title }}</div>
    <div class="info-price">
      <span class="n-price">{{ goods.newPrice }}</span>
      <span class="o-price">{{ goods.oldPrice }}</span>
      <span v-if="goods.discount" class="discount">{{ goods.discount }}</span>
    </div>
    <div class="info-other">
      <span>{{ goods.columns[0] }}</span>
      <span>{{ goods.columns[1] }}</span>
      <span>{{ goods.services[goods.services.length - 1].name }}</span>
    </div>
    <div class="info-service">
      <span
        class="info-service-item"
        v-for="index in goods.services.length - 1"
        :key="index"
      >
        <img :src="goods.services[index - 1].icon" />
        <span>{{ goods.services[index - 1].name }}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped>
.base-info {
  margin-top: 0.15rem;
  padding: 0 0.08rem;
  color: #999;
  border-bottom: 0.05rem solid #f2f5f8;
}

.info-title {
  color: #222;
}

.info-price {
  margin-top: 0.1rem;
}

.info-price .n-price {
  font-size: 0.24rem;
  color: var(--color-high-text);
}

.info-price .o-price {
  font-size: 0.13rem;
  margin-left: 0.05rem;
  text-decoration: line-through;
}

.info-price .discount {
  font-size: 0.12rem;
  padding: 0.02rem 0.05rem;
  color: #fff;
  background-color: var(--color-high-text);
  border-radius: 8px;
  margin-left: 0.05rem;

  /*让元素上浮一些: 使用相对定位即可*/
  position: relative;
  top: -0.08rem;
}

.info-other {
  margin-top: 0.15rem;
  line-height: 0.3rem;
  display: flex;
  font-size: 0.13rem;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
  justify-content: space-between;
}

.info-service {
  display: flex;
  justify-content: space-between;
  line-height: 0.6rem;
}

.info-service-item img {
  width: 0.14rem;
  height: 0.14rem;
  position: relative;
  top: 0.02rem;
}

.info-service-item span {
  font-size: 0.13rem;
  color: #333;
}
</style>
