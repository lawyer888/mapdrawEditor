<template>
  <div>
    <div class="bm-box">
      <div class="bm-view">
        <div class="btn-back">
          <el-button
            @click="createMap()"
            class="el-btn-back"
            type="danger"
            size="large"
          >
            <span>新建</span>
          </el-button>
          <el-button
            @click="saveMap()"
            class="el-btn-back"
            type="danger"
            size="large"
          >
            <span>保存</span>
          </el-button>
          <el-button
            @click="previewMap()"
            class="el-btn-back"
            type="danger"
            size="large"
          >
            <span>预览</span>
          </el-button>
          <el-button
            @click="undoLastAction()"
            class="el-btn-back"
            type="danger"
            size="large"
          >
            <span>回撤</span>
          </el-button>
          <el-button
            @click="clearMap()"
            class="el-btn-back"
            type="danger"
            size="large"
          >
            <span>清空</span>
          </el-button>
          <el-button
            @click="commomSet()"
            class="el-btn-back"
            type="danger"
            size="large"
          >
            <span>设置</span>
          </el-button>
          <el-button
            @click="updatePaint()"
            class="el-btn-back"
            type="danger"
            size="large"
          >
            <span>刷新</span>
          </el-button>
          <el-button class="el-btn-back" type="danger" size="large">
            <span>连接测试</span>
          </el-button>
        </div>
        <div class="options_overflow">
          <div class="textbox">
            <span>可选图标:</span>
          </div>
          <div class="imgbox" @click="handleClick">
            <img
              src="@/assets/icons/point.png"
              @click="handleIconClick($event)"
            />
            <img
              src="@/assets/icons/poin.png"
              @click="handleIconClick($event)"
            />
            <img
              src="@/assets/icons/shuibang.png"
              @click="handleIconClick($event)"
            />
          </div>
        </div>
        <div id="bm-view" class="bm-view">
          <div class="dataPanelView">
            <div class="dataPanel">
              <div class="header">
                <div v-if="isDragPanel === 0" class="elestation">
                  <span>节点属性：</span>
                  <br />
                  <div>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <el-input
                      v-model="selectedName"
                      style="width: 150px; height: 25px"
                      type="text"
                      placeholder="请输入节点的名称"
                    ></el-input>
                    &nbsp;
                    <el-button type="primary" size="small" @click="fetchPoint">
                      查找
                    </el-button>
                    <br />
                    <div>
                      <br />
                      <span>名称: {{ selectedPoint.name1 }}</span>
                      <br />
                      <span>
                        坐标: X:{{ selectedPoint.location1[0] }},Y:{{
                          selectedPoint.location1[1]
                        }}
                      </span>
                      <br />
                      <span>线名: {{ selectedPoint.linename1 }}</span>
                      <br />
                      <span>距离: {{ selectedPoint.distance1 }}</span>
                      <br />
                      <span>X:</span>
                      :
                      <el-input
                        v-model="editorPoint1.location[0]"
                        style="width: 100px; height: 25px"
                        type="number"
                      />
                      &nbsp;
                      <span>Y:</span>
                      <el-input
                        v-model="editorPoint1.location[1]"
                        style="width: 100px; height: 25px"
                        type="number"
                      />
                    </div>
                    <div>
                      <span>名称: {{ selectedPoint.name2 }}</span>
                      <br />
                      <span>
                        坐标: X:{{ selectedPoint.location2[0] }},Y:{{
                          selectedPoint.location2[1]
                        }}
                      </span>
                      <br />
                      <span>线名: {{ selectedPoint.linename2 }}</span>
                      <br />
                      <span>距离: {{ selectedPoint.distance2 }}</span>
                      <br />
                      <span>X:</span>
                      <el-input
                        v-model="editorPoint2.location[0]"
                        style="width: 100px; height: 25px"
                        type="number"
                      />
                      &nbsp;
                      <span>Y:</span>
                      <el-input
                        v-model="editorPoint2.location[1]"
                        style="width: 100px; height: 25px"
                        type="number"
                      />
                      <br />
                      <br />
                      <span>间距修正参数：</span>
                      <el-input
                        v-model="feature_space"
                        style="width: 100px; height: 25px"
                        type="number"
                      />
                      <br />
                      <br />
                      <span>调整方向:</span>
                      &nbsp;
                      <el-select
                        v-model="selectedxyOption"
                        class="custom-select"
                        placeholder="请选择"
                      >
                        <el-option
                          v-for="(item, index) in xyoptions"
                          :key="index"
                          :label="item"
                          :value="index"
                        ></el-option>
                      </el-select>
                    </div>
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <el-button
                      type="danger"
                      size="small"
                      @click="saveEditedPoint"
                    >
                      保存
                    </el-button>
                  </div>
                </div>
                <div v-else-if="isDragPanel === 1" class="elestation">
                  <span>节点属性：</span>
                  <br />
                  <div>
                    &nbsp;&nbsp;&nbsp;
                    <br />
                    <div
                      v-for="(point, index) in moveFeaturePoint"
                      :key="index"
                    >
                      <span>类型: {{ point.name }}</span>
                      <br />
                      <span>线名: {{ point.linename }}</span>
                      <br />
                      <span>X:{{ point.location[0] }}</span>
                      &nbsp;
                      <span>Y:{{ point.location[1] }}</span>
                      <br />
                      <br />
                    </div>
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <el-button
                      type="danger"
                      size="small"
                      @click="saveEditedFeature"
                    >
                      保存
                    </el-button>
                  </div>
                </div>
                <div v-else class="elestation">
                  <div class="feature_elebox">
                    <span>当前坐标: {{ currentdrawposition }}</span>
                    <br />
                    <br />
                    &nbsp;&nbsp;
                    <el-button
                      style="margin-left: 20px"
                      type="primary"
                      @click="drawmulLines()"
                    >
                      线段
                    </el-button>
                    &nbsp;&nbsp;
                    <el-button type="primary" @click="featureproduct()">
                      生成
                    </el-button>
                    <br />
                    <br />
                    &nbsp;&nbsp;
                    <el-button
                      style="margin-left: 20px; height: 28px"
                      type="primary"
                      @click="overlayproduct()"
                    >
                      生成图标
                    </el-button>
                    <br />
                    <br />
                    &nbsp;&nbsp;
                    <el-input
                      v-model="segmentProperty.textbox"
                      style="width: 100px; height: 28px; margin-left: 20px"
                      type="text"
                    />
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <el-button type="primary" @click="drawtextbox()">
                      创建文本
                    </el-button>
                    <br />
                    <br />
                    &nbsp;&nbsp;
                    <el-input
                      v-model="segmentProperty.angle"
                      style="width: 100px; height: 28px; margin-left: 20px"
                      type="number"
                    />
                    &nbsp;&nbsp; &nbsp;&nbsp;
                    <el-button type="primary" @click="drawseg()">
                      分割线
                    </el-button>
                    &nbsp;&nbsp;
                    <!--<el-button type="primary" @click="pointproduct()">
											生成
										</el-button>-->
                    <br />
                    <br />
                    <span>节点拖动:</span>
                    &nbsp;&nbsp;
                    <el-switch
                      v-model="editorswitch"
                      active-text="开启"
                      inactive-text="关闭"
                    />
                    <br />
                    <br />
                    <div v-if="isoverlaydatapanel" class="overlaydatabind">
                      <span>节点ID:{{ featureProperty.id }}</span>
                      &nbsp;&nbsp;
                      <span
                        v-show="isdatabind"
                        style="font-size: 12px; color: #ff4d4d"
                      >
                        *已绑定
                      </span>
                      <br />
                      <span>物件名称:</span>
                      <el-input
                        v-model="featureProperty.station_name"
                        style="width: 150px; height: 28px; margin-left: 20px"
                      />
                      <br />
                      <br />
                      <span>字体颜色：</span>
                      <el-input
                        v-model="featureProperty.color"
                        style="width: 150px; height: 28px; margin-left: 20px"
                      />
                      <br />
                      <br />
                      <span>字体偏移量：</span>
                      X:
                      <el-input
                        v-model="featureProperty.offset[0]"
                        style="width: 50px; height: 28px; margin-left: 10px"
                      />
                      Y:
                      <el-input
                        v-model="featureProperty.offset[1]"
                        style="width: 50px; height: 28px; margin-left: 10px"
                      />
                      <br />
                      <br />
                      <span>物件位置:</span>
                      <textarea
                        rows="4"
                        cols="25"
                        v-model="featureProperty.station_position"
                        class="textareabox"
                      ></textarea>
                      <br />
                      <br />
                      <el-button
                        style="margin-left: 38px"
                        type="danger"
                        @click="databind()"
                      >
                        绑定
                      </el-button>
                    </div>
                    <div v-else class="featuredatabind">
                      <span>节点ID:{{ nodeProperty.id }}</span>
                      &nbsp;&nbsp;
                      <span
                        v-show="isdatabind"
                        style="font-size: 12px; color: #ff4d4d"
                      >
                        *已绑定
                      </span>
                      <br />
                      <span>线段名称:</span>
                      <el-input
                        v-model="nodeProperty.linename"
                        style="width: 150px; height: 28px; margin-left: 20px"
                      />
                      <br />
                      <br />
                      <span>线段长度:</span>
                      <el-input
                        v-model="nodeProperty.distance"
                        style="width: 150px; height: 28px; margin-left: 20px"
                      />
                      <br />
                      <br />
                      <span>字体颜色:</span>
                      <el-input
                        v-model="nodeProperty.fontcolor"
                        style="width: 150px; height: 28px; margin-left: 20px"
                      />
                      <br />
                      <br />
                      <span>字体偏移量:</span>
                      X:
                      <el-input
                        v-model="nodeProperty.offset[0]"
                        style="width: 50px; height: 28px; margin-left: 10px"
                      />
                      Y:
                      <el-input
                        v-model="nodeProperty.offset[1]"
                        style="width: 50px; height: 28px; margin-left: 10px"
                      />
                      <br />
                      <br />
                      <span>字体旋转:</span>
                      <el-input
                        v-model="nodeProperty.rotation"
                        style="width: 50px; height: 28px; margin-left: 10px"
                      />
                      <br />
                      <br />
                      <span>RID绑定:</span>
                      <el-input
                        v-model="nodeProperty.RID"
                        style="width: 200px; height: 28px; margin-left: 10px"
                      />
                      <br />
                      <br />
                      <el-button
                        style="margin-left: 38px"
                        type="danger"
                        @click="nodedatabind()"
                      >
                        绑定
                      </el-button>
                    </div>
                  </div>
                </div>
              </div>
              <el-button type="primary" @click="changePanel">
                切换属性面板
              </el-button>
              <br />
              <br />
              <br />
            </div>
            <div class="scrollbarhide"></div>
          </div>
        </div>
      </div>
      <el-dialog v-model="dialogVisible" title="通用设置" :width="'30%'">
        <el-form>
          <el-form-item>
            <span>线段粗细：</span>
            <el-input
              v-model="commomProperty.linestrong"
              @input="change($event)"
              style="width: 100px; height: 25px"
              type="number"
            />
            &nbsp;&nbsp;&nbsp;
            <span>图标大小：</span>
            <el-input
              v-model="commomProperty.iconsize"
              @input="change($event)"
              style="width: 100px; height: 25px"
              type="number"
            />
          </el-form-item>
          <el-form-item>
            <span>分割线长度：</span>
            <el-input
              v-model="commomProperty.pointlength"
              @input="change($event)"
              style="width: 100px; height: 25px"
              type="number"
            />
            &nbsp;&nbsp;&nbsp;
            <span>分割线粗细：</span>
            <el-input
              v-model="commomProperty.pointstrong"
              @input="change($event)"
              style="width: 100px; height: 25px"
              type="number"
            />
          </el-form-item>
          <el-form-item>
            <span>线段颜色：</span>
            <el-input
              v-model="commomProperty.linecolor"
              @input="change($event)"
              style="width: 120px; height: 25px"
              type="text"
            />
            &nbsp;&nbsp;&nbsp;
            <span>分割线颜色：</span>
            <el-input
              v-model="commomProperty.pointcolor"
              @input="change($event)"
              style="width: 120px; height: 25px"
              type="text"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="commomsetSubmit">
              确定修改
            </el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>
