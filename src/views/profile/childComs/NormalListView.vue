<template>
  <div class="normal-list">
    <div v-for="(item, index) in listData" :key="index" class="item">
      <span class="icon">
        <img :src="iconURL(item)" alt="" />
      </span>
      <div class="info">{{ item.info }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NormalListView",
  props: {
    listData: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    iconURL(item) {
      return require("assets/img/profile/" + item.icon);
    },
  },
};
</script>

<style scoped>
.normal-list {
  background-color: #fff;
  font-size: 0.15rem;
  color: #333;
  margin-top: 0.15rem;
}

.normal-list .item {
  height: 0.44rem;
  line-height: 0.44rem;
  position: relative;
}

.icon img {
  width: 0.2rem;
  height: 0.2rem;
}

.item .icon {
  margin-top: 0.1rem;
  position: absolute;
  left: 0.16rem;
  top: -0.07rem;
}

.item .info {
  margin-left: 0.4rem;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
  padding-left: 0.05rem;
}

.item:last-of-type .info {
  border-bottom: none;
}
</style>