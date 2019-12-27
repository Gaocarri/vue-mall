<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>
        <div>购物街</div>
      </template>
    </nav-bar>
    <tab-control
      :titles="['流行','新款','精选']"
      class="fixed-tab-control"
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="isTabFixed"
    />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <template v-slot:default>
        <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
        <home-recommend-view :recommends="recommends" />
        <home-feature />
        <tab-control
          :titles="['流行','新款','精选']"
          class="tab-control"
          @tabClick="tabClick"
          ref="tabControl2"
        />
        <goods-list :goods="goodsType" />
      </template>
    </scroll>

    <!-- .native修饰符可以监听组件的原生事件，组件原本无法监听 -->
    <back-top @click.native="backClick" v-show="isBackTopShow"></back-top>
  </div>
</template>

<script>
import HomeSwiper from "./childrenComps/HomeSwiper";
import HomeRecommendView from "./childrenComps/HomeRecommendView";
import HomeFeature from "./childrenComps/HomeFeature";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/utils";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    HomeRecommendView,
    HomeFeature,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: {
          page: 0,
          list: []
        },
        new: {
          page: 0,
          list: []
        },
        sell: {
          page: 0,
          list: []
        }
      },
      currentType: ["pop", "new", "sell"],
      index: 0,
      isBackTopShow: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    };
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata();
    // 2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // 监听图片加载
    const refresh = debounce(this.$refs.scroll.refresh, 50); // 每隔200ms再去调用refresh,如果上一次还未完成则清除上一次的200，再过200ms执行
    this.$bus.$on("itemImageLoad", () => {
      refresh();
    });
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    this.saveY = this.$refs.scroll.scroll.y;
  },
  computed: {
    goodsType() {
      return this.goods[this.currentType[this.index]].list;
    }
  },
  methods: {
    // 事件监听相关方法
    // home-nav切换
    tabClick(index) {
      this.index = index;
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    contentScroll(position) {
      // 1.判断Backtop是否显示
      this.isBackTopShow = position.y < -1000;

      // 2.决定tabControl是否吸顶(position:fixed)
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    loadMore() {
      this.getHomeGoods(this.currentType[this.index]);
    },
    swiperImageLoad() {
      // 获取tabControl的offsetTop
      // 所有组件中都有一个属性$el,用于获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    // 网络请求相关方法
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // created里的res就是这个组件对象
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        // ES6 arr1.push(...arr2)将arr2一个个push到arr1
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        // 执行finishPullUp,使下次下拉仍然可以加载
        this.$refs.scroll.finishPullUp();
      });
    }
  }
};
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}

.tab-control {
  z-index: 1;
  margin-bottom: 5px;
}

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  /* calc计算 -左右要有空格
  height: calc(100% - 93px); */
}

.fixed-tab-control {
  position: absolute;
  left: 0;
  right: 0;
}
</style>