<script lang="ts">
import axios from "axios";
import {login} from "@/api/api.ts";
import {defineComponent, getCurrentInstance} from "vue";
import pointImg from "@/assets/icons/point.png";
import {
  getProjection,
  vec_c,
  vec_cover,
  Feature,
  Style,
  Text,
  RegularShape,
  Stroke,
  Point,
  Circle,
  Icon,
  reverseFunc,
  insertIntoPoint,
  Fill,
  Vector,
  Select,
  Layer,
  Polygon,
  MultiLineString,
  VectorSource,
  proj4,
  bd09togcj02,
  gcj02towgs84,
  styleArrow,
  hasChinese,
} from "@/utils/mapservice";
import {pairArray, isAllPropertiesEmpty} from "@/utils/arrcomputed";
import "ol/ol.css";
import {pointerMove} from "ol/events/condition";
import Map from "ol/Map";
import View from "ol/View";
import Overlay from "ol/Overlay";
import {intersects, boundingExtent} from "ol/extent";
import {getDistance} from "ol/sphere";
import {distance} from "ol/coordinate";
import * as source from "ol/source";
import LayerTile from "ol/layer/Tile";
import ImageLayer from "ol/layer/Image";
import {Raster as RasterSource} from "ol/source";
import {defaults, ScaleLine, OverviewMap} from "ol/control";
import Translate from "ol/interaction/Translate";
import MouseEventListener from "../application/mapEvent";
import mapFeatureManager from "../application/mapFeature";
import FeatureStyleStore from "../application/featurestyleStore";
import mapLayers from "../application/mapLayers";
export default defineComponent({
  name: "trafficmap",
  inheritAttrs: false,
});
</script>
<script lang="ts" setup>
import {
  ref,
  reactive,
  onMounted,
  onUnmounted,
  computed,
  watch,
  nextTick,
} from "vue";
import {useStore, mapState} from "vuex";
import moment from "moment";
import {carlineMap} from "@/utils/datadefine";
import {uniqueString} from "@/utils/arrcomputed";
import pointsrc from "@/assets/icons/elepoint.png";
import pointchangesrc from "@/assets/icons/point.png";
import _ from "lodash";
const store = useStore();
//let pointdata = store.state.pointData;
let overstation = [];
//const overimg = {a:pointsrc,b:pointchangesrc,c:pointsrc}
const map = ref(null); //初始化一次后到vuex里面
const layers = ref(null);
const view = ref(null);
const selectedName = ref(null);
const selectedPoint = reactive({
  name1: "",
  location1: [],
  linename1: "",
  distance1: "",
  name2: "",
  location2: [],
  linename2: "",
  distance2: "",
});
const featureProperty = reactive({
  //命名错误其实是覆盖物
  id: "",
  station_name: "",
  station_position: "",
  color: "",
  offset: [],
});
const nodeProperty = reactive({
  //node来表示feature
  id: "",
  linename: "",
  distance: "",
  fontcolor: "",
  offset: [],
  rotation: 0,
  RID: "",
});
const dialogVisible = ref(false);
let commomProperty = reactive({
  linestrong: null,
  iconsize: null,
  pointlength: null,
  pointstrong: null,
  linecolor: null,
  pointcolor: null,
}); //let 是因为要修改
const moveFeaturePoint = ref([]);
const overlaychoice = ref(0);
const editorPoint1 = reactive({location: [0, 0]});
const editorPoint2 = reactive({location: [0, 0]});
const feature_space = ref(0);
const xyoptions = ref(["调整经度", "调整纬度", "经纬调整", "不做调整"]);
const selectedxyOption = ref(0);
const segmentProperty = reactive({angle: 0, textbox: ""});
const currentdrawposition = ref([]);
const lineArray = ref([]);
const pointArray = ref([]);
const textboxArray = ref([]);
const overlayNewPosition = ref([]);
const pointElements = reactive({angle: 0});
const featureAll = ref([]);
const pointAll = ref([]);
const overlayAll = ref([]);
const textboxAll = ref([]);
const isdatabind = ref(false); //是否绑定了数据
const isoverlaydatapanel = ref(true);
const undoStack = ref([]); //撤回操作历史栈

