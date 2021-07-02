import { debounce } from "./utils"
export const goodsListenerMixin = {
  data() {
    return {
      goodsImgListener: null
    }
  },
  mounted() {
    const newRefresh = debounce(this.$refs.scroll.refresh);
    //3、监听图片加载完事件
    this.goodsImgListener = () => {
      newRefresh();
    };
    this.$bus.$on("itemImageLoad", this.goodsImgListener);
  }
}