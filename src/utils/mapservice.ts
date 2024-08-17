import proj4 from 'proj4';
import WMTS from "ol/source/WMTS";
import TileImage from "ol/source/TileImage";
import TileLayer from "ol/layer/Tile";
import WMTSTileGrid from "ol/tilegrid/WMTS";
import { wmtsTileLoadFunction } from "@/utils/mapcache";
import { register } from 'ol/proj/proj4'
import { Projection, addProjection } from 'ol/proj';
import { getWidth, getTopLeft } from "ol/extent.js";
import Feature from "ol/Feature";
import { Style, Stroke, RegularShape, Circle, Icon, Text, Fill } from "ol/style";
import { Select } from "ol/interaction"
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
//import source from "ol/source";
import { Layer, Vector } from "ol/layer";
import { Point, Polygon, MultiLineString } from "ol/geom";
import { toStringXY } from "ol/coordinate";
proj4.defs("EPSG:4490", "GEOGCS[\"China Geodetic Coordinate System 2000\",DATUM[\"China_2000\",SPHEROID[\"CGCS2000\",6378137,298.257222101,AUTHORITY[\"EPSG\",\"1024\"]],AUTHORITY[\"EPSG\",\"1043\"]],PRIMEM[\"Greenwich\",0,AUTHORITY[\"EPSG\",\"8901\"]],UNIT[\"degree\",0.0174532925199433,AUTHORITY[\"EPSG\",\"9122\"]],AUTHORITY[\"EPSG\",\"4490\"]]");
register(proj4);
let projection = new Projection({
    code: 'EPSG:4490',
    units: 'degrees',
    axisOrientation: 'neu'
});
projection.setExtent([-180, -90, 180, 90]);
projection.setWorldExtent([-180, -90, 180, 90]);
addProjection(projection)
let projectionExtent = projection.getExtent();
let size = getWidth(projectionExtent) / 256;
let matrixIds: any = [];
const getResolutions = () => {
    let resolutions = [];
    for (let z = 0; z < 20; ++z) {
        resolutions[z] = size / Math.pow(2, z);
        matrixIds[z] = z;
    }
    return resolutions;
}
export const getProjection = () => {
    return projection
}

// WMTS 形式

const getWMTSLayer = (url: String, layer: any, maxzoom: any, minzoom: any) => {
    const tileGrid = new WMTSTileGrid({
        origin: getTopLeft(projectionExtent),
        resolutions: getResolutions(),
        matrixIds: matrixIds,
    })
    let options = {
        name: "中国",
        url: url,
        layer: layer,
        version: '1.0.0',
        style: "default",
        matrixSet: "c",
        format: "tiles",
        wrapX: true,
        tileGrid: tileGrid
    }
    const source = new WMTS(options)
    source.setTileLoadFunction(wmtsTileLoadFunction)//自定义本地瓦片缓存
    return new TileLayer({
        className: "blueLayer",//蓝色
        maxZoom: maxzoom,
        minZoom: minzoom,
        source: source,
    })
}

const key = "" //你的天地图key  yourmapkey
/**
 \* 矢量底图 + 矢量注记
 */
//let currentKeyNum = 0;
export const vec_c = (aindex: number, bindex: number) => {
    // let i = Math.floor(Math.random() * 3)
    //currentKeyNum = currentKeyNum % 3 + 1;
    return [
        getWMTSLayer('http://t{0-7}.tianditu.gov.cn/vec_c/wmts?tk=' + key, 'vec', aindex, bindex),
        getWMTSLayer('http://t{0-7}.tianditu.gov.cn/cva_c/wmts?tk=' + key, 'cva', aindex, bindex)
    ]
}
/**
 \* 影像底图 + 影像注记
 */
export const img_c = () => {
    return [
        getWMTSLayer('http://t{0-7}.tianditu.gov.cn/img_c/wmts?tk=' + key, 'img', 14, 11),
        getWMTSLayer('http://t{0-7}.tianditu.gov.cn/cia_c/wmts?tk=' + key, 'cia', 12, 12)
    ]
}

/**
 \* 蒙层底图
 */
export const vec_cover = () => {
    getWMTSLayer('http://t{0-7}.tianditu.gov.cn/vec_c/wmts?tk=' + key, 'vec', 14, 12)
}

/**
 * 动态插入拐点
 */

export const insertIntoPoint = (arr: Array<any>, area: Array<any>) => {
    let newarr = arr.flatMap((elem, index) => {
        if (index < arr.length - 1) {
            if (arr[index + 1][1] - elem[1] > area[1]) {
                return [elem, [arr[index + 1][0], elem[1]]];
            }
        }
        return [elem];
    })
    return newarr
}