const beginPaint = () => {
  let mouse_obj = new MouseEventListener(map.value);
  mouse_obj.mouseClickListener((mousePosition) => {
    currentdrawposition.value = mousePosition;
    lineArray.value.push(currentdrawposition.value);
    pointArray.value = currentdrawposition.value;
    textboxArray.value = currentdrawposition.value;
  }, "click");
};
const CursorPointer = () => {
  map.value.getTargetElement().style.cursor = "pointer";
};
/*const mousePoisListener = () => {
		// 监听鼠标移动事件
		map.value.on('pointermove', (event) => {
			let mousePosition = event.coordinate;
			overstation = mousePosition;
		});
	};*/
const currentzoom = ref(14);
const zoomMapLevel = (nodes: any) => {
  //覆盖物跟随缩放
  map.value.on("moveend", () => {
    currentzoom.value = map.value.getView().getZoom();
    if (currentzoom.value <= 14) {
      let iconscale = 0.8;
      changeMapOverlay(nodes, iconscale);
    } else {
      let iconscale = 1;
      changeMapOverlay(nodes, iconscale);
    }
  });
};

const linerid = ref(0);
const editor_linerid = ref(0);
const drawmulLines = () => {
  //多线段绘制方法
  linerid.value++;
  if (lineArray.value.length !== 0) {
    let linecoordinate = lineArray.value;
    let feature_id = "vecfeature-" + (editor_linerid.value + linerid.value);
    let line_obj = new mapFeatureManager(commomProperty);
    let feature = line_obj.drawMultiLines(linecoordinate, feature_id);
    let layerarr = map.value.getLayers().getArray();
    layerarr.forEach((layer) => {
      if (layer.get("vector")) {
        layer.get("vector").getSource().addFeature(feature);
        undoStack.value.push({entity: feature, type: "line"}); //线段节点压入栈
      }
    });
  }
};

