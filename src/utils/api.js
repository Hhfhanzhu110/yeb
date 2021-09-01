import axios from "axios";
import { Message } from 'element-ui';
import router from "../router";
import qs from "qs"
import de from "element-ui/src/locale/lang/de";
//npm install qs 序列化参数，否则传不过去

//请求拦截器
axios.interceptors.request.use(config=>{
    const token =window.sessionStorage.getItem("token")
    if (token){
        config.headers['Authorization'] = token;
    }
    return config;
},error => {
    console.log("请求出错了！！！")
})
//响应拦截器
axios.interceptors.response.use(success=>{
    if (success.status && success.status == 200){
        if (success.data.code == 401 || success.data.code == 403 || success.data.code == 500){
            Message.error({message:success.data.message});
            return;
        } else if (success.data.code == 901){
            Message.error({message:success.data.message});
            router.replace('/');
        } else if (success.data.code == 0 && success.data.message!='' && success.data.message!= undefined){
            Message.success({message:success.data.message});
        } else if (success.data.message!='' && success.data.message!= undefined){
            Message.error({message:success.data.message});
            return;
        }
    }
    return success.data;
},error => {
    if (error.response.code == 504 || error.response.code == 404){
        Message.error({message:"服务器挂掉了"})
    } else if (error.response.code == 403){
        Message.error({message:"权限不足,请联系管理员"});
    } else if(error.response.code == 401){
        Message.error({message:"请登录"});
        router.replace('/');
    } else {
        if (error.response.data.message){
            Message.error({message:error.response.data.message});
        } else {
            Message.error({message:'未知错误'})
        }
    }
    return;
});

let base='';
//传送json格式的post请求
export const postRequest = (url,params) => {
    params = qs.stringify(params)
    return axios({
        method:'post',
        url:base+url,
        data:params,
    })
}
export const syncPostRequest = (url,params) => {
    params = qs.stringify(params)
    return axios({
        method:'post',
        url:base+url,
        data:params,
        sync:false
    })
}

export const putRequest = (url,params) => {
    params = qs.stringify(params)
    return axios({
        method:'put',
        url:base+url,
        data:params,
    })
}

export const getRequest = (url,params) => {
    params = qs.stringify(params)
    return axios({
        method:'get',
        url:base+url,
        data:params,
    })
}

export const deleteRequest = (url,params) => {
    params = qs.stringify(params)
    return axios({
        method:'delete',
        url:base+url,
        data:params,
    })
}

export const pathRequest = (url,params) => {
    params = qs.stringify(params)
    return axios({
        method:'path',
        url:base+url,
        data:params,
    })
}