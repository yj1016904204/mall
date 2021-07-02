<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      :class="{ flex: isTabControlFlex }"
      v-show="isTabControlFlex"
    />

    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <home-swiper
        :swiperList="swiperList"
        @swiperImgaeLoad="swiperImgaeLoad"
      />
      <home-recommend-view :recommends="recommends" />
      <home-feature />
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      />
      <goods-list :goods="showGoods" />
    </scroll>

    <back-top @click.native="backClick" v-show="isBackTopShow" />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodList";
import BackTop from "components/content/backTop/BackTop";

import HomeSwiper from "./childComps/HomeSwiper.vue";
import HomeRecommendView from "./childComps/HomeRecommendView.vue";
import HomeFeature from "./childComps/HomeFuature.vue";

import { getHomeMultidata, getHomeGoods } from "network/home";

import { goodsListenerMixin } from "common/mixin";

export default {
  name: "Home",
  data() {
    return {
      swiperList: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isBackTopShow: false,
      tabControlTop: 0,
      isTabControlFlex: false,
      saveY: 0,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  components: {
    NavBar,
    Scroll,
    TabControl,
    GoodsList,
    BackTop,
    HomeSwiper,
    HomeRecommendView,
    HomeFeature,
  },
  created() {
    //1、请求轮播图和推荐相关数据
    this.getHomeMultidata();
    //2、获取商品的数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {},
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY();
    this.$bus.$off("itemImageLoad", this.goodsImgListener);
  },
  methods: {
    /*
     * 事件监听相关方法
     */
    //切换tab栏
    tabClick(payload) {
      switch (payload) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = payload;
      this.$refs.tabControl2.currentIndex = payload;
      this.isTabControlFlex &&
        this.$refs.scroll.scrollTo(0, -this.tabControlTop, 0);
    },
    //返回顶部
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    //显示和隐藏返回顶部按钮
    contentScroll(payload) {
      //对返回顶部按钮进行监听
      this.isBackTopShow = -payload.y > 1000;
      //对tab选项卡下拉进行监听
      this.isTabControlFlex = -payload.y > this.tabControlTop;
    },
    //加载更多
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    //监听轮播图是否加载完毕
    swiperImgaeLoad() {
      this.tabControlTop = this.$refs.tabControl2.$el.offsetTop;
    },

    /*
     * 网络请求相关方法
     */
    //1、请求轮播图和推荐相关数据
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.swiperList = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    //2、获取商品的数据
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        //完成加载更多
        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>

<style scoped>
#home {
  /* padding-top: 0.44rem; */
  position: relative;
}
.home-nav {
  background: var(--color-tint);
  color: #fff;
  font-size: 0.16rem;
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0; */
  z-index: 9;
}

.content {
  position: fixed;
  overflow: hidden;
  top: 0.44rem;
  bottom: 0.49rem;
  left: 0;
  right: 0;
}

.flex {
  position: fixed;
  left: 0;
  right: 0;
  z-index: 9;
}
</style>