const featureproduct = () => {
  let loc = Array.from(new Set(lineArray.value));
  let feature_id = "vecfeature-" + (editor_linerid.value + linerid.value);
  let linearr = {
    position: loc,
    options: {
      id: feature_id,
      name: "",
      distance: "",
      fontcolor: "",
      offset: "",
      rotation: 0,
      RID: "",
    },
  };
  console.log("这里是生成的节点", featureAll.value);
  featureAll.value.push(linearr);
  lineArray.value = [];
};

const segid = ref(0); //分割线id
const editor_segid = ref(0); //编辑后的分割线id
const drawseg = () => {
  //分割线绘制
  segid.value++;
  if (pointArray.value.length !== 0) {
    let angle = segmentProperty.angle;
    let pointCoord = pointArray.value;
    let seg_id = "segline-" + (editor_segid.value + segid.value);
    let point_obj = new mapFeatureManager(commomProperty);
    let pointfeature = point_obj.drawPoints(pointCoord, angle, seg_id);
    let layerarr = map.value.getLayers().getArray();
    layerarr.forEach((layer) => {
      if (layer.get("vector")) {
        layer.get("vector").getSource().addFeature(pointfeature);
        undoStack.value.push({entity: pointfeature, type: "point"}); //分隔断节点压入栈
      }
    });
    pointAll.value.push({
      position: pointCoord,
      options: {id: seg_id, angle: angle},
    });
  }
};

const textrid = ref(0); //文本框id
const editor_textrid = ref(0); //编辑后的文本框id数量
const drawtextbox = () => {
  //单个文本框绘制
  textrid.value++;
  if (textboxArray.value.length !== 0) {
    let text = segmentProperty.textbox;
    let textboxCoord = textboxArray.value;
    let textbox_id = "textbox-" + (editor_textrid.value + textrid.value);
    let text_obj = new mapFeatureManager(commomProperty);
    let textfeature = text_obj.drawText(textboxCoord, text, textbox_id);
    let layerarr = map.value.getLayers().getArray();
    layerarr.forEach((layer) => {
      if (layer.get("vector")) {
        layer.get("vector").getSource().addFeature(textfeature);
        undoStack.value.push({entity: textfeature, type: "textbox"}); //分隔断节点压入栈
      }
    });
    textboxAll.value.push({
      position: textboxCoord,
      options: {id: textbox_id, text: text}, //全部预览的时候必须有id
    });
  }
};

const drawMapFeature = (
  nodes: any,
  nodes1?: any,
  nodes2?: any,
  nodes3?: any
) => {
  //绘制全部节点
  if (nodes.length !== 0) {
    removeAllFeature();
    nodes.forEach((coord, index) => {
      let line_obj = new mapFeatureManager(commomProperty);
      let feature_id = coord.options.id;
      let newfeature = line_obj.drawMultiLines(
        coord.position,
        feature_id,
        coord.options
      );
      let layer_obj = new mapLayers(map.value);
      layer_obj.addFromLayer("vector", newfeature);
    });
    drawMapPoint(nodes1);
    drawMapOverlay(nodes2);
    drawMapTextbox(nodes3);
  }
};

