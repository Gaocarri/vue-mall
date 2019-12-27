<template>
  <div>
    <swiper class="swiper-image">
      <template v-slot:default>
        <swiper-item v-for="(image,index) in topImages" :key="index">
          <template v-slot:default>
            <a :href="image">
              <img :src="image" />
            </a>
          </template>
        </swiper-item>
      </template>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper/index.js";

export default {
  name: "DetailSwiper",
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
};
</script>

<style scoped>
.swiper-image {
  height: 300px;
}
</style>
