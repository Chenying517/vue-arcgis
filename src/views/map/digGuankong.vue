<template>
  <div>
    <el-tabs v-model="tabActiveName" type="card">
      <el-tab-pane
        v-for="(item, index) in data"
        :key="index"
        :label="item.control_name"
        :name="index.toString()"
      >
        <h3>{{ item.control_name }}</h3>
        <div class="detailInfoDiv">
          <description :data="descriptionDetail[index]"></description>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Description from "@/components/Descriptions/Descriptions.vue";
export default {
  name: "DigGuankong",
  props: {
    data: {},
  },
  components: {
    description: Description,
  },
  data() {
    return {
      tabActiveName: "0",
      descriptionDetail: [], // 描述信息
    };
  },
  mounted() {
    // 数据处理
    this.formatData();
  },
  methods: {
    // 数据处理
    formatData() {
      console.log(this.data);
      this.data.map((item) => {
        let itemDeail = [];
        let keys = Object.keys(item);
        for (let i in keys) {
          itemDeail.push({ title: keys[i], value: item[keys[i]] });
        }
        this.descriptionDetail.push(itemDeail);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>