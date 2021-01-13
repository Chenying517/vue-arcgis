const layerBaseUrl = 'http://36.101.208.132:6080/arcgis/rest/services'
const data = [
  {
    title: '工作底图',
    key: '0',
    showInfo: true,
    displayContent: false,
    children: [
      {
        title: '陆域行政边界',
        key: '01',
        mapLayer: layerBaseUrl + '/df/dfditu/MapServer/4',
        displayContent: false,
        isLeaf: true
      },
      {
        title: '政府驻地',
        key: '02',
        mapLayer: layerBaseUrl + '/df/dfditu/MapServer/0',
        displayContent: false,
        isLeaf: true
      },
      {
        title: '河流水系',
        key: '03',
        displayContent: false,
        isLeaf: true,
        children: [
          {
            title: '主要河流',
            key: '030',
            mapLayer: layerBaseUrl + '/df/dfditu/MapServer/1',
            displayContent: false,
          },
          {
            title: '主要水库',
            key: '031',
            mapLayer: layerBaseUrl + '/df/dfditu/MapServer/5',
            displayContent: false,
          }
        ]
      },
      {
        title: '海域边界',
        key: '04',
        mapLayer: layerBaseUrl + '/df/dfditu/MapServer/3',
        displayContent: false,
        isLeaf: true
      },
      {
        title: '道路交通',
        key: '05',
        mapLayer: layerBaseUrl + '/df/dfditu/MapServer/2',
        displayContent: false,
        isLeaf: true
      }
    ]
  },
  {
    title: '生态空间',
    key: '1',
    showInfo: true,
    displayContent: true,
    tabTitle: '生态空间',
    children: [
      {
        title: '生态保护红线',
        key: '10',
        showInfo: false,
        mapLayer: layerBaseUrl + '/df/dfshengtaikongjian/MapServer/0',
        displayContent: true,
        tabTitle: '生态保护红线',
        isLeaf: true
      },
      {
        title: '一般生态空间',
        key: '11',
        showInfo: false,
        mapLayer: layerBaseUrl + '/df/dfshengtaikongjian/MapServer/1',
        displayContent: true,
        tabTitle: '一般生态空间',
        isLeaf: true
      }
    ]
  },
  {
    title: '环境质量底线',
    key: '2',
    children: [
      {
        title: '水环境',
        key: '20',
        showInfo: true,
        displayContent: true,
        tabTitle: '水环境质量底线',
        children: [
          {
            title: '优先保护区',
            key: '200',
            mapLayer: layerBaseUrl + '/df/dfshuihuanjingdixian/MapServer/0',
            displayContent: true,
            tabTitle: '水环境优先保护区',
            isLeaf: true
          },
          {
            title: '重点管控区',
            key: '201',
            children: [
              {
                title: '水环境城镇生活重点管控区',
                key: '2010',
                mapLayer: layerBaseUrl + '/df/dfshuihuanjingdixian/MapServer/1',
                displayContent: true,
                tabTitle: '水环境城镇生活重点管控区',
                isLeaf: true
              },
              {
                title: '水环境工业污染重点管控区',
                key: '2011',
                mapLayer: layerBaseUrl + '/df/dfshuihuanjingdixian/MapServer/2',
                displayContent: true,
                tabTitle: '水环境工业污染重点管控区',
                isLeaf: true
              },
              {
                title: '水环境农业污染重点管控区',
                key: '2012',
                mapLayer: layerBaseUrl + '/df/dfshuihuanjingdixian/MapServer/3',
                displayContent: true,
                tabTitle: '水环境农业污染重点管控区',
                isLeaf: true
              },
              /*{
                title: '水环境农村生活重点管控区',
                key: '2013',
                mapLayer: layerBaseUrl + '/baiyangdianshuidixian/MapServer/2',
                displayContent: true,
                tabTitle: '水环境农村生活重点管控区', 
                isLeaf: true
              }*/
            ]
          },
          {
            title: '一般管控区',
            key: '202',
            mapLayer: layerBaseUrl + '/df/dfshuihuanjingdixian/MapServer/4',
            displayContent: true,
            tabTitle: '水环境一般管控区',
            isLeaf: true
          }
        ]
      },
      {
        title: '大气环境',
        showInfo: true,
        displayContent: true,
        tabTitle: '大气环境质量底线',
        key: '21',
        children: [
          {
            title: '优先保护区',
            key: '210',
            displayContent: true,
            tabTitle: '大气环境优先保护区',
            mapLayer: layerBaseUrl + '/df/dfdaqihuanjingdixian/MapServer/4',
            isLeaf: true
          },
          {
            title: '重点管控区',
            key: '211',
            children: [
              {
                title: '大气环境高排放重点管控区',
                key: '2110',
                mapLayer: layerBaseUrl + '/df/dfdaqihuanjingdixian/MapServer/1',
                displayContent: true,
                tabTitle: '大气环境高排放重点管控区',
                isLeaf: true
              }, {
                title: '大气环境弱扩散重点管控区',
                key: '2111',
                mapLayer: layerBaseUrl + '/df/dfdaqihuanjingdixian/MapServer/3',
                displayContent: true,
                tabTitle: '大气环境弱扩散重点管控区',
                isLeaf: true
              }, {
                title: '大气环境受体敏感重点管控区',
                key: '2112',
                mapLayer: layerBaseUrl + '/df/dfdaqihuanjingdixian/MapServer/2',
                displayContent: true,
                tabTitle: '大气环境受体敏感重点管控区',
                isLeaf: true
              }
            ]
          },
          {
            title: '一般管控区',
            key: '212',
            mapLayer: layerBaseUrl + '/df/dfdaqihuanjingdixian/MapServer/0',
            displayContent: true,
            tabTitle: '大气环境一般管控区',
            isLeaf: true
          }
        ]
      },
      {
        title: '土壤环境',
        showInfo: true,
        displayContent: true,
        tabTitle: '土壤环境质量底线',
        key: '22',
        children: [
          {
            title: '农用地优先保护区',
            key: '220',
            displayContent: true,
            tabTitle: '农用地优先保护区',
            mapLayer: layerBaseUrl + '/df/dfturangdixian/MapServer/3',
            isLeaf: true
          },
          {
            title: '重点管控区',
            key: '221',
            children: [
              /*{
                title: '大气环境布局敏感重点管控区',
                key: '2110',
                mapLayer: layerBaseUrl + '/baiyangdiandaqidixian/MapServer/4',
                displayContent: true,
                tabTitle: '大气环境布局敏感重点管控区',
                isLeaf: true
              },*/ {
                title: '农用地污染风险重点管控区',
                key: '2210',
                mapLayer: layerBaseUrl + '/df/dfturangdixian/MapServer/0',
                displayContent: true,
                tabTitle: '农用地污染风险重点管控区',
                isLeaf: true
              }, {
                title: '建设用地污染风险重点管控区',
                key: '2211',
                mapLayer: layerBaseUrl + '/df/dfturangdixian/MapServer/1',
                displayContent: true,
                tabTitle: '建设用地污染风险重点管控区',
                isLeaf: true
              }
            ]
          },
          {
            title: '一般管控区',
            key: '222',
            mapLayer: layerBaseUrl + '/df/dfturangdixian/MapServer/2',
            displayContent: true,
            tabTitle: '土壤环境一般管控区',
            isLeaf: true
          }
        ]
      },
      {
        title: '近岸海域环境',
        showInfo: true,
        displayContent: true,
        tabTitle: '近岸海域环境质量底线',
        key: '23',
        children: [
          {
            title: '优先保护区',
            key: '230',
            displayContent: true,
            tabTitle: '近岸海域环境优先保护区',
            mapLayer: layerBaseUrl + '/df/dfjinhaiandixian/MapServer/2',
            isLeaf: true
          },
          {
            title: '重点管控区',
            key: '231',
            displayContent: true,
            tabTitle: '近岸海域环境重点区',
            mapLayer: layerBaseUrl + '/df/dfjinhaiandixian/MapServer/1',
            isLeaf: true
          },
          {
            title: '一般管控区',
            key: '232',
            mapLayer: layerBaseUrl + '/df/dfjinhaiandixian/MapServer/0',
            displayContent: true,
            tabTitle: '近岸海域环境一般管控区',
            isLeaf: true
          }
        ]
      }
    ]
  }, {
    title: '资源利用上线',
    key: '3',
    children: [
      {
        title: '水资源',
        key: '30',
        showInfo: true,
        displayContent: true,
        tabTitle: '水资源利用上线',
        children: [
          {
            title: '生态用水补给区',
            key: '300',
            mapLayer: layerBaseUrl + '/df/dfziyuanliyongshangxian/MapServer/4',
            displayContent: true,
            tabTitle: '生态用水补给区',
            isLeaf: true
          }
        ]
      },
      {
        title: '土地资源',
        key: '31',
        showInfo: true,
        displayContent: true,
        tabTitle: '土地资源利用上线',
        children: [
          {
            title: '土地资源重点管控区',
            key: '310',
            mapLayer: layerBaseUrl + '/df/dfziyuanliyongshangxian/MapServer/3',
            displayContent: true,
            tabTitle: '土地资源重点管控区',
            isLeaf: true
          }
        ]
      },
      {
        title: '能源',
        showInfo: true,
        displayContent: true,
        tabTitle: '能源利用上线',
        key: '32',
        children: [
          {
            title: '高污染燃料禁燃区',
            key: '320',
            mapLayer: layerBaseUrl + '/df/dfziyuanliyongshangxian/MapServer/2',
            displayContent: true,
            tabTitle: '高污染燃料禁燃区',
            isLeaf: true
          }
        ]
      },
      {
        title: '岸线资源',
        key: '33',
        showInfo: true,
        displayContent: true,
        tabTitle: '岸线资源利用上线',
        children: [
          {
            title: '优先保护区',
            key: '330',
            mapLayer: layerBaseUrl + '/df/dfziyuanliyongshangxian/MapServer/1',
            displayContent: true,
            tabTitle: '岸线资源优先保护区',
            isLeaf: true
          },
          {
            title: '重点管控区',
            key: '331',
            mapLayer: layerBaseUrl + '/df/dfziyuanliyongshangxian/MapServer/0',
            displayContent: true,
            tabTitle: '岸线资源重点管控区',
            isLeaf: true
          },
          {
            title: '一般管控区',
            key: '332',
            mapLayer: null,
            displayContent: true,
            tabTitle: '岸线资源一般管控区',
            isLeaf: true
          }
        ]
      }
    ]
  },
  {
    title: '环境管控单元与准入清单',
    showInfo: true,
    key: '4',
    displayContent: true,
    tabTitle: '环境管控单元与准入清单',
    children: [

      {
        title: '陆域管控单元',
        key: '40',
        mapLayer: layerBaseUrl + '/df/dfguankongdanyuan8/MapServer/1',
        displayContent: true,
        tabTitle: '环境管控单元与准入清单',
        isLeaf: true
      },
      {
        title: '海域管控单元',
        key: '41',
        mapLayer: layerBaseUrl + '/df/dfguankongdanyuan8/MapServer/0',
        displayContent: true,
        tabTitle: '环境管控单元与准入清单',
        isLeaf: true
      }
    ]
  }
]
export default data