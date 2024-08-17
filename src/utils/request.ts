import axios from 'axios'
import router from '@/router/index'
import QS from 'qs'
import { debounce } from "lodash";
import { getCurrentInstance } from 'vue';
import { Message } from "@/utils/msgindex";

//创建axios的实例。
const service = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 10000
});

//创建测试的axios实例
export const service_test = axios.create({
    baseURL: import.meta.env.VITE_APP_TEST_API,
    timeout: 10000
});

//获取刷新后的token
const updateToken = (token: Object) => {
    return service({
        url: 'updateAccessToken',
        method: "post",
        headerContent: ['www-form', 'Authorization'],
        data: token
    })
}

const updateSetToken = async () => {
    const Time: any = window.localStorage.getItem("Time");
    const nextTime: any = new Date().getTime();
    if (nextTime >= Number(Time)) {
        const params = { accessToken: localStorage.getItem('accessToken') }
        const res = await updateToken(params)
        if (res.data.status == 'ok') {
            window.localStorage.setItem('accessToken', res.data.data.accessToken);
            window.localStorage.setItem('refreshToken', res.data.data.refreshToken);
            window.localStorage.setItem("Time", nextTime + 20 * 60 * 1000)
            console.log("换发token成功!")
        }
    }
}

const dela = debounce(updateSetToken, 500);

service.interceptors.request.use(
    config => {
        // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token
        const token = `Bearer ${localStorage.getItem('accessToken')}` || ''
        //const token = `Bearer ${localStorage.getItem('token')}` || ''
        token && (config.headers.Authorization = token)
        if (config.method.toUpperCase() === 'POST') {
            for (let i = 0; i <= config.headerContent.length; i++) {
                if (config.headerContent[i] == "www-form") {
                    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
                }
                else if (config.headerContent[i] == "json") {
                    config.headers['Content-Type'] = 'application/json;charset=utf-8'
                }
                else if (config.headerContent[i] == "Authorization") {
                    config.headers['Authorization'] = `Bearer ${localStorage.getItem('refreshToken')}`
                }
            }
        }
        return config
    },
    error => {
        return Promise.error(error)
    }
)

service.interceptors.response.use(
    response => {
        // console.log(response)
        if (response.status === 200) {
            dela()
            return Promise.resolve(response)
        } else {
            return Promise.reject(response)
        }
    },
    // 服务器状态码不是200的情况
    // 返回401重新请求token
    error => {
        //let message: any = "";
        if (error.response) {
            const statusCode = error.response.status;
            switch (statusCode) {
                case 500:
                    Message('error', '网络中断，请检查您的网络！');
                    break;
                case 404:
                    Message('error', '网络中断，请检查您的网络！');
                    break;
                case 401:
                    Message('error', '登录过期，请重新登录！');
                    break;
                // 其他错误，直接抛出错误提示
                default:
                    Message('error', error.response.data.message);
                    break;
            }
            return Promise.reject(error.response)
        }
        else if (error.request) {
            Message('error', '网络中断，请检查您的网络！');
        }
    }
)

//封装get请求

export default service