const drawMapPoint = (nodes: any) => {
  //绘制全部分割线
  if (nodes.length !== 0) {
    nodes.forEach((coord, index) => {
      let angle = coord.options.angle;
      let id = coord.options.id;
      let point_obj = new mapFeatureManager(commomProperty);
      let pointfeature = point_obj.drawPoints(coord.position, angle, id);
      let layer_obj = new mapLayers(map.value);
      layer_obj.addFromLayer("vector", pointfeature);
    });
  }
};

const drawMapTextbox = (nodes: any) => {
  //绘制全部文本框
  if (nodes.length !== 0) {
    nodes.forEach((coord, index) => {
      let text = coord.options.text;
      let id = coord.options.id;
      let text_obj = new mapFeatureManager(commomProperty);
      let textfeature = text_obj.drawText(coord.position, text, id);
      let layer_obj = new mapLayers(map.value);
      layer_obj.addFromLayer("vector", textfeature);
    });
  }
};

const drawMapOverlay = (nodes: any) => {
  //绘制全部覆盖物
  if (nodes.length !== 0) {
    nodes.forEach((coord, index) => {
      let dataproperty = coord.options;
      let type = dataproperty.icontype;
      let id = dataproperty.id;
      let overlay_obj = new mapFeatureManager(commomProperty);
      let overfeature = overlay_obj.drawOverlay(coord.position, type, id);
      let layer_obj = new mapLayers(map.value);
      layer_obj.addFromLayer("vector", overfeature);
    });
  }
};

const changeMapOverlay = (nodes: any, scale: any) => {
  //更新全部覆盖物
  let oversrc = "";
  let layer_obj = new mapLayers(map.value);
  nodes.forEach((coord, index) => {
    let dataproperty = coord.options;
    let type = dataproperty.icontype;
    layer_obj.changeFromLayer("vector", type, index + 1, scale, dataproperty);
  });
};

const removeAllFeature = () => {
  let layer_obj = new mapLayers(map.value);
  layer_obj.removeFromLayer("vector");
};

const undoLastAction = () => {
  //回撤操作函数
  if (undoStack.value.length > 0) {
    let layerarr = map.value.getLayers().getArray();
    layerarr.forEach((layer) => {
      if (layer.get("vector")) {
        let node = undoStack.value.pop();
        layer.get("vector").getSource().removeFeature(node.entity);
        if (node.type == "line") {
          lineArray.value.length = 0;
          if (featureAll.value.length > 0) {
            featureAll.value.pop();
          }
        } else if (node.type == "point") {
          pointArray.value.length = 0;
          if (pointAll.value.length > 0) {
            pointAll.value.pop();
          }
        } else if (node.type == "icon") {
          if (overlayAll.value.length > 0) {
            overlayAll.value.pop();
          }
        } else if (node.type == "textbox") {
          if (textboxAll.value.lenth > 0) {
            textboxAll.value.pop();
          }
        }
      }
    });
  }
};

const overid = ref(0); //每次点击从0开始增加到k
const editor_overid = ref(0); //之前的n必须有，因为是n+k
const overlayproduct = () => {
  //绘制单个覆盖物
  overid.value++;
  let overloc = currentdrawposition.value;
  let overindex = overlaychoice.value;
  let over_obj = new mapFeatureManager(commomProperty);
  let over_id = "overlay-" + (editor_overid.value + overid.value);
  let over_feature = over_obj.drawOverlay(overloc, overindex, over_id);
  let layerarr = map.value.getLayers().getArray();
  layerarr.forEach((layer) => {
    if (layer.get("vector")) {
      layer.get("vector").getSource().addFeature(over_feature);
      undoStack.value.push({entity: over_feature, type: "icon"});
    }
  });
  overlayAll.value.push({
    position: overloc,
    options: {
      id: over_id,
      icontype: overindex,
      name: "",
      position: "",
      color: "",
      offset: [],
    },
  });
};

const handleClick = (event) => {
  event.stopPropagation();
};

const handleIconClick = (event) => {
  const index = Array.from(event.target.parentNode.children).indexOf(
    event.target
  );
  overlaychoice.value = index;
};

const commomSet = () => {
  dialogVisible.value = true;
};

const change = (e) => {
  const internalInstance = getCurrentInstance();
  internalInstance.ctx.$forceUpdate();
};

const commomsetSubmit = () => {
  dialogVisible.value = false;
  let commomProperty_data = JSON.stringify(commomProperty);
  localStorage.setItem("commompropertydata", commomProperty_data);
};

