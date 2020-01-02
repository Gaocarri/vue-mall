<template>
  <div class="user-info">
    <img class="avatar" src="~assets/img/profile/avatar.svg" />

    <div class="info">
      <div class="login">登录/注册</div>
      <div class="mobile">
        <img src="~assets/img/profile/phone.svg" />
        <span>暂无绑定手机号</span>
      </div>
    </div>

    <img class="arrow" src="~assets/img/common/arrow-left.svg" />
  </div>
</template>

<script>
export default {
  name: "UserInfo"
};
</script>

<style scoped>
.user-info {
  display: flex;
  align-items: center;
  background-color: var(--color-tint);
  padding: 10px;
  position: relative;
}

.avatar {
  width: 70px;
  height: 70px;
  vertical-align: middle;
}

.info {
  margin-left: 14px;
  color: #fff;
}

.info .login {
  margin-bottom: 5px;
}

.info .mobile {
  font-size: 14px;
}

.info .mobile img {
  width: 20px;
  height: 20px;
  vertical-align: middle;
  margin-left: -5px;
}

.arrow {
  width: 20px;
  height: 20px;
  position: absolute;
  right: 15px;
}
</style>
