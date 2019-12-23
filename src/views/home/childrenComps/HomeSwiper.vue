<template>
  <div>
    <swiper>
      <template v-slot:default>
        <swiper-item v-for="item in banners" :key="item.index">
          <template v-slot:default>
            <a :href="item.link">
              <img :src="item.image" />
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
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style scoped>
</style>
