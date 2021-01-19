<template>
  <div class="home">
    <div class="menu">
      <el-tree
        :data="mapmenu"
        :props="{ label: 'mapLayer' }"
        show-checkbox
        ref="treeMenu"
        @check="_handleCheckChange"
      >
        <span class="tree-node" slot-scope="{ data }">
          <span>{{ data.title }}</span>
        </span>
      </el-tree>

      <div class="contro">
        <a
          @click.stop="_handleMap('point')"
          :class="{ active: mapToolValue.point.tag }"
          >点选</a
        >
        <a
          @click.stop="_handleMap('ranging')"
          :class="{ active: mapToolValue.ranging.tag }"
          >测距</a
        >
        <a @click.stop="_handleMap('fullScreen')" class="a-fullscreen">全屏</a>
      </div>
    </div>
    <div class="gis-map">
      <gis-map
        :clickToolValue="mapToolValue"
        :featureLayer="checkTreeNode"
      ></gis-map>
    </div>
  </div>
</template>
<script >
import GisMap from "@/views/map/map.vue";
import MapMenu from "@/assets/data/mapMenu.js";

export default {
  components: {
    "gis-map": GisMap,
  },
  data() {
    return {
      mapmenu: MapMenu,
      checkTreeNode: [],
      flatCheckTreeNode: [],
      mapToolValue: {
        point: {
          value: "point",
          tag: true,
        },
        ranging: {
          value: "ranging",
          tag: false,
        },
        fullScreen: {
          value: "fullScreen",
          tag: false,
        },
      },
    };
  },

  methods: {
    // 点击事件：点选、测距、全屏
    _handleMap(type) {
      switch (type) {
        case "point": // 点选
          this.mapToolValue.ranging.tag = false;
          this.mapToolValue.point.tag = !this.mapToolValue.point.tag;
          break;
        case "ranging": // 测距
          this.mapToolValue.point.tag = false;
          this.mapToolValue.ranging.tag = !this.mapToolValue.ranging.tag;
          break;
        case "fullScreen": // 全屏
          this.mapToolValue.fullScreen.tag = !this.mapToolValue.fullScreen.tag;
          break;
      }
    },
    // 点击事件：树组件被点击
    _handleCheckChange(node, data) {
      this.checkTreeNode = [];
      this.checkTreeNode = this.$refs.treeMenu.getCheckedNodes(false, true);
    },
  },
};
</script>
<style lang="scss">
.gis-map {
  position: absolute;
  height: 100%;
  width: 100%;
}
.menu {
  width: 250px;
  height: auto;
  position: absolute;
  left: 10px;
  top: 10px;
  background: #fff;
  z-index: 10;
  padding: 20px 10px;
}
.contro {
  position: absolute;
  top: 10px;
  left: 300px;
  width: max-content;
  background: #fff;
  height: 30px;
  line-height: 30px;
  a {
    display: inline-block;
    padding: 0 20px;
    cursor: pointer;
    &.active {
      color: rgb(24, 144, 255);
    }
  }
}
.a-fullscreen:hover {
  color: rgb(24, 144, 255);
}
</style>
