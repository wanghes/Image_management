import axios from 'axios';
import {
    MessageBox,
    Message
} from 'element-ui';
import store from '@/store';
import {
    getToken
} from '@/utils/auth';


const baseURL = location.host.indexOf('localhost') > -1 ? location.protocol + "//localhost:3003": location.protocol + "//img.mousecloud.cn"

// 创建一个axios实例
const service = axios.create({
    baseURL: baseURL,
    // withCredentials: true, // 当跨域请求时设置cookie
    timeout: 5000 // 超时时间限制
});

// 请求拦截
service.interceptors.request.use(
    config => {
        // 请求发送前处理一些事情
        if (store.getters.token) {
            // 让每次请求携带token信息
            // ['X-Token'] 是一个自定义的头部键
            // 请根据实际情况修改它
            config.headers['X-Token'] = getToken();
        }
        return config;
    },
    error => {
        // 请求出错是做一些事情
        console.log(error);
        return Promise.reject(error);
    }
)

// response interceptor
service.interceptors.response.use(
    /**
     * 如果你想获取http响应头信息或者响应状态
     * 请返回  return  response => response
     * 下边是通过自定义code 判断这个请求状态
     * 下边只是一个demo
     * 你也能通过http状态码判断状态
     */
    response => {
        const res = response.data;
        // 如果自定义状态不是20000，它会被判定为一个错误。
        if (res.code) {
            Message({
                message: res.message || 'Error',
                type: 'error',
                duration: 5 * 1000
            });
            /* 
             * res.code
             * 50008: 无效的token;
             * 50012: 其客户端登录; 
             * 50014: Token 过期;
             * 需要重新登录
             */
            if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
                MessageBox.confirm('你已经退出, 你不能停留在这个页面，或者再次登录', '确认退出', {
                    confirmButtonText: '重新登录',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    store.dispatch('user/resetToken').then(() => {
                        location.reload();
                    });
                });
            }
            return Promise.reject(new Error(res.message || 'Error'))
        } else {
            return res.data;
        }
    },
    error => {
        console.log('err' + error);
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        });
        return Promise.reject(error);
    }
)

export default service;
