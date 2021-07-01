<template>
  <div class="tab-control">
    <div
      v-for="(item, index) in titles"
      class="tab-control-item"
      :key="index"
      :class="{ active: currentIndex === index }"
      @click="itemClick(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  data() {
    return {
      currentIndex: 0,
    };
  },
  components: {},
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("tabClick", index);
    },
  },
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.tab-control {
  display: flex;
  line-height: 0.44rem;
  height: 0.44rem;
  color: var(--color-text);
  background: #fff;
  text-align: center;
  font-size: 0.16rem;
  z-index: 9;
}
.tab-control-item {
  flex: 1;
}
.tab-control-item span {
  padding: 5px;
}
.active {
  color: var(--color-high-text);
}
.active span {
  border-bottom: 3px solid var(--color-tint);
}
</style>