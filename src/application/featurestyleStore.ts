import {
    Style,
    Text,
    RegularShape,
    Stroke,
    Fill,
    Icon,
} from '@/utils/mapservice';
import srcA from '@/assets/icons/point.png';
import srcB from '@/assets/icons/poin.png';
import srcC from '@/assets/icons/shuibang.png';
class FeatureStyleStore {
    private commomProperty: any;
    constructor(commomProperty: any) {
        this.commomProperty = commomProperty
    }
    /**多线段的样式*/
    MultiLines(dataProperty?: any): any {
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
        return style;
    }
    Points(angle: number): any {
        let point_style = new Style({
            image: new RegularShape({
                stroke: new Stroke({ color: this.commomProperty.pointcolor ? this.commomProperty.pointcolor : '#fff', width: this.commomProperty.pointstrong ? this.commomProperty.pointstrong : 1.2 }),
                points: 2,
                radius: 20,
                rotation: Math.PI / (360 / angle),
            }),
        });
        return point_style;
    }
    Overlay(type: number): any {
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
        let overlay_style = new Style({
            image: new Icon({
                scale: scale,
                src: oversrc,
            })
        });
        return overlay_style
    }
    Textbox(textname: string): any {
        let text_style = new Style({
            text: new Text({
                text: textname,
                font: '12px Calibri,sans-serif',
                fill: new Fill({ color: '#000' }),
                stroke: new Stroke({
                    color: '#fff', width: 2
                }),
                offsetX: 0,
                offsetY: -15,
                textAlign: 'left',
                textBaseline: 'middle'
            })
        });
        return text_style
    }

    ///颜色变更的样式库-
    //线变成绿色
    disMultiLines(dataProperty?: any): any {
        let style = new Style({
            fill: new Fill({
                color: 'rgba(255, 255, 255, 0.1)',
            }),
            stroke: new Stroke({
                color: '#5CBB44',
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
        return style;
    }

}
export default FeatureStyleStore