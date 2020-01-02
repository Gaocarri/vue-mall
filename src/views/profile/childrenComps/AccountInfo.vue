<template>
  <div class="account-info">
    <div class="balance">
      <div class="info-head">
        <span class="number">0.00</span>元
      </div>
      <span>我的余额</span>
    </div>

    <div class="discount">
      <div class="info-head">
        <span class="number">0</span>个
      </div>
      <span>我的优惠</span>
    </div>

    <div class="integral">
      <div class="info-head">
        <span class="number">0</span>分
      </div>
      <span>我的积分</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "AccountInfo"
};
</script>

<style scoped>
.account-info {
  display: flex;
  text-align: center;
  font-size: 14px;
}

.number {
  font-size: 22px;
  color: orangered;
  font-weight: 700;
}

.info-head {
  margin-bottom: 4px;
}

.account-info > div {
  flex: 1;
  padding: 30px 0;
}

.discount {
  border-left: 1px solid rgba(100, 100, 100, 0.2);
  border-right: 1px solid rgba(100, 100, 100, 0.2);
}
</style>
