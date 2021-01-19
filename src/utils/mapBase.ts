import { loadModules } from "esri-loader";

export class ArcgisServe {

  // 地图配置项
  options = {
    url: "https://js.arcgis.com/4.15/",
    css: "https://js.arcgis.com/4.15/esri/themes/light/main.css",
    // url: "http://10.0.102.22/arcgisapi/dojo/dojo.js",
    // css: "http://10.0.102.22/arcgisapi/esri/themes/light/main.css",
  };

  // 初始化：基础地图
  async createMapView(data: any) {
    // 检查：初始化数据是否完整
    if (!this.checkOPtion(data)) return
    const mapOption = data || []
    let map, view;
    // 地图：初始化方法
    await loadModules(
      [
        "esri/Map",
        "esri/views/MapView",
        "esri/layers/WebTileLayer",
        "esri/layers/FeatureLayer",
        "esri/widgets/Zoom", // 缩放
        "esri/widgets/ScaleBar", //  比例尺
      ],
      this.options
    ).then(([Map, MapView, WebTileLayer, FeatureLayer, Zoom, ScaleBar]) => {
      // 实例化:天地图层
      const titlelayer = new WebTileLayer({
        urlTemplate:
          "http://{subDomain}.tianditu.gov.cn/DataServer?T=vec_w&x={col}&y={row}&l={level}&tk=2444cd1f9f915235de07229b8d1b2d62",
        subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
      });
      // 实例化：天地图层标注层
      const titlelayerPoint = new WebTileLayer({
        urlTemplate:
          "http://{subDomain}.tianditu.gov.cn/DataServer?T=cva_w&x={col}&y={row}&l={level}&tk=2444cd1f9f915235de07229b8d1b2d62",
        subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
      });

      // 实例化：可操作图层
      const featureLayer = new FeatureLayer({
        id: "00",
        title: "编辑区域",
        url:
          "http://10.0.102.27:6080/arcgis/rest/services/df/dfbianjie/MapServer/0",
        opacity: 0.6,
        outFields: ["*"],
      });

      // 实例化：地图
      map = new Map({
        basemap: { baseLayers: [titlelayer, titlelayerPoint] },
      });

      // 实例化：地图视图
      view = new MapView({
        container: mapOption.container, // Reference to the DOM node that will contain the view
        center: mapOption.center, // 设置中心点：经纬度
        // center: [108.718158, 19.03789],
        // container: "grcgistView",
        map: map, // References the map object created in step 3
        zoom: 10, // 基于详情放大的倍数
        constraints: {
          // 设置约束条件
          minZoom: 8, // 最小缩小倍数
        },
      });
      // 实例化：比例尺
      const scaleBar = new ScaleBar({ view, unit: "metric" });

      // 添加实例到view Map
      view.ui.add([
        {
          component: scaleBar,
          position: "bottom-right",
          index: 0,
        },
      ]);

      map.add(featureLayer);
    });
    return { 'map': map, 'mapView': view };
  }

  // 绘制：点
  async createPoint() {

  }

  /** 绘制：图形符号样式
  * 
  * @param geometry 
  */
  async creatSymbol(geometry: any) {
    const [Graphic, SimpleLineSymbol] = await loadModules(['esri/Graphic', 'esri/symbols/SimpleLineSymbol']);
    const symbol = new SimpleLineSymbol();
    symbol.color = '#ffff00';
    symbol.width = 2;

    let polygonGraphic = new Graphic({
      geometry,
      symbol
    });
    return polygonGraphic;
  }

  /** 绘制：特征图层
  * 
  * @param map 地图
  * @param option <object> 图层配置项 必填属性为url:string-特征图层链接，非必填属性为：title:string-图层标题、id:string-图层id
  */
  async createFeatureLayer(map: any, option: any) {
    let [FeatureLayer] = await loadModules(["esri/layers/FeatureLayer"])
    const featureLayer = new FeatureLayer({
      id: option.id,
      title: option.title || option.id,
      url: option.url,
      outFields: ['*'],
      opacity: option.opacity || 0.5

    })
    map.add(featureLayer)
    return featureLayer
  }

  // 测量：距离
  async distanceMeasurement(mapView: any) {
    let [DistanceMSMT] = await loadModules(['esri/widgets/DistanceMeasurement2D'])
    let distanceMsmt = new DistanceMSMT({
      view: mapView
    })
    distanceMsmt.viewModel.newMeasurement()
    mapView.ui.add(distanceMsmt, 'top-right')
    mapView.focus()
    return distanceMsmt
  }

  /** 清除：测量距离组件
   * 
   * @param mapView 
   * @param distanceMeasurement 将要清除的组件实例
   */
  async clearDistanceMeasurement(mapView: any, distanceMeasurement: any) {
    mapView.ui.remove(distanceMeasurement)
    distanceMeasurement.destroy()
    distanceMeasurement = null
    return true
  }

  // 数据判断：初始化数据
  checkOPtion(checkdata: any) {
    if (!checkdata.center) return false
    else if (!checkdata.container) return false
    else return true
  }


}