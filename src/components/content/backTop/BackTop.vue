<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt="" />
  </div>
</template>

<script>
export default {
  name: "BackTop",
  data() {
    return {};
  },
  components: {},
  methods: {},
};
</script>

<style scoped>
.back-top {
  position: fixed;
  right: 0.08rem;
  bottom: 0.55rem;
  z-index: 10;
}
.back-top img {
  height: 0.43rem;
  width: 0.43rem;
}
</style>