<template>
  <div>
    <div id="tab-bar">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBar"
};
</script>

<style scoped>
#tab-bar {
  display: flex;
  background-color: #f6f6f6;
  /* 固定在下方，并占据整个屏幕 */
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  /* 边框阴影 */
  box-shadow: 0px -1px 1px rgba(100, 100, 100, 0.1);
  z-index: 9999;
}
</style>