// 创建一个用于存储右键点击事件监听器的变量
let contextmenuListener = null;
const featureselect = () => {
  let selectInteraction = new Select({
    condition: pointerMove,
  });
  selectInteraction.on("select", (event) => {
    let popup_obj = new MouseEventListener(
      map.value,
      overlayAll.value,
      featureAll.value,
      textboxAll.value,
      pointAll.value
    );
    if (event) {
      let feature = event.selected[0];
      if (contextmenuListener) {
        popup_obj.popupMenuListener(null, contextmenuListener);
        contextmenuListener = null; //重新置空
      } else {
        contextmenuListener = popup_obj.popupMenuListener(feature.id_);
      }
      if (feature.id_ && feature.id_.includes("overlay")) {
        isoverlaydatapanel.value = true;
        featureProperty.id = feature.id_;
        overlayAll.value.forEach((item) => {
          if (item.options.id === feature.id_) {
            let bindnow = isAllPropertiesEmpty(item.options, "overlay");
            if (bindnow) {
              isdatabind.value = false;
            } else {
              isdatabind.value = true;
            }
          }
        });
      } else if (feature.id_ && feature.id_.includes("vecfeature")) {
        isoverlaydatapanel.value = false;
        nodeProperty.id = feature.id_;
        featureAll.value.forEach((item) => {
          if (item.options.id === feature.id_) {
            let bindnow = isAllPropertiesEmpty(item.options, "feature");
            if (bindnow) {
              isdatabind.value = false;
            } else {
              isdatabind.value = true;
            }
          }
        });
      }
    }
  });
  map.value.addInteraction(selectInteraction);
};

//更新所有的地图节点
const updateAllMapFeature = (nodes: any, type: string) => {
  if (nodes.length !== 0) {
    nodes.forEach((coord, index) => {
      let feature_obj = new mapLayers(map.value);
      let feature_id = coord.options.id;
      let options = null;
      if (type == "vecfeature") {
        options = coord.options;
      } else if (type == "overlay") {
        options = coord.options.icontype;
      } else if (type == "textbox") {
        options = coord.options.text;
      } else {
        options = coord.options.angle;
      }
      feature_obj.changeAllFromLayer(
        "vector",
        commomProperty,
        options,
        feature_id
      );
    });
  }
};
//覆盖物拖动交互
const overlaydrag_start = (translate: any) => {
  translate.setActive(true);
};
const overlaydrag_end = (translate: any) => {
  translate.setActive(false);
};

//覆盖物数据绑定
const databind = () => {
  if (featureProperty.id != "") {
    let newid = featureProperty.id;
    let newname = featureProperty.station_name;
    let newposition = featureProperty.station_position;
    let newcolor = featureProperty.color;
    let newoffset = featureProperty.offset;
    overlayAll.value.forEach((item) => {
      if (item.options.id === newid) {
        item.options.name = newname;
        item.options.position = newposition;
        item.options.color = newcolor;
        item.options.offset = newoffset;
        alert("绑定成功！");
      }
    });
  }
};

//节点数据绑定
const nodedatabind = () => {
  console.log("这里是全部的节点的数组", featureAll.value);
  if (nodeProperty.id != "") {
    let newid = nodeProperty.id;
    let newname = nodeProperty.name;
    let newdistance = nodeProperty.distance;
    let newfontcolor = nodeProperty.fontcolor;
    let newoffset = nodeProperty.offset;
    let newrotation = nodeProperty.rotation;
    let newRID = nodeProperty.RID;
    featureAll.value.forEach((item) => {
      if (item.options.id === newid) {
        item.options.linename = newname;
        item.options.distance = newdistance;
        item.options.fontcolor = newfontcolor;
        item.options.offset = newoffset;
        item.options.rotation = newrotation;
        item.options.RID = newRID;
        alert("绑定成功！");
      }
    });
  }
};

