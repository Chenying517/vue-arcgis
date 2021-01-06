<template>
  <div class="home" id="grcgistView"></div>
</template>
<script >
import { loadModules } from "esri-loader";
import FeatureLayer from "./json/featureLayer.json";
export default {
  data() {
    return {};
  },
  mounted() {
    this.createView();
  },
  methods: {
    //创建视图
    createView() {
      const options = {
        url: "https://js.arcgis.com/4.15/",
        css: "https://js.arcgis.com/4.15/esri/themes/light/main.css",
        // url: "http://10.0.102.22/arcgisapi/dojo/dojo.js",
        // css: "http://10.0.102.22/arcgisapi/esri/themes/light/main.css",
      };

      loadModules(
        [
          "esri/Map",
          "esri/views/MapView",
          "esri/layers/WebTileLayer",
          "esri/layers/FeatureLayer",
        ],
        options
      ).then(([Map, MapView, WebTileLayer, FeatureLayer]) => {
        // 实例化天地图层
        const titlelayer = new WebTileLayer({
          urlTemplate:
            "http://{subDomain}.tianditu.gov.cn/DataServer?T=vec_w&x={col}&y={row}&l={level}&tk=2444cd1f9f915235de07229b8d1b2d62",
          subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
        });
        // 天地图层标注层
        const titlelayerPoint = new WebTileLayer({
          urlTemplate:
            "http://{subDomain}.tianditu.gov.cn/DataServer?T=cva_w&x={col}&y={row}&l={level}&tk=2444cd1f9f915235de07229b8d1b2d62",
          subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
        });
        const featureLayer = new FeatureLayer({
          id: "00",
          title: "编辑区域",
          url:
            "http://36.101.208.132:6080/arcgis/rest/services/df/dfbianjie/MapServer/0",
          opacity: 0.6,
          outFields: ["*"],
        });

        const map = new Map({
          basemap: { baseLayers: [titlelayer, titlelayerPoint] },
        });

        new MapView({
          container: "grcgistView", // Reference to the DOM node that will contain the view
          map: map, // References the map object created in step 3
          zoom: 10, // 基于详情放大的倍数
          center: [108.718158, 19.03789], // 设置中心点：经纬度
        });
        map.add(featureLayer);
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
