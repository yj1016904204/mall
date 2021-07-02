<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar" />
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info :paramInfo="paramInfo" />
      <detail-comment-info :comment-info="commentInfo" />
      <good-list :goods="recommendInfo" />
    </scroll>
  </div>
</template>

<script>
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";
import { goodsListenerMixin } from "common/mixin";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodList";

import DetailNavBar from "./childComs/DetailNavBar.vue";
import DetailSwiper from "./childComs/DetailSwiper.vue";
import DetailBaseInfo from "./childComs/DetailBaseInfo.vue";
import DetailShopInfo from "./childComs/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComs/DetailGoodsInfo.vue";
import DetailParamInfo from "./childComs/DetailParamInfo.vue";
import DetailCommentInfo from "./childComs/DetailCommentInfo.vue";
import GoodList from "../../components/content/goods/GoodList.vue";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommendInfo: [],
    };
  },
  mixins: [goodsListenerMixin],
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
      //获取商品详细信息
      this.detailInfo = data.detailInfo;
      //获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      //取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });
    //获取推荐信息
    getRecommend().then((res) => {
      this.recommendInfo = res.data.list;
    });
  },
  components: {
    Scroll,
    GoodsList,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodList,
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
    },
  },
  mounted() {},
  destroyed() {
    this.$bus.$off("itemImageLoad", this.goodsImgListener);
  },
};
</script>

<style scoped>
.detail-nav-bar {
  position: relative;
  z-index: 10;
  background: #fff;
}

.content {
  position: fixed;
  top: 0.44rem;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9;
  background: #fff;
}
</style>