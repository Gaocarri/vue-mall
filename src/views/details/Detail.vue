<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" />
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages" />
      <detail-goods-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-info>
      <detail-param-info :paramInfo="paramInfo" />
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "./childrenComps/DetailNavBar";
import DetailSwiper from "./childrenComps/DetailSwiper";
import DetailGoodsInfo from "./childrenComps/DetailGoodsInfo";
import DetailShopInfo from "./childrenComps/DetailShopInfo";
import DetailInfo from "./childrenComps/DetaiInfo";
import DetailParamInfo from "./childrenComps/DetailParamInfo";

import Scroll from "components/common/scroll/Scroll";

import { getDetail, Goods, Shop, GoodsParam } from "network/detail";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {}
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailGoodsInfo,
    DetailShopInfo,
    DetailInfo,
    Scroll,
    DetailParamInfo
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid;

    // 2.根据iid请求
    getDetail(this.iid).then(res => {
      console.log(res);
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
    });
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
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
  bottom: 0;
  /* 或者 */
  /* height: calc(100% - 44px); */
}

.detail-nav {
  background-color: #fff;
  z-index: 1;
  position: relative;
}
</style>