const initMap = () => {
  let vecZminzoom = 11;
  let vecZmaxzoom = 16;
  let cvaZminzoom = 11;
  let cvaZmaxzoom = 16;
  layers.value = [
    vec_c(vecZmaxzoom, vecZminzoom)[0],
    vec_c(vecZmaxzoom, vecZminzoom)[1],
  ];
  view.value = new View({
    center: [116.376385, 39.914714], //北京市
    extent: [116.044084, 39.772893, 116.769053, 40.099963], //只显示北京城区
    projection: getProjection(),
    zoom: 12,
    maxZoom: 16,
    minZoom: 12,
    enableRotation: false,
  });
  map.value = new Map({
    layers: layers.value,
    target: document.getElementById("bm-view"),
    view: view.value,
    controls: defaults().extend([new ScaleLine()]),
  });
  let source = new VectorSource();
  let vector_line = new Vector({
    source: source,
  });
  let pointsource = new VectorSource();
  let vector_point = new Vector({
    source: pointsource,
  });
  vector_line.set("vector", vector_line);
  //vector_point.set('vector_point', vector_point);
  map.value.addLayer(vector_line);
  //map.value.addLayer(vector_point);
  //lineInitMap();
  let mouse_obj = new MouseEventListener(map.value);
  mouse_obj.mouseClickListener((mousePosition) => {
    overstation = mousePosition;
  }, "pointermove");
  const translate = new Translate({
    layers: [vector_line],
  });
  map.value.addInteraction(translate);
  translate.on("translateend", (event) => {
    const features = event.features.array_[0];
    const overid = features.id_;
    let rescoord = features.values_.geometry.flatCoordinates;
    if (overid.includes("overlay")) {
      overlayAll.value.forEach((item) => {
        if (item.options.id === overid) {
          item.position = rescoord;
        }
      });
    } else if (overid.includes("textbox")) {
      textboxAll.value.forEach((item) => {
        if (item.options.id === overid) {
          item.position = rescoord;
        }
      });
    }
  });
  dragforbind(); //初始禁用节点
  featureselect(); //节点选择开启
};
let isDragPanel = ref(2);
const changePanel = () => {
  isDragPanel.value = (isDragPanel.value + 1) % 3;
};
const dragOverlayOnMap = () => {};
const getPointByName = (name) => {
  return store.getters.getPointByName(name);
};
const fetchData = () => {
  store.dispatch("fetchPointData");
};
const fetchPoint = (arrPoint?: Array) => {
  if (selectedName.value) {
    let content = getPointByName(selectedName.value);
    if (hasChinese(selectedName.value)) {
      content.forEach((item, index) => {
        const {name, location, linename, distance} = item;
        selectedPoint[`name${index + 1}`] = name;
        selectedPoint[`location${index + 1}`] = location;
        selectedPoint[`linename${index + 1}`] = linename;
        selectedPoint[`distance${index + 1}`] = distance;
      });
    } else {
      if (arrPoint && arrPoint.length !== 0) {
        let data = [];
        arrPoint.forEach((item, index) => {
          content[index].location = item;
        });
        content.forEach((item, index) => {
          data[index] = item;
        });
        moveFeaturePoint.value = data;
        console.log("这里是选择节点对象", moveFeaturePoint.value);
      }
    }
  }
};
const saveEditedPoint = () => {
  // 找到在 state.pointData 中原来的位置
  if (editorPoint1.location[0] !== 0 && editorPoint2.location[0] === 0) {
    const index = store.state.pointData
      .flat(2)
      .findIndex((point) => point.name === selectedPoint.name1);
    if (index >= 0) {
      // 替换原有的对象
      store.state.pointData.flat(2)[index].location = editorPoint1.location1;
      // 触发对应的 mutation 更新 state.pointData
      store.commit("setPointData", store.state.pointData);
    }
  } else if (editorPoint2.location[0] !== 0) {
    if (selectedxyOption.value === 0) {
      editorPoint2.location[0] =
        parseFloat(editorPoint1.location[0]) + parseFloat(feature_space.value); //前一个点的经度加上修正参数
    } else if (selectedxyOption.value === 1) {
      editorPoint2.location[1] = editorPoint1.location[1] - feature_space.value; //上一个点的纬度减去修正参数
    } else {
    }
    const index1 = store.state.pointData
      .flat(2)
      .findIndex((point) => point.name === selectedPoint.name1);
    if (index1 >= 0) {
      // 替换原有的对象
      store.state.pointData.flat(2)[index1].location = editorPoint1.location;
      // 触发对应的 mutation 更新 state.pointData
      store.commit("setPointData", store.state.pointData);
    }
    const index2 = store.state.pointData
      .flat(2)
      .findLastIndex((point) => point.name === selectedPoint.name2);
    if (index2 >= 0) {
      // 替换原有的对象
      store.state.pointData.flat(2)[index2].location = editorPoint2.location;
      store.commit("setPointData", store.state.pointData);
    }
  }
};
/*const saveEditedFeature = () = {
	}*/
const createMap = () => {
  beginPaint();
  alert("开启绘制！");
};
const saveMap = () => {
  let data = JSON.stringify(featureAll.value);
  let point_data = JSON.stringify(pointAll.value);
  let overlay_data = JSON.stringify(overlayAll.value);
  let textbox_data = JSON.stringify(textboxAll.value);
  localStorage.setItem("drawmapdata", data);
  localStorage.setItem("drawpointdata", point_data);
  localStorage.setItem("drawoverdata", overlay_data);
  localStorage.setItem("drawtextdata", textbox_data);
  alert("保存成功!");
};
const updatePaint = () => {
  let data = localStorage.getItem("drawmapdata") || [];
  let point_data = localStorage.getItem("drawpointdata") || [];
  let overlay_data = localStorage.getItem("drawoverdata") || [];
  let textbox_data = localStorage.getItem("drawtextdata") || [];
  let commomprops_data = localStorage.getItem("commompropertydata") || [];
  let obj = JSON.parse(data);
  let point_obj = JSON.parse(point_data);
  let overlay_obj = JSON.parse(overlay_data);
  let textbox_obj = JSON.parse(textbox_data);
  let commomprops_obj = Array.isArray(commomprops_data)
    ? []
    : JSON.parse(commomprops_data);
  commomProperty = Array.isArray(commomprops_obj)
    ? commomProperty
    : commomprops_obj; //使用通用配置
  updateAllMapFeature(obj, "vecfeature");
  updateAllMapFeature(point_obj, "");
  updateAllMapFeature(overlay_obj, "overlay");
  updateAllMapFeature(textbox_obj, "textbox");
  alert("刷新成功！");
};
const previewMap = () => {
  let data = localStorage.getItem("drawmapdata") || [];
  let point_data = localStorage.getItem("drawpointdata") || [];
  let overlay_data = localStorage.getItem("drawoverdata") || [];
  let textbox_data = localStorage.getItem("drawtextdata") || [];
  let obj = JSON.parse(data);
  let point_obj = JSON.parse(point_data);
  let overlay_obj = JSON.parse(overlay_data);
  let textbox_obj = JSON.parse(textbox_data);
  featureAll.value = obj;
  pointAll.value = point_obj;
  overlayAll.value = overlay_obj;
  textboxAll.value = textbox_obj;
  editor_linerid.value = obj.length; //保存当前线段数量
  editor_segid.value = point_obj.length; //保存当前分割线数量
  editor_overid.value = overlay_obj.length; //保存当前覆盖物数量
  editor_textrid.value = textbox_obj.length; //保存当前文本框数量
  drawMapFeature(obj, point_obj, overlay_obj, textbox_obj); //初始化执行
  zoomMapLevel(overlay_obj); //缩放时更新覆盖物
};
const clearMap = () => {
  removeAllFeature();
  lineArray.value.length = 0;
  pointArray.value.length = 0;
  textboxArray.value.length = 0;
  featureAll.value.length = 0;
  pointAll.value.length = 0;
  overlayAll.value.length = 0;
  textboxAll.value.length = 0;
  overid.value = 0;
  linerid.value = 0;
  textrid.value = 0;
  segid.value = 0;
  editor_overid.value = 0;
  editor_linerid.value = 0;
  editor_textrid.value = 0;
  editor_segid.value = 0;
  localStorage.removeItem("drawmapdata");
  localStorage.removeItem("drawpointdata");
  localStorage.removeItem("drawoverdata");
  localStorage.removeItem("drawtextdata");
};

