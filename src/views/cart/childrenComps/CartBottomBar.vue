<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" :is-checked="isSelectAll" @click.native="checkClick" />
      <span>全选</span>
      <span class="price">合计:¥{{totalPrice}}</span>
    </div>

    <div class="calculate">去计算({{checkLength}})</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  methods: {
    checkClick() {
      // if (this.isSelectAll) {
      //   this.$store.state.cartList.map(item => (item.checked = false));
      // } else {
      //   this.$store.state.cartList.map(item => (item.checked = true));
      // }

      // 简化
      const select = this.isSelectAll;
      this.$store.state.cartList.map(item => (item.checked = !select));
    }
  },
  computed: {
    totalPrice() {
      return this.$store.state.cartList
        .filter(item => {
          return item.checked;
        })
        .reduce((preValue, item) => {
          return item.price * item.count + preValue;
        }, 0)
        .toFixed(2);
    },
    checkLength() {
      return this.$store.state.cartList
        .filter(item => {
          return item.checked;
        })
        .reduce((preValue, item) => {
          return item.count + preValue;
        }, 0);
    },
    isSelectAll() {
      return (
        // this.$store.state.cartList.filter(item => !item.checked).length === 0 &&
        // find方法性能更高
        !this.$store.state.cartList.find(item => !item.checked) &&
        this.$store.state.cartList.length !== 0
      );
    }
  }
};
</script>

<style scoped>
.bottom-bar {
  height: 40px;
  display: fixed;
  left: 0;
  right: 0;
  background-color: #eee;
  line-height: 40px;
  position: relative;
  font-size: 14px;
}

.check-content {
  display: flex;
  align-items: center;
}

.check-button {
  margin-left: 5px;
  margin-right: 5px;
  display: flex;
  justify-content: center;
}

.price {
  margin-left: 30px;
}

.calculate {
  position: absolute;
  top: 0;
  right: 0;
  width: 100px;
  background-color: orangered;
  color: white;
  text-align: center;
}
</style>
