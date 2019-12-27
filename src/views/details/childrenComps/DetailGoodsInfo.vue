<template>
  <div v-if="Object.keys(goods).length!==0">
    <div class="goods-title">{{goods.title}}</div>

    <div class="goods-price">
      <span class="new-price">{{goods.newPrice}}</span>
      <strike class="old-price">{{goods.oldPrice}}</strike>
      <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
    </div>

    <div class="goods-columns">
      <span v-for="(column,index) in goods.columns" :key="index">{{column}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>

    <div class="info-service">
      <div v-for="index in goods.services.length-1" :key="index">
        <img :src="goods.services[index-1].icon" />
        <span>{{goods.services[index-1].name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoodsInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>

<style scoped>
.goods-title {
  font-size: 20px;
  font-weight: 700;
  margin: 14px 6px 10px;
}

.goods-price {
  margin: 0 6px;
}

.goods-price .new-price {
  color: var(--color-tint);
  font-size: 24px;
  font-weight: 500;
}

.goods-price .old-price {
  margin: 0 5px;
  color: #ccc;
  display: relative;
}

.goods-price .discount {
  font-size: 14px;
  padding: 4px;
  background-color: var(--color-tint);
  color: #fff;
  border-radius: 14px;
  position: relative;
  bottom: 12px;
}

.goods-columns {
  display: flex;
  /* justify-content: space-between; */
  margin: 18px 0;
  font-size: 14px;
  color: #bbb;
  padding-bottom: 5px;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
  text-align: center;
}
.goods-columns > span {
  flex: 1;
}

.info-service {
  display: flex;
  /* justify-content: space-between; */
  padding-bottom: 18px;
  border-bottom: 3px solid rgba(100, 100, 100, 0.1);
  font-size: 14px;
  text-align: center;
}
.info-service > div {
  flex: 1;
}

.info-service img {
  width: 14px;
  vertical-align: top;
}
</style>
