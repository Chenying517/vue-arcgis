<template>
  <div class="gismap" id="grcgistView"></div>
</template>
<script >
import { loadModules } from "esri-loader";
import { ArcgisServe } from "@/utils/mapBase.ts";
import FeatureLayer from "../json/featureLayer.json";
let mapDistanceMesurement = null; // 地图：测量组件
export default {
  name: "gismap",
  data() {
    return {
      arcgis: new ArcgisServe(),
      map: null, // 地图实例
      mapView: null, // 地图视图
      mapLayer: [], // 地图：层
      toolBtnStatus: 1, // 地图点击事件标识：1：点选 ；2：测距
    };
  },
  props: {
    clickToolValue: {
      // 工具条
      type: Object,
      required: false,
    },
    featureLayer: {
      // 特征图层
      type: Array,
      required: false,
    },
  },
  watch: {
    clickToolValue: {
      handler: function (newValue) {
        var keys = Object.keys(newValue);
        for (let i = 0; i < keys.length; i++) {
          this.handleTool(newValue[keys[i]]);
        }
      },
      deep: true,
    },
    featureLayer: {
      handler: function () {
        this.addFeatureLayer();
      },
    },
  },
  mounted() {
    this.createView();
  },
  methods: {
    // 点击事件：地图
    _mapViewClickEvent() {
      this.mapView.on("click", (event) => {
        this.mapView.graphics.removeAll();
        this.mapView.hitTest(event).then(async (res) => {
          // 样式：添加地图高亮
          if (res.results && res.results.length > 0) {
            const test = await this.arcgis.creatSymbol(
              res.results[0].graphic.geometry
            );
            this.toolBtnStatus == 1 ? this.mapView.graphics.add(test) : "";
          } else {
            this.$message({
              type: "warning",
              message: "当前暂无管控单元",
            });
          }
        });
      });
    },
    //初始化:地图
    async createView() {
      const arcgisMap = await this.arcgis.createMapView({
        center: [108.718158, 19.03789],
        container: "grcgistView",
      });
      this.map = arcgisMap.map;
      this.mapView = arcgisMap.mapView;
      this._mapViewClickEvent();
    },
    // 绘制:特殊图层
    async addFeatureLayer() {
      this.mapLayer.map((item) => {
        item.visible = false;
      });
      this.featureLayer.forEach(async (item) => {
        // 如果没有加载过该图层：加载图层；加载过该图层：设置该图层的visible=true
        let flId = this.map.findLayerById(item.key);
        if (flId == undefined) {
          let option = {
            id: item.key,
            title: item.title,
            url: item.mapLayer,
          };
          let featurelayer = await this.arcgis.createFeatureLayer(
            this.map,
            option
          );
          this.mapLayer.push(featurelayer);
        } else {
          flId.visible = true;
        }
      });
    },
    // 事件处理：点选、测距、全图
    async handleTool(param) {
      switch (param.value) {
        case "point":
          if (param.tag == true) this.toolBtnStatus = 1;
          break;
        case "ranging":
          if (param.tag == true) {
            if (!mapDistanceMesurement) {
              this.toolBtnStatus = 2;
              mapDistanceMesurement = await this.arcgis.distanceMeasurement(
                this.mapView
              );
            }
          } else {
            if (mapDistanceMesurement) {
              let tag = await this.arcgis.clearDistanceMeasurement(
                this.mapView,
                mapDistanceMesurement
              );
              tag == true ? (mapDistanceMesurement = null) : "";
            }
          }
          break;
        case "fullScreen":
          this.mapView.center = [108.718158, 19.03789];
          this.mapView.zoom = 10;
          break;
      }
    },
  },
};
</script>
<style lang="scss">
#grcgistView {
  position: absolute;
  height: 100%;
  width: 100%;
}
</style>
