<template>
  <div class="message-list" v-if="messageItem.length!==0">
    <div class="message-item" v-for="(item,index) in messageItem" :key="index">
      <div class="icon">
        <img :src="iconURL(item)" />
      </div>
      <div class="message">{{item.info}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MessageList",
  props: {
    messageItem: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    iconURL(item) {
      return require("assets/img/profile/" + item.icon);
    }
  }
};
</script>

<style scoped>
.message-list {
  border-top: 18px solid #eee;
}

.message-item {
  display: flex;
  padding-left: 10px;
}

.message-item .icon {
  margin-right: 5px;
  display: flex;
  align-items: center;
}

.message-item .icon img {
  width: 25px;
}

.message-item .message {
  border-top: 1px solid #eee;
  flex: 1;
  padding: 12px 4px;
  font-size: 14px;
}

.message-item:first-of-type .message {
  border: none;
}
</style>