/**
 * 坐标转换算法
 */

var PI = 3.1415926535897932384626;
var a = 6378245.0;
var ee = 0.00669342162296594323;

let transformlat = (lng, lat) => {
    let ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
    ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0;
    ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0;
    return ret
}

let transformlng = (lng, lat) => {
    let ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
    ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0;
    ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0;
    return ret
}

/**
     * 判断是否在国内，不在国内则不做偏移
     * @param lng
     * @param lat
     * @returns {boolean}
     */
let out_of_china = (lng, lat) => {
    return (lng < 72.004 || lng > 137.8347) || ((lat < 0.8293 || lat > 55.8271) || false);
}

/**
     * 百度坐标系 (BD-09) 与 火星坐标系 (GCJ-02)的转换
     * 即 百度 转 谷歌、高德
     * @param bd_lon
     * @param bd_lat
     * @returns {*[]}
     */
export let bd09togcj02 = (bd_lon, bd_lat) => {
    let x_pi = 3.14159265358979324 * 3000.0 / 180.0;
    let x = bd_lon - 0.0065;
    let y = bd_lat - 0.006;
    let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
    let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
    let gg_lng = z * Math.cos(theta);
    let gg_lat = z * Math.sin(theta);
    return [gg_lng, gg_lat]
}

/**
     * GCJ02 转换为 WGS84
     * @param lng
     * @param lat
     * @returns {*[]}
     */
export let gcj02towgs84 = (lng, lat) => {
    if (out_of_china(lng, lat)) {
        return [lng, lat]
    } else {
        let dlat = transformlat(lng - 105.0, lat - 35.0);
        let dlng = transformlng(lng - 105.0, lat - 35.0);
        let radlat = lat / 180.0 * PI;
        let magic = Math.sin(radlat);
        magic = 1 - ee * magic * magic;
        let sqrtmagic = Math.sqrt(magic);
        dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
        dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
        let mglat = lat + dlat;
        let mglng = lng + dlng;
        return [lng * 2 - mglng, lat * 2 - mglat]
    }
}

/***
 *
 颜色转换算法
 */
export const reverseFunc = (pixelsTemp: any) => {
    //当前:蓝色
    for (let i = 0; i < pixelsTemp.length; i += 4) {
        let r = pixelsTemp[i];
        let g = pixelsTemp[i + 1];
        let b = pixelsTemp[i + 2];
        let grey = r * 0.3 + g * 0.59 + b * 0.11;//灰度设置
        pixelsTemp[i] = grey;
        pixelsTemp[i + 1] = grey;
        pixelsTemp[i + 2] = grey;//基于灰色，设置为蓝色，数值可以调整
        pixelsTemp[i] = 55 - pixelsTemp[i];
        pixelsTemp[i + 1] = 255 - pixelsTemp[i + 1];
        pixelsTemp[i + 2] = 305 - pixelsTemp[i + 2];
    }
    ///return pixelsTemp;
};

/***
 * 文字随线段计算函数
 * */
export const styleArrow = (start: any, end: any) => {
    //let arrowLonLat = [(end[0] + start[0]) / 2, (end[1] + start[1]) / 2];
    let dx = end[0] - start[0];
    let dy = end[1] - start[1];
    let rotation = Math.atan2(dy, dx);
    let rotationText = 0
    if (0 < rotation && rotation < Math.PI / 2) {
        rotationText = -rotation
    }
    if (Math.PI / 2 < rotation && rotation < Math.PI) {
        rotationText = Math.PI - rotation
    }
    if (-Math.PI / 2 < rotation && rotation < 0) {
        rotationText = -rotation
    }
    if (-Math.PI < rotation && rotation < -Math.PI / 2) {
        rotationText = Math.PI - rotation
    }
    // arrows
    return rotationText;
}

//是否有中文
export const hasChinese = (str) => {
    let reg = /[\u4e00-\u9fa5]/; // Unicode范围内的汉字编码
    return reg.test(str);
}

//根据数组对象查找获取对象所在的数组
export const findArrayContainingObject = (arr: any, targetObj: any) => {
    return arr.find(subArr => subArr.some(obj => obj === targetObj));
};

export {
    Feature,
    Style,
    Stroke,
    Circle,
    Select,
    RegularShape,
    toStringXY,
    Text, Icon, Fill, Point, VectorLayer, VectorSource, Layer, Vector, Polygon, MultiLineString, proj4
}
