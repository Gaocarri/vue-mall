<template>
  <div class="tab-content-category">
    <div v-for="(item,index) in subcategories.list" :key="index" class="item">
      <a :href="item.link">
        <img :src="item.image" alt @load="imageLoad(index)" />
        <div class="title">{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabContentCategory",
  props: {
    subcategories: {
      type: Object,
      default() {
        return Object;
      }
    }
  },
  methods: {
    imageLoad(index) {
      if (index === this.subcategories.list.length - 1) {
        this.$emit("imageLoad");
      }
    }
  }
};
</script>

<style scoped>
.tab-content-category {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  text-align: center;
  font-size: 12px;
  padding: 20px 0;
}

.item {
  margin-bottom: 15px;
}

.item img {
  width: 60px;
  height: 60px;
  margin-bottom: 10px;
}
</style>