const dragforbind = () => {
  const translate = map.value
    .getInteractions()
    .getArray()
    .find((interaction) => interaction instanceof Translate);
  overlaydrag_end(translate);
};

const editorswitch = ref(false);
watch(
  () => editorswitch.value,
  (newData) => {
    if (newData) {
      const translate = map.value
        .getInteractions()
        .getArray()
        .find((interaction) => interaction instanceof Translate);
      overlaydrag_start(translate);
    } else {
      const translate = map.value
        .getInteractions()
        .getArray()
        .find((interaction) => interaction instanceof Translate);
      overlaydrag_end(translate);
    }
  },
  {deep: true}
);
onMounted(() => {
  initMap();
  CursorPointer();
  fetchData();
  dragOverlayOnMap();
});
onUnmounted(() => {});
</script>
<style lang="scss" scoped>
.custom-select .el-input {
  height: 25px;
}
.bm-box {
  width: 100vw;
  height: 100vh;
  position: relative;

  .bm-view {
    width: 100%;
    height: 100%;
    position: relative;

    .btn-back {
      position: fixed;
      display: flex;
      width: vw(200);
      height: vh(50);
      left: vw(60);
      top: vw(20);
      z-index: 99;
    }

    .options_overflow {
      position: fixed;
      display: flex;
      width: vw(150);
      height: vh(50);
      left: vw(60);
      top: vw(90);
      z-index: 99;
      .textbox {
        span {
          display: inline-block;
          height: vh(40);
          width: vw(80);
          text-align: center;
          line-height: vh(40);
          font-size: font(16);
        }
      }
      .imgbox {
        display: flex;
        img {
          width: vw(35);
          height: vh(35);
          margin-left: vw(8);
          cursor: pointer;
        }
      }
    }

    .dataPanelView {
      width: vw(320);
      height: vh(850);
      position: fixed;
      right: vw(50);
      bottom: vh(50);
      // border-radius: 10px;
      z-index: 99;
      /*.scrollbarhide {
	               height: 100%;
	               width: 22px;
	               position: absolute;
	               right: 0;
	               top: 0;
	               background-color: rgba(67, 67, 67, 0.7);
	               z-index: 999;
	            }*/
      .dataPanel {
        width: 100%;
        height: 100%;
        overflow-y: auto;
        background-color: #fff;
        //border-radius: 5px;
        display: flex;
        flex-direction: column;
        align-items: center;

        .header {
          width: 100%;
          flex: 1;
          text-align: left;
          margin-top: vh(30);
          color: #dae8f1;

          span {
            display: inline-block;
            font-size: font(14);
            margin-left: vw(30);
            margin-bottom: vh(10);
            color: black;
          }
        }

        .content {
          width: 100%;
          flex: 4;
          color: #99b5bb;
          display: flex;
          flex-direction: column;

          .inputline {
            margin-left: vw(30);
            margin-top: vh(5);

            .linecn {
              width: vw(170);
              opacity: 0.6;
              background-color: #195a68 !important;

              ::v-deep .el-input__wrapper {
                box-shadow: none;
              }
            }
          }

          .changeline {
            margin-left: vw(30);
            margin-top: vh(10);
          }
        }
      }
    }
  }
}

::v-deep.el-btn-back {
  width: vw(100);
  height: vh(40);
  span {
    font-size: font(16);
  }
}

::v-deep.el-btn-start {
  width: vw(80);
  height: vh(30);

  span {
    font-size: font(14);
  }
}

::v-deep.datavborderbox1 {
  .border {
    border: none !important;
  }
}

.feature_elebox {
  .textareabox {
    margin-left: vw(95);
    margin-top: -vw(30);
    border: 1px solid #ccc;
    background-color: #f4f4f4;
    color: #000;
  }
}

.ol-popup {
  position: absolute;
  background-color: white;
  -webkit-filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
  filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #cccccc;
  bottom: 12px;
  left: -50px;
  min-width: 200px;
}

.ol-popup:after,
.ol-popup:before {
  top: 100%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}

.ol-popup:after {
  border-top-color: white;
  border-width: 10px;
  left: 48%;
  margin-left: -10px;
}

.ol-popup:before {
  border-top-color: #cccccc;
  border-width: 11px;
  left: 48%;
  margin-left: -11px;
}

.ol-popup-closer {
  text-decoration: none;
  position: absolute;
  top: 2px;
  right: 8px;
}

.ol-popup-closer:after {
  content: "X";
}
</style>
