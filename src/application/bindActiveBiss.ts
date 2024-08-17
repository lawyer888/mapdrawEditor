/*import dataRequest from './dataRequest';
import FeatureStyleStore from './featurestyleStore';
class activeBiss {
    private commomset: any;
    constructor(commomset: any) {
        this.commomset = commomset;
    }
    linebiss(featurestyle: any): any {
        let RID = featurestyle.RID;
        let data_req = new dataRequest();
        let feature_obj = new FeatureStyleStore(this.commomset);
        return new Promise((resolve, reject) => {
            if (RID == "") {
                let line = feature_obj.MultiLines(featurestyle);
                resolve(line);
            }
            else {
                data_req.requestendU(RID).then(data => {
                    let moU = data.TD1_U;
                    if (moU > 50) {
                        let line = feature_obj.disMultiLines(featurestyle);//有电      
                        resolve(line);
                    }
                    else {
                        let line = feature_obj.MultiLines(featurestyle);//无电
                        resolve(line);
                    }
                }).catch(error => {
                    reject(error);
                })
            }
        })
    }
}
export default activeBiss;*/
/**包含地图动作元素的业务 */