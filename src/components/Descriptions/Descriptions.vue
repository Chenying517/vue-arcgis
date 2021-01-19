<template>
  <div class="cy-description">
    <div v-for="item in data" :key="item.id" class="item-des">
      <span class="des-title">{{ item.title }}</span>
      <span class="des-value">{{ item.value }}</span>
    </div>
  </div>
</template>

<script>
import DesItem from "./Descriptions-item.vue";
export default {
  name: "Descriptions",
  props: {
    data: {},
  },
  components: {
    "des-item": DesItem,
  },
};
</script>

<style lang="scss" scoped>
.cy-description {
  text-align: left;
  overflow: hidden;
  line-height: 30px;
}
.item-des {
  width: 50%;
  float: left;
}
.des-title,
.des-value {
  width: 50%;
  background: #f2f6fc;
  text-align: center;
  border: 1px solid #ebeef5;
  box-sizing: border-box;
  margin-left: -1px;
  margin-top: -1px;
  float: left;
}
.des-value {
  background: #fff;
}
</style>