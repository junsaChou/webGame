import axois from 'axios'
import { Message } from 'element-ui'
import { getToken, removeToken,removeUserInfo,removeSendEmial } from './utils/cookie'
import { baseUrl  } from './utils/config'
import global from './utils/global'
import { Base64 } from 'js-base64'
let self = this;
import QS from 'qs'
const BASE_URL = baseUrl;
// console.log( BASE_URL)
// const BASE_URL = '';
// 创建axios实例
const service = axois.create({
    baseURL: BASE_URL,// 'http://192.168.103.165:8002',
    timeout: 120000 // 请求超时时间
})

// request拦截器设置
service.interceptors.request.use(
    config => {
        if (getToken()&& config.url.indexOf('noLogin')== -1 ) {
            // config.headers['Authorization'] =  getToken() // 请求头设置自带 token
            config.headers['Authorization'] = 'Bearer '+getToken() // 请求头设置自带 token
        }
        config.headers['Content-Type'] = 'application/json;charset=UTF-8' // 请求的数据格式为 json
        return config
    },
    error => {
        console.log(error)
        Promise.reject(error)
    }
)

// response 拦截器设置

service.interceptors.response.use(
        response => {
            let res = {}
            res.data = response.data
            res.code = response.code
            res.message = response.message
            if (res.code === 500) {
                Message({
                    type: 'error',
                    message
                })
                removeToken()
                removeUserInfo()
                removeSendEmial()
                location.reload()
                self.$router.push('/')
              
            }
            return res
        },
        error => {
            // console.log( error.response )
            let {data,status } = error.response;
            let res = { data,status }
            console.log(res)
            if( res.data.code == 1401 || res.status == 401 ){
              Message({
                type: 'error',
                message: 'Identity status has expired'
              })

              removeToken()
              removeUserInfo()
              removeSendEmial()
              location.reload()
              self.$router.push('/')
              location.reload()
            }
            const code = error.response.data.code
            if (!code) {
                Message({
                    type: 'error',
                    message: 'Service upgrade, please wait'
                })
            }
            return Promise.reject(error)
        }
    )
    //定义接口
export function get(url, params) { //get 请求  
    return new Promise((resolve, reject) => {
        service.get(url, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data)
        })
    });
}
export function postParams(url, params) { //post 请求 parmas
    return new Promise((resolve, reject) => {
        service.post(url, null, { params })
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    })
}
export function postBody(url, data) { //post 请求 parmas
    return new Promise((resolve, reject) => {
        // console.log(data)
        service.post(url, data)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    })
}
export function postLogin(url, data) { //post 请求 parmas
    return new Promise((resolve, reject) => {
        let basicData = Base64.encode('GAMEWAY-PC:gameway2021~');
        let dataForm = QS.stringify(data);
        // console.log(dataForm)
        // QS.stringify(data) 'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
        service.post(url,dataForm,{ headers:{ 'content-type': 'application/x-www-form-urlencoded;charset=UTF-8', Authorization:`Basic ${basicData}`}})
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    })
}
export function postBlob(url, data) { //post 请求 parmas
    return new Promise((resolve, reject) => {
        // console.log(data)
        service.post(url, data,{responseType:"arraybuffer"})
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    })
}
export function postUpload(url, data,params) { //post 请求 parmas  上传图片
    return new Promise((resolve, reject) => {
        service.post(url, data,{ params,headers: { 'content-type': 'multipart/form-data' }})
            .then(res => {
                console.log(res)
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
        })
    
}
export function deleteApi(url, params) { //post 请求 parmas
    return new Promise((resolve, reject) => {
            service.delete(url, {
                params
            }).then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err.data)
            })
        })
    
}
export function postParamsBlob(url, params) { //post 请求 parmas blob
    return new Promise((resolve, reject) => {
        // console.log(data)
        service.post(url, null, { params,responseType:"arraybuffer" })
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    })
}
export function getBlob(url, params) { //get 请求  
    return new Promise((resolve, reject) => {
        service.get(url, {
            params:params,
            responseType:"blob"}).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data)
        })
    });
}