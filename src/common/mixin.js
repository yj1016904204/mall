import { debounce } from "./utils"
import BackTop from "components/content/backTop/BackTop";

export const goodsListenerMixin = {
  data() {
    return {
      goodsImgListener: null,
      newRefresh: null
    }
  },
  mounted() {
    this.newRefresh = debounce(this.$refs.scroll.refresh);
    //3、监听图片加载完事件
    this.goodsImgListener = () => {
      this.newRefresh();
    };
    this.$bus.$on("itemImageLoad", this.goodsImgListener);
  }
}

export const backTopMixin = {
  data() {
    return {
      isBackTopShow: false,
    }
  },
  components: {
    BackTop
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    isShowBackTop(payload) {
      this.isBackTopShow = -payload.y > 1000;
    }
  }
}