<template>
  <div class="check-button" :class="{checked:isChecked}">
    <img src="~assets/img/cart/tick.svg" v-if="isChecked" />
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isChecked: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
.check-button {
  width: 20px;
  height: 20px;
  border: 2px solid #aaa;
  border-radius: 50%;
  text-align: center;
}

.checked {
  background-color: red;
  border: none;
}

.check-button img {
  vertical-align: middle;
}
</style>
