<template>
  <div class="recommend">
    <div v-for="item in recommends" :key="item.index" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" />
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeRecommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style scoped>
.recommend {
  display: flex;
  width: 100%;
  font-size: 14px;
  padding: 10px 0 20px;
  border-bottom: 8px solid #eee;
}
.recommend-item {
  flex: 1;
  text-align: center;
}
.recommend-item img {
  max-width: 80%;
  max-height: 80%;
  margin-bottom: 10px;
}
</style>
