<template>
  <swiper class="swiper" :options="swiperOption" v-if="swiperList.length > 0">
    <swiper-slide v-for="(item, index) in swiperList" :key="index"
      ><img :src="item.image" @load="imageLoad"
    /></swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
export default {
  name: "HomeSwiper",
  components: {
    swiper,
    swiperSlide,
  },
  data() {
    return {
      // swiperList: this.$parent.swiperList,
      swiperOption: {
        loop: true,
        autoplay: {
          disableOnInteraction: false, // 用户操作swiper之后，是否禁止autoplay
          stopOnLastSlide: false,
          delay: 3000, // 自动切换的时间间隔（单位ms）
        },
        // initialSlide: 0,
        // noSwiping: false,
        pagination: {
          el: ".swiper-pagination",
          clickable: true, //允许分页点击跳转
        },
        longSwipesRatio: 0.25,
        preventInteractionOnTransition: true,
      },
      isLoad: true,
    };
  },
  props: {
    swiperList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    imageLoad() {
      this.isLoad && this.$emit("swiperImgaeLoad");
      this.isLoad = false;
    },
  },
};
</script>

<style scoped>
.swiper img {
  width: 100%;
}
</style>
<style>
.swiper .swiper-pagination-bullet {
  background: #fff;
  opacity: 1;
}
.swiper .swiper-pagination-bullet-active {
  background: #f0280d;
}
</style>
