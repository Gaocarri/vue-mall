import { debounce } from './utils'

export const itemListenerMixin = {
  data() {
    return {
      itemImageListener: null
    }
  },
  mounted() {
    // 监听图片加载
    const refresh = debounce(this.$refs.scroll.refresh, 50); // 每隔200ms再去调用refresh,如果上一次还未完成则清除上一次的200，再过200ms执行
    this.itemImageListener = () => {
      refresh();
    };
    this.$bus.$on("itemImageLoad", this.itemImageListener);
  }
}