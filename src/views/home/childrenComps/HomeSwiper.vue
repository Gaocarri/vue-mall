<template>
  <div>
    <swiper>
      <template v-slot:default>
        <swiper-item v-for="item in banners" :key="item.index">
          <template v-slot:default>
            <a :href="item.link">
              <img :src="item.image" @load="imageLoad" />
            </a>
          </template>
        </swiper-item>
      </template>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "HomeSwiper",
  components: {
    Swiper,
    SwiperItem
  },
  data() {
    return {
      isLoad: false
    };
  },
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    imageLoad() {
      if (this.isLoad === false) {
        this.$emit("swiperImageLoad");
        this.isLoad = true;
      }
    }
  }
};
</script>

<style scoped>
</style>
