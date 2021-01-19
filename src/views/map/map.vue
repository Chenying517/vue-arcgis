<template>
  <div>
    <div class="gismap" id="grcgistView"></div>
    <el-dialog title="环境管控单元信息总览" :visible="digGuankong" width="80%">
      <dig-guangkong></dig-guangkong>
      <span slot="footer" class="dialog-footer">
        <el-button @click="digGuankong = false">取 消</el-button>
        <el-button type="primary" @click="digGuankong = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="管控单元详情信息"
      :visible="digUnitLayer"
      width="80%"
      v-if="digUnitLayer"
    >
      <dig-guangkong :data="unitLayerDetail"></dig-guangkong>
      <span slot="footer" class="dialog-footer">
        <el-button @click="digUnitLayer = false">取 消</el-button>
        <el-button type="primary" @click="digUnitLayer = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script >
import { loadModules } from "esri-loader";
import { ArcgisServe } from "@/utils/mapBase.ts";
import FeatureLayer from "../json/featureLayer.json";
import DigGuankong from "./digGuankong.vue";
let mapDistanceMesurement = null; // 地图：测量组件
export default {
  name: "gismap",
  components: {
    "dig-guangkong": DigGuankong,
  },
  data() {
    return {
      arcgis: new ArcgisServe(),
      flatcheckedNode: [],
      map: null, // 地图实例
      mapView: null, // 地图视图
      mapLayer: [], // 地图：层
      toolBtnStatus: 1, // 地图点击事件标识：1：点选 ；2：测距
      digGuankong: false, // 环境管控单元信息总览出框
      unitLayerDetail: [], // 管控单元详情信息
      digUnitLayer: false, // 管控单元详情信息弹出框
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
      // 工具类
      handler: function (newValue) {
        var keys = Object.keys(newValue);
        for (let i = 0; i < keys.length; i++) {
          this.handleTool(newValue[keys[i]]);
        }
      },
      deep: true,
    },
    featureLayer: {
      // 原始树组件数组->扁平化处理
      handler: function (newdata) {
        this.flatCheckNode(newdata);
      },
      deep: true,
    },
    flatcheckedNode: {
      // 扁平化处理过的数组->加载特殊图层
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
          if (res.results && res.results.length > 0) {
            this.dealMapLayerDataToUnitDetail(res.results);
            if (this.toolBtnStatus == 1) {
              // 样式：添加地图高亮
              const test = await this.arcgis.creatSymbol(
                res.results[0].graphic.geometry
              );
              this.toolBtnStatus == 1 ? this.mapView.graphics.add(test) : "";
              // 显示当前图层详细信息
            } else {
              this.$message({
                type: "warning",
                message: "当前暂无管控单元",
              });
            }
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
    // 渲染页面：渲染管控单元详细信息
    dealMapLayerDataToUnitDetail(res) {
      const domains = [];
      res.forEach((g) => {
        let domain = g.graphic.attributes;
        if (g.graphic.layer) {
          domain.layerId = g.graphic.layer.id;
          if (domain.layerId === "41") {
            domain.HJGKDYBM = domain.HJYSGKFQBM;
          }
          if (domain.HJYSGKFQMC || domain.HJGKDYBM) {
            domain.control_name = domain.HJYSGKFQMC;
            domains.push(domain);
          }
        }
      });
      this.unitLayerDetail = domains;
      this.digUnitLayer = true;
    },
    // 绘制:特殊图层
    async addFeatureLayer() {
      this.mapLayer.map((item) => {
        item.visible = false;
      });
      this.flatcheckedNode.forEach(async (item) => {
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
      this.grawguankongyaoqiu();
    },

    // 页面渲染,渲染管控要求，根据特殊图层数据，渲染弹出层信息
    grawguankongyaoqiu() {
      // this.digGuankong = true;
      // console.log(this.mapLayer);
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
    // 数据处理：扁平化数据
    flatCheckNode() {
      let that = this;
      this.flatcheckedNode = [];
      this.featureLayer.forEach((item) => {
        if (item.mapLayer) {
          that.flatcheckedNode.push(item);
        }
      });
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
