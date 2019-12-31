<template>
  <div class="cart">
    <nav-bar class="cart-nav">
      <template v-slot:center>
        <span>购物车({{length}})</span>
      </template>
    </nav-bar>
    <cart-list />
    <cart-bottom-bar />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CartList from "./childrenComps/CarList";
import CartBottomBar from "./childrenComps/CartBottomBar";

import { mapGetters } from "vuex";

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    ...mapGetters({
      length: "cartLength"
    })
  }
};
</script>

<style scoped>
.cart {
  height: 100vh;
}

.cart-nav {
  background-color: var(--color-tint);
  color: #fff;
}
</style>
