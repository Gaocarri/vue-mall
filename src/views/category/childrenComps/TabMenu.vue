<template>
  <scroll class="tab-menu">
    <template v-solt:default>
      <div class="menu-list" v-for="(item,index) in categories" :key="index">
        <div
          class="list-item"
          :class="{active:index===currentIndex}"
          @click="itemClick(index)"
        >{{item.title}}</div>
      </div>
    </template>
  </scroll>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
export default {
  name: "TabMenu",
  components: {
    Scroll
  },
  props: {
    categories: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    };
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("titleClick", index);
    }
  }
};
</script>

<style scoped>
.tab-menu {
  background-color: #f6f6f6;
  height: 100%;
  width: 100px;
  box-sizing: border-box;
  overflow: hidden;
}

.menu-list .list-item {
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 14px;
}

.menu-list .active {
  color: var(--color-high-text);
  background-color: #fff;
  border-left: 2px solid var(--color-high-text);
}
</style>
