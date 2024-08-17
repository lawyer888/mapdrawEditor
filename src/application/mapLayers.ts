import {
    Style,
    Icon,
    Text,
    Fill
} from '@/utils/mapservice';
import srcA from '@/assets/icons/point.png';
import srcB from '@/assets/icons/poin.png';
import srcC from '@/assets/icons/shuibang.png';
import FeatureStyleStore from './featurestyleStore';
//import activeBiss from './bindActiveBiss'; //包含数据变化的业务逻辑
class mapLayers {
    private map: any;
    constructor(map: any) {
        this.map = map;
    }
    removeFromLayer(name: string): void {
        let layerarr = this.map.getLayers().getArray();
        layerarr.forEach((layer: any) => {
            if (layer.get(name)) {
                const source = layer.get(name).getSource();
                const features = source.getFeatures();
                features.forEach((feature: any) => {
                    source.removeFeature(feature);
                });
            }
        });
    }
    addFromLayer(name: string, feature: any): void {
        let layerarr = this.map.getLayers().getArray();
        layerarr.forEach((layer: any) => {
            if (layer.get(name)) {
                const source = layer.get(name).getSource();
                source.addFeature(feature);
            }
        });
    }
    changeFromLayer(name: string, type: number, id: number, scale: any, dataProperty?: any): void {
        let oversrc = "";
        let layerarr = this.map.getLayers().getArray();
        layerarr.forEach((layer: any) => {
            if (layer.get(name)) {
                const source = layer.get(name).getSource();
                if (type === 0) {
                    oversrc = srcA;
                }
                else if (type === 1) {
                    oversrc = srcB;
                }
                else if (type === 2) {
                    oversrc = srcC;
                }
                let textStyle = new Text({
                    text: dataProperty.name ? dataProperty.name : '',//属性和options里的要一致
                    font: '11px bold Microsoft YaHei',
                    fill: new Fill({
                        color: dataProperty.color ? dataProperty.color : '#fff'
                    }),
                    offsetX: dataProperty.offset.length > 0 ? dataProperty.offset[0] : 0,
                    offsetY: dataProperty.offset.length > 1 ? dataProperty.offset[1] : 22,
                });
                let newstyle = new Style({
                    image: new Icon({
                        scale: scale,
                        src: oversrc,
                        //anchor: [0, 0]
                    })
                });
                newstyle.setText(textStyle);
                const upfeature = source.getFeatureById('overlay-' + id);
                upfeature.setStyle(newstyle);
                source.changed();
            }
        });
    }
    removeFromLayerById(name: string, featureID: any): void {
        let layerarr = this.map.getLayers().getArray();
        layerarr.forEach((layer: any) => {
            if (layer.get(name)) {
                const source = layer.get(name).getSource();
                const features = source.getFeatures();
                features.forEach((feature: any) => {
                    if (feature.getId() === featureID) {
                        source.removeFeature(feature);
                    }
                });
            }
        });
    }
    //节点通用设置改变方法
    //（如果是动态数据刷新，需要重新开辟一个方法，但这里不用，放到展示客户端进行动态刷新）
    changeAllFromLayer(name: string, commomsetParams: any, featurestyle: any, featureID: any): void {
        let feature_obj = new FeatureStyleStore(commomsetParams);
       // let bisslayer = new activeBiss(commomsetParams);
        let layerarr = this.map.getLayers().getArray();
        layerarr.forEach((layer: any) => {
            if (layer.get(name)) {
                const source = layer.get(name).getSource();
                const features = source.getFeatures();
                features.forEach((feature: any) => {
                    if (feature.getId() === featureID) {
                        if (feature.getId().includes("vecfeature")) {
                            /*bisslayer.linebiss(featurestyle).then((line: any) => {
                                feature.setStyle(line);
                            }).catch((error: any) => { console.error(error) });*/
                        }
                        else if (feature.getId().includes("overlay")) {
                            let overlay = feature_obj.Overlay(featurestyle);
                            feature.setStyle(overlay)
                        }
                        else if (feature.getId().includes("textbox")) {
                            let text = feature_obj.Textbox(featurestyle);
                            feature.setStyle(text)
                        }
                        else {
                            let point = feature_obj.Points(featurestyle);
                            feature.setStyle(point)
                        }
                    }
                })
                source.changed();
            }
        });
    }
}
export default mapLayers
