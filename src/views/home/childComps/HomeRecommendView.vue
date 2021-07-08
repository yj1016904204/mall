<template>
  <div class="recommend">
    <div
      v-for="(item, index) in recommends"
      :key="index"
      class="recommend-item"
    >
      <img :src="item.image" alt="" @load="recommendImgLoad" />
      <div>{{ item.title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeRecommendView",
  data() {
    return {};
  },
  components: {},
  methods: {
    recommendImgLoad() {
      this.$emit("recommendImgLoad");
    },
  },
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.recommend {
  display: flex;
  justify-content: space-between;
  border-bottom: 8px solid #eee;
}
.recommend-item {
  flex: 1;
  text-align: center;
  padding: 0.1rem 0 0.2rem;
}
.recommend-item img {
  width: 0.8rem;
  margin: 0.05rem auto;
}
</style>