<template>
  <swiper class="swiper" :options="swiperOption" v-if="topImages.length > 0">
    <swiper-slide
      v-for="(item, index) in topImages"
      :key="index"
      class="swiper-item"
      ><img :src="item"
    /></swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";

export default {
  name: "DetailSwiper",
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
        },
        longSwipesRatio: 0.25,
        preventInteractionOnTransition: true,
      },
      isLoad: true,
    };
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {},
};
</script>

<style scoped>
.swiper img {
  width: 100%;
}
.swiper-item {
  height: 3rem;
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