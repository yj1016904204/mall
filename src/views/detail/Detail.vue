<template>
  <div id="detail">
    <detail-nav-bar />
    <detail-swiper :topImages="topImages" />
    <detail-base-info :goods="goods" />
    <detail-shop-info :shop="shop" />
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";

import DetailNavBar from "./childComs/DetailNavBar.vue";
import DetailSwiper from "./childComs/DetailSwiper.vue";
import DetailBaseInfo from "./childComs/DetailBaseInfo.vue";
import DetailShopInfo from "./childComs/DetailShopInfo.vue";

import { getDetail, Goods, Shop } from "network/detail";
export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
    };
  },

  created() {
    //保存传入的id
    this.iid = this.$route.params.iid;

    //获取数据
    getDetail(this.iid).then((res) => {
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      //获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //获取店铺信息
      this.shop = new Shop(data.shopInfo);
    });
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
  },
  methods: {},
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background: #fff;
}
</style>