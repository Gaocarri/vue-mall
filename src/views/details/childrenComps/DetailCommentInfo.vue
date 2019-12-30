<template>
  <div v-if="Object.keys(commentInfo).length!==0" class="comment-info">
    <div class="info-header">
      <div class="header-title">用户评价</div>
      <div class="header-more">更多</div>
    </div>

    <div class="info-user">
      <img :src="commentInfo.user.avatar" />
      <span>{{commentInfo.user.uname}}</span>
    </div>

    <div class="info-detail">
      <p>{{commentInfo.content}}</p>
      <div class="info-other">
        <span class="date">{{commentInfo.created | showDate}}</span>
        <span>{{commentInfo.style}}</span>
      </div>

      <div class="info-imgs">
        <img :src="item" v-for="(item,index) in commentInfo.images" :key="index" />
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "common/utils";

export default {
  name: "DetailCommentInfo",
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  filters: {
    showDate(value) {
      // 1.将时间戳转成date对象
      const date = new Date(value * 1000);
      // 2.将data进行格式化,调用函数
      return formatDate(date, "yyyy/MM/dd");
    }
  }
};
</script>

<style scoped>
.comment-info {
  padding-bottom: 20px;
  border-bottom: 5px solid #f2f5f8;
}

.info-header {
  display: flex;
  justify-content: space-between;
  margin: 20px 10px 10px 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(100, 100, 100, 0.2);
}

.info-header .header-title {
  font-size: 16px;
}

.info-header .header-more {
  font-size: 14px;
}

.info-user {
  margin-bottom: 10px;
  margin-left: 10px;
}

.info-user img {
  border-radius: 50%;
  width: 50px;
  vertical-align: middle;
  margin-right: 14px;
}

.info-user span {
  font-size: 16px;
}

.info-detail {
  padding: 0 10px 0 0;
  margin: 0 15px 0 12px;
}

.info-detail p {
  color: #777;
  font-size: 14px;
  margin-bottom: 10px;
  line-height: 1.5;
}

.info-detail .info-other {
  color: #999;
  font-size: 12px;
}

.info-detail .info-other .date {
  margin-right: 10px;
}

.info-imgs {
  display: flex;
  margin-top: 10px;
  margin-bottom: 20px;
}

.info-imgs img {
  width: 80px;
  height: 80px;
  margin-right: 6px;
}
</style>
