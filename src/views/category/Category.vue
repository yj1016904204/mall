<template>
  <div>
    <nav-bar class="category-nav"><div slot="center">商品分类</div></nav-bar>
    <scroll class="content1" ref="scroll1" :probeType="3"
      ><SiderBar :siderBarInfo="categoryInfo" @SiderClick="SiderClick" />
    </scroll>
    <scroll class="content" ref="scroll" :probeType="3">
      <CategoryShow :subCategory="subCategory" />
      <tab-control
        :titles="['综合', '新款', '销量']"
        @tabClick="tabClick"
        ref="tabControl"
      />
      <goods-list :goods="showGoods" />
    </scroll>
  </div>
</template>

<script>
import { goodsListenerMixin } from "common/mixin";

import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodList";
import {
  getCategory,
  getSubcategory,
  getCategoryDetail,
} from "network/category";

import SiderBar from "./childComs/SiderBar.vue";
import CategoryShow from "./childComs/CategoryShow.vue";

export default {
  name: "Category",
  data() {
    return {
      categoryInfo: [],
      subCategory: [],
      goods: {
        pop: [],
        new: [],
        sell: [],
      },
      currentType: "pop",
    };
  },
  mixins: [goodsListenerMixin],
  components: {
    NavBar,
    Scroll,
    TabControl,
    GoodsList,
    SiderBar,
    CategoryShow,
  },
  created() {
    //获取分类数据
    getCategory().then((res) => {
      this.categoryInfo = res.data.category.list;
      //刚打开执行一次默认请求
      this.getSubcategory(this.categoryInfo[0].maitKey);
      this.getCategoryDetail(this.categoryInfo[0].miniWallkey, "pop");
      this.getCategoryDetail(this.categoryInfo[0].miniWallkey, "new");
      this.getCategoryDetail(this.categoryInfo[0].miniWallkey, "sell");
    });
  },
  methods: {
    getCategoryDetail(miniWallkey, type) {
      getCategoryDetail(miniWallkey, type).then((res) => {
        this.goods[type] = res;
        this.$refs.scroll.refresh();
      });
    },
    getSubcategory(maitKey) {
      getSubcategory(maitKey).then((res) => {
        this.subCategory = res.data.list;
        this.$refs.scroll.refresh();
      });
    },
    SiderClick(index) {
      this.getSubcategory(this.categoryInfo[index].maitKey);
      this.getCategoryDetail(this.categoryInfo[index].miniWallkey, "pop");
      this.getCategoryDetail(this.categoryInfo[index].miniWallkey, "new");
      this.getCategoryDetail(this.categoryInfo[index].miniWallkey, "sell");
      this.$refs.scroll1.refresh();
    },
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
    },
  },
  activated() {
    this.$refs.scroll.refresh();
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType];
    },
  },
};
</script>

<style scoped>
.category-nav {
  background: var(--color-tint);
  color: #fff;
  font-size: 0.16rem;
  z-index: 9;
}
.content {
  position: fixed;
  overflow: hidden;
  top: 0.44rem;
  bottom: 0.49rem;
  left: 0.8rem;
  right: 0;
}
.content1 {
  position: fixed;
  overflow: hidden;
  top: 0.44rem;
  bottom: 0.49rem;
  left: 0;
  right: calc(100% - 0.8rem);
}
</style>