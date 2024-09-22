import axios from 'axios';

// 创建 Axios 实例
const service = axios.create({
  baseURL: 'https://apifoxmock.com/m1/4160691-3800034-default',
  timeout: 5000,
});

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 可以在这里添加请求头信息，如 Authorization 等
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  response => {
    // 可以在这里对响应数据进行统一处理，比如判断状态码等
    const res = response.data
    if (res.code === 200) {
      return res
    } else {
      return Promise.reject(res)
    }
  },
  error => {
    return Promise.reject(error)
  }
);

// 封装的 request 函数
export const request = async (url, opts = {}) => {
  try {
    const config = {
      url,
      method: opts['method'] || 'get', // 默认为 GET 请求
    }
    if (opts['data']) config.data = data;
    if (opts['params']) config.params = params;
    console.log(config, "config")
    return await service(config);
  } catch (error) {
    // 可以在这里对错误进行统一处理
    return Promise.reject(error)
  }
}
