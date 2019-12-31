<template>
  <div class="bottom-bar">
    <div>
      <check-button />
      <span>全选</span>
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  }
};
</script>

<style scoped>
.bottom-bar {
  height: 40px;
  display: fixed;
  left: 0;
  right: 0;
  bottom: 49px;
  background-color: yellow;
}
</style>
