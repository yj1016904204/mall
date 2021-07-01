<template>
  <div class="tab-bar-item" @click="itemClick">
    <slot name="item-icon" v-if="!isActive"></slot>
    <slot name="item-icon-active" v-else></slot>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  data() {
    return {};
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    },
  },
  props: {
    path: String,
    activeColor: {
      path: String,
      default: "red",
    },
  },
  components: {},
  methods: {
    itemClick() {
      this.$router.replace(this.path);
    },
  },
};
</script>

<style scoped>
.tab-bar-item {
  flex-direction: column;
  flex: 1;
  text-align: center;
  height: 0.49rem;
  display: flex;
}
.tab-bar-item img {
  height: 0.24rem;
  width: 0.24rem;
  margin: 0.05rem auto 0;
}
.active {
  color: red;
}
</style>