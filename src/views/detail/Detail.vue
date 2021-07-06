<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar" @titleClick="titleClick" ref="nav" />
    <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info ref="param" :paramInfo="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <good-list ref="list" :goods="recommendInfo" />
    </scroll>
    <back-top @click.native="backClick" v-show="isBackTopShow" />
    <detail-bottom-bar @addToCart="addToCart" />
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
import { goodsListenerMixin, backTopMixin } from "common/mixin";

import Scroll from "components/common/scroll/Scroll";
import GoodList from "components/content/goods/GoodList";

import DetailNavBar from "./childComs/DetailNavBar.vue";
import DetailSwiper from "./childComs/DetailSwiper.vue";
import DetailBaseInfo from "./childComs/DetailBaseInfo.vue";
import DetailShopInfo from "./childComs/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComs/DetailGoodsInfo.vue";
import DetailParamInfo from "./childComs/DetailParamInfo.vue";
import DetailCommentInfo from "./childComs/DetailCommentInfo.vue";
import DetailBottomBar from "./childComs/DetailBottomBar.vue";

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
      themeTops: [],
      currentIndex: 0,
    };
  },
  mixins: [goodsListenerMixin, backTopMixin],
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
    GoodList,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
      this.getThemeTops();
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTops[index], 200);
    },
    //点击标签滚动对应部分
    getThemeTops() {
      this.themeTops = [0];
      this.themeTops.push(this.$refs.param.$el.offsetTop);
      this.themeTops.push(this.$refs.comment.$el.offsetTop);
      this.themeTops.push(this.$refs.list.$el.offsetTop);
    },
    contentScroll(payload) {
      let positionY = -payload.y;
      let length = this.themeTops.length;
      for (let i = 0; i < length; i++) {
        if (
          (this.currentIndex !== i &&
            i < length - 1 &&
            positionY >= this.themeTops[i] &&
            positionY < this.themeTops[i + 1]) ||
          (this.currentIndex !== i &&
            i === length - 1 &&
            positionY >= this.themeTops[i])
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
      this.isShowBackTop(payload);
    },
    addToCart() {
      //获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      product.checked = true;

      //将商品信息放在store中
      this.$store.dispatch("getGoodsList", product).then((res) => {
        this.$toast.show(res);
      });
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
  bottom: 0.49rem;
  z-index: 9;
  background: #fff;
}
</style>