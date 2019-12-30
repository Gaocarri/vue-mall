<template>
  <div class="shop-info" v-if="Object.keys(shop).length!==0">
    <div class="shop-head">
      <img :src="shop.logo" />
      <a :href="shop.shopUrl">{{shop.name}}</a>
    </div>

    <div class="shop-overview">
      <div class="overview-line"></div>
      <div class="shop-sells">
        <div class="shop-num">{{shop.sells | sellsCountFilter}}</div>
        <span>总销量</span>
      </div>
      <div class="shop-goods">
        <div class="shop-num">{{shop.goodsCount}}</div>
        <span>全部宝贝</span>
      </div>
      <div class="shop-des">
        <div v-for="(score,index) in  shop.score" :key="index" class="project-des">
          <span>{{score.name}}</span>
          <span class="low" :class="{high:score.isBetter}">{{score.score}}</span>
          <span v-if="score.isBetter" class="lowBg" :class="{highBg:score.isBetter}">高</span>
          <span v-else class="lowBg" :class="{highBg:score.isBetter}">低</span>
        </div>
      </div>
    </div>

    <a :href="shop.shopUrl">
      <div class="go-shop">进店逛逛</div>
    </a>
  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  props: {
    shop: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  filters: {
    sellsCountFilter(value) {
      if (value < 10000) {
        return value;
      }
      return (value / 10000).toFixed(1) + "万";
    }
  }
};
</script>

<style scoped>
.shop-info {
  border-bottom: 5px solid #f2f5f8;
}
.lowBg {
  background-color: #5ea732;
  color: #fff;
  border-radius: 10%;
}

.highBg {
  background-color: #f13e3a;
}

.shop-head {
  margin: 20px 10px;
}

.shop-head img {
  border: 1px solid rgba(100, 100, 100, 0.1);
  border-radius: 50%;
  width: 60px;
  vertical-align: middle;
  margin-right: 6px;
}

.shop-overview {
  display: flex;
  text-align: center;
  font-size: 14px;
}

.shop-overview .shop-sells {
  flex: 1;
}

.shop-overview .shop-num {
  font-size: 18px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.shop-overview .shop-goods {
  flex: 1;
}

.shop-overview .shop-des {
  border-left: 1px solid rgba(100, 100, 100, 0.1);
  font-size: 14px;
  flex: 2;
}

.shop-des .project-des {
  display: flex;
  justify-content: space-between;
  margin: 0 15px 0 20px;
}

.shop-des .project-des span {
  margin-bottom: 8px;
}

.low {
  color: #5ea732;
}

.high {
  color: #f13e3a;
}

.go-shop {
  width: 40%;
  margin: 10px auto 30px;
  font-size: 14px;
  text-align: center;
  border-radius: 5% / 50%;
  padding: 6px 0;
  background-color: rgba(100, 100, 100, 0.1);
}
</style>
