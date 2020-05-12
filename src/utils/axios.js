import axios from 'axios'
import { baseApi } from '../config'
import vm from '../main'
var http = axios.create({
    baseURL: baseApi,
    timeout: 5000
})
http.interceptors.request.use(
    config => {
        config.headers['Content-Type'] = 'application/json;charset=UTF-8'
        config.headers.timestamp = Math.floor(new Date().getTime() / 1000)
        config.headers.token = sessionStorage.getItem('token') || ''
        if (config.loading) {
            vm.$loading.hide();
            vm.$loading.show();
        }
        return config;
    },
    error => {
        vm.$loading.hide();
        return Promise.reject(error);
    }
)
http.interceptors.response.use(
    res => {
        vm.$loading.hide();
        return res
    },
    error => {
        vm.$loading.hide();
        return Promise.reject(error)
    }
)
function get (url) {
    return new Promise((resolve, reject) => {
        http.get(url).then(
            res => {
            resolve(res.data)
        },err => {
            reject(err)
        }).catch(err => {
            reject(err)
        })
    })
}
function post (url, data, loading) {
    return new Promise((resolve, reject) => {
        http.post(url, data, {loading}).then(
            res => {
                resolve(res.data)
            },
            err => {
                reject(err);
            }
        )
        .catch(err => {
            reject(err);
        })
    })
}
export {http, get, post}