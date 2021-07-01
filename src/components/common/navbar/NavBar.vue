<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {};
  },
  components: {},
  methods: {},
};
</script>

<style scoped>
.nav-bar {
  display: flex;
  line-height: 0.44rem;
  height: 0.44rem;
  text-align: center;
  box-shadow: 0 1px 1px rgba(100, 100, 100, 0.1);
}
.left,
.right {
  width: 0.6rem;
}
.center {
  flex: 1;
}
</style>