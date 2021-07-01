<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import Pullup from "@better-scroll/pull-up";
import ObserveDom from "@better-scroll/observe-dom";
BScroll.use(ObserveDom);
BScroll.use(Pullup);

export default {
  name: "Scroll",
  data() {
    return {
      isPullUpLoad: false,
      scroll: null,
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.initBscroll();
  },
  components: {},
  methods: {
    initBscroll() {
      //创建BScroll实例
      this.scroll = new BScroll(this.$refs.wrapper, {
        observeDOM: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad,
        click: true,
      });
      /* this.scroll.on("pullingUp", () => {
        console.log(111);
      }); */
      //监听滚动事件
      (this.probeType === 2 || this.probeType === 3) &&
        this.scroll.on("scroll", (position) => {
          this.$emit("scroll", position);
        });
      //监听加载事件
      this.pullUpLoad &&
        this.scroll.on("pullingUp", () => {
          this.$emit("pullingUp");
        });
    },

    scrollTo(x, y, timer = 500) {
      this.scroll && this.scroll.scrollTo(x, y, timer);
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    //刷新操作
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    },
  },
};
</script>

<style scoped>
</style>