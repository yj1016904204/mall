<template>
  <van-sidebar v-model="activeKey" @change="onChange">
    <van-sidebar-item
      :title="item.title"
      v-for="item in siderBarInfo"
      :key="item.maitKey"
    />
  </van-sidebar>
</template>

<script>
import Vue from "vue";
import { Sidebar, SidebarItem } from "vant";

Vue.use(Sidebar);
Vue.use(SidebarItem);
export default {
  name: "SiderBar",
  data() {
    return {
      activeKey: 0,
    };
  },
  components: {},
  methods: {
    onChange(index) {
      this.$emit("SiderClick", index);
    },
  },
  props: {
    siderBarInfo: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.van-sidebar-item--select {
  color: var(--color-high-text);
  font-weight: 700;
}
.van-sidebar-item--select::before {
  width: 0.02rem;
  height: 0.4rem;
  background: var(--color-high-text);
}
.van-sidebar-item {
  text-align: center;
}
</style>