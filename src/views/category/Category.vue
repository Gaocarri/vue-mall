<template>
  <div id="category">
    <nav-bar class="nav-bar">
      <template v-slot:center>
        <span>分类</span>
      </template>
    </nav-bar>

    <div class="content">
      <tab-menu :categories="categories" @titleClick="titleClick" />
      <scroll class="tab-content" ref="scroll">
        <template v-slot:default>
          <tab-content-category :subcategories="showSubCategory" @imageLoad="imageLoad" />
        </template>
      </scroll>
    </div>

    <back-top @click.native="backClick" v-show="isBackTopShow"></back-top>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";

import NavBar from "components/common/navbar/NavBar";
import TabMenu from "./childrenComps/TabMenu";
import TabContentCategory from "./childrenComps/TabContentCategory";

import { getCategory, getSubcategory } from "network/category.js";

import { backTopMixin } from "common/mixin";

export default {
  name: "Category",
  components: {
    Scroll,
    NavBar,
    TabMenu,
    TabContentCategory
  },
  mixins: [backTopMixin],
  data() {
    return {
      categories: [],
      categoryData: [],
      currentIndex: -1
    };
  },
  created() {
    // 获取分类的数据
    this._getCategory();
  },
  computed: {
    showSubCategory() {
      if (this.currentIndex === -1) {
        return {};
      }
      return this.categoryData[this.currentIndex].subcategories;
    }
  },
  methods: {
    // 网络请求相关方法
    _getCategory() {
      // 1.获取tabMenu数据
      getCategory().then(res => {
        this.categories = res.data.category.list;
        // 2.初始化每个menu的数据
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories: {}
          };
        }
        // 3.请求第一个title的数据
        this._getSubcategories(0);
      });
    },
    _getSubcategories(index) {
      this.currentIndex = index;
      const maitKey = this.categories[index].maitKey;
      getSubcategory(maitKey).then(res => {
        this.categoryData[index].subcategories = res.data;
        this.categoryData = { ...this.categoryData };
      });
    },
    // 事件相关方法
    titleClick(index) {
      this._getSubcategories(index);
    },
    imageLoad() {
      this.$refs.scroll.refresh();
    }
  }
};
</script>

<style scoped>
#category {
  height: 100vh;
}

.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}

.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  display: flex;
}

.content .tab-content {
  flex: 1;
  height: 100%;
  overflow: hidden;
}
</style>
