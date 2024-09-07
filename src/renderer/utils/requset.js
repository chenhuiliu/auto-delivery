import axios from 'axios'
import {AxiosStatus} from 'axios-status'
import { message } from "ant-design-vue"

const axiosStatus = new AxiosStatus({
  timeout: 20,
  autoRetry: false
})
axiosStatus.register(axios);
function getCookie(name){
  var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
  if(arr=document.cookie.match(reg))
  return decodeURIComponent(arr[2]);
  else
  return null;
}

export async function doRequest(url, opts = {}) {
    if (window.ajax401_num > 10) return;
    if (!opts['headers']) {
        opts['headers'] = {
          'x-csrf-token':getCookie('csrfToken')
        }
    }
    return axiosStatus.request({
        url: url,
        method: opts['method'] || 'get',
        baseURL: opts['baseURL'],
        headers: opts['headers'],
        params: opts['params'],
        data: opts['data'],
        timeout: 30000,
        withCredentials: false,
        success: (res) => {
          try {
            if (res.status != 200) {
              message.error(res.statusText)
              return {
                code: res.status,
                msg: res.statusText
              }
            }
            return res.data
          } catch (error) {
            message.error(error)
          }
        },
        error : (err) => {
          message.error(err)
          return Promise.reject(err);
        }
    })
}
