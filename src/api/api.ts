import service from '@/utils/request';
import { service_test } from '@/utils/request';
import QS from 'qs'


export function login(params: Object) {
    return service({
        url: 'requestToken',
        method: "post",
        headerContent: ["json"],
        data: params
    })
}

//获取刷新后的token
export function updateToken(token: Object) {
    return service({
        url: 'updateAccessToken',
        method: "post",
        //  headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded',
        // 'Authorization': `Bearer ${localStorage.getItem('refreshToken')}`
        //},
        headerContent: ['www-form', 'Authorization'],
        data: token
    })
}


/**业务接口 */

