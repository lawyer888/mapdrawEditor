/*import {
    electricbox,
} from '@/api/api';
import * as _ from 'lodash';
class dataRequest {
    //根据绑定好的RID获取末端电压
    requestendU = async (rid: any) => {
        if (rid === '') {
            return 'RID错误！';
        } else {
            let res = await electricbox(rid);
            if (!_.isEmpty(res.data.vars)) {
                let data = JSON.parse(res.data.vars.MessageData);
                return data;
            } else {
                return 'RID错误！';
            }
        }
    };
}
export default dataRequest*/
/*业务请求*/