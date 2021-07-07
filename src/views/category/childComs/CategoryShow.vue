<template>
  <div class="category-show">
    <van-grid :column-num="3" icon-size="0.64rem">
      <van-grid-item
        v-for="(item, index) in subCategory"
        :key="index"
        :icon="item.image"
        :text="item.title"
        :url="item.link"
      />
    </van-grid>
  </div>
</template>

<script>
import Vue from "vue";
import { Grid, GridItem } from "vant";

Vue.use(Grid);
Vue.use(GridItem);
export default {
  name: "CategoryShow",
  data() {
    return {};
  },
  components: {},
  methods: {},
  props: {
    subCategory: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
</style>