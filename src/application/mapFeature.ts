import {
    Feature,
    Style,
    Text,
    RegularShape,
    Stroke,
    Point,
    Circle,
    Fill,
    Vector,
    Polygon,
    Icon,
    MultiLineString,
} from '@/utils/mapservice';
import srcA from '@/assets/icons/point.png';
import srcB from '@/assets/icons/poin.png';
import srcC from '@/assets/icons/shuibang.png';
class mapFeatureManager {
    private commomProperty: any;
    constructor(commomProperty: any) {
        this.commomProperty = commomProperty
    }
    /**多线段 */
    drawMultiLines(linecoordinate: any, linerid?: any, dataProperty?: any): any {
        let plygon = new MultiLineString([linecoordinate]);
        let feature = new Feature({
            geometry: plygon,
        });
        let style = new Style({
            fill: new Fill({
                color: 'rgba(255, 255, 255, 0.1)',
            }),
            stroke: new Stroke({
                color: this.commomProperty.linecolor ? this.commomProperty.linecolor : '#DC143C',
                width: this.commomProperty.linestrong ? this.commomProperty.linestrong : 4,
                cursor: 'pointer',
            }),
        });
        let textStyle = new Text({
            text: dataProperty ? dataProperty.distance : '', //只显示distance,name有但是不显示
            rotation: dataProperty ? (dataProperty.rotation != 0 ? dataProperty.rotation : 0) : 0,
            offsetX: dataProperty ? (dataProperty.offset.length != 0 ? dataProperty.offset[0] : 0) : 0,
            offsetY: dataProperty ? (dataProperty.offset.length != 0 ? dataProperty.offset[0] : 20) : 20,
            font: '11px bold Microsoft YaHei',
            fill: new Fill({
                color: dataProperty ? (dataProperty.fontcolor != "" ? dataProperty.fontcolor : '#fff') : '#fff'
            }),
        });
        style.setText(textStyle);
        feature.setStyle(style);
        if (linerid) {
            feature.setId(linerid);
        }
        return feature;
    }
    /**分割线 */
    drawPoints(pointcoordinate: any, angle: number, id?: number): any {
        let pointsharp = new Point([...pointcoordinate]);
        let pointfeature = new Feature({
            geometry: pointsharp,
        });
        let point_style = new Style({
            image: new RegularShape({
                stroke: new Stroke({ color: this.commomProperty.pointcolor ? this.commomProperty.pointcolor : '#fff', width: this.commomProperty.pointstrong ? this.commomProperty.pointstrong : 1.2 }),
                points: 2,
                radius: 20,
                rotation: Math.PI / (360 / angle),
            }),
        });
        if (id) {
            pointfeature.setId(id);
        }
        pointfeature.setStyle(point_style);
        return pointfeature;
    }
    /**覆盖物 */
    drawOverlay(pointcoordinate: any[], type: number, id?: number): any {
        let scale = 0.8;
        scale = this.commomProperty.iconsize ? this.commomProperty.iconsize : 0.8;
        let oversrc = "";
        if (type === 0) {
            oversrc = srcA
        }
        else if (type === 1) {
            oversrc = srcB
        }
        else if (type === 2) {
            oversrc = srcC
        }
        let overlaysharp = new Point([...pointcoordinate]);
        let overlayfeature = new Feature({
            geometry: overlaysharp,
        });
        let overlay_style = new Style({
            image: new Icon({
                scale: scale,
                src: oversrc,
                //size: [80, 80]
            })
        });
        if (id) {
            overlayfeature.setId(id);
        }
        overlayfeature.setStyle(overlay_style)
        return overlayfeature
    }
    /**文本框 */
    drawText(pointcoordinate: any[], textname: string, id?: number): any {
        let textbox = new Point([...pointcoordinate]);
        let textFeature = new Feature({
            geometry: textbox,
            name: textname ? textname : '文本',
        });
        let text_style = new Style({
            text: new Text({
                text: textFeature.get('name'),
                font: '12px Calibri,sans-serif',
                fill: new Fill({ color: '#000' }),
                stroke: new Stroke({
                    color: '#fff', width: 2
                }),
                offsetX: 0,
                offsetY: 0,
                //textAlign: 'left',
                //textBaseline: 'middle'
            })
        });
        if (id) {
            textFeature.setId(id);
        }
        textFeature.setStyle(text_style);
        return textFeature
    }
}
export default mapFeatureManager
