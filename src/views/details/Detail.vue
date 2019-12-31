<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav" />
    <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages" />
      <detail-goods-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-info>
      <detail-param-info :paramInfo="paramInfo" ref="params" />
      <comment-info :comment-info="commentInfo" ref="comments" />
      <goods-list :goods="recommends" ref="recommends" />
    </scroll>
    <detail-bottom-bar @addToCart="addToCart" @buy="buy" />

    <back-top @click.native="backClick" v-show="isBackTopShow" />
  </div>
</template>

<script>
import DetailNavBar from "./childrenComps/DetailNavBar";
import DetailSwiper from "./childrenComps/DetailSwiper";
import DetailGoodsInfo from "./childrenComps/DetailGoodsInfo";
import DetailShopInfo from "./childrenComps/DetailShopInfo";
import DetailInfo from "./childrenComps/DetaiInfo";
import DetailParamInfo from "./childrenComps/DetailParamInfo";
import DetailBottomBar from "./childrenComps/DetailBottomBar";
import CommentInfo from "./childrenComps/DetailCommentInfo";

import { itemListenerMixin, backTopMixin } from "common/mixin";
import { debounce } from "common/utils";

import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";

import { mapActions } from "vuex";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "network/detail";

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
      recommends: [],
      themeTopYs: [],
      getThemeTopYs: null,
      currentIndex: 0
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailGoodsInfo,
    DetailShopInfo,
    DetailInfo,
    DetailParamInfo,
    DetailBottomBar,
    Scroll,
    CommentInfo,
    GoodsList
  },
  mixins: [itemListenerMixin, backTopMixin],
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid;

    // 2.根据iid请求
    getDetail(this.iid).then(res => {
      const data = res.result;
      // 1.获取顶部的轮播图片
      this.topImages = res.result.itemInfo.topImages;
      // 2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 3.创建商家信息
      this.shop = new Shop(data.shopInfo);

      // 4.保存商品的详情数据
      this.detailInfo = data.detailInfo;

      // 5.保存商品参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 6.取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }

      // 7.取出推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list;
      });
    });

    // 执行完的回调函数
    this.$nextTick(() => {});
  },
  mounted() {
    // 给getThemeTopY赋值（进行防抖）
    this.getThemeTopYs = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comments.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommends.$el.offsetTop);
    }, 300);
  },
  destroyed() {
    this.$bus.$off("itemImageLoad", this.itemImageListener);
  },
  methods: {
    ...mapActions(["addCart"]),
    imageLoad() {
      this.$refs.scroll.refresh();
      this.getThemeTopYs();
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300);
    },
    contentScroll(position) {
      // 显示BackTop
      this.isBackTopShow = position.y < -1000;

      // 1.获取y值
      const positionY = -position.y;
      const lastIndex = this.themeTopYs.length - 1;
      // 2.positionY和主题中的数值对比
      for (let i in this.themeTopYs) {
        i = parseInt(i);
        if (
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1] &&
          this.currentIndex !== i
        ) {
          // 防止赋值过于频繁
          this.currentIndex = i;
          this.$refs.nav.currentIndex = i;
        } else if (
          positionY >= this.themeTopYs[lastIndex] &&
          this.currentIndex !== lastIndex
        ) {
          // 防止赋值过于频繁
          this.currentIndex = lastIndex;
          this.$refs.nav.currentIndex = lastIndex;
        }
      }
    },
    addToCart() {
      // 1.获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.lowNowPrice;
      product.iid = this.iid;

      // 2.将商品添加到购物车中
      this.addCart(product).then(res => {
        this.$toast.show(res, 2000);
      });
    },
    buy() {
      this.$toast.show("非常抱歉~暂不支持购买", 2000);
    }
  }
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  overflow: hidden;
  /* 或者 */
  /* height: calc(100% - 44px - 49px); */
}

.detail-nav {
  background-color: #fff;
  z-index: 1;
  position: relative;
}
</style>
