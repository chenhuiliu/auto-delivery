import { doRequest } from "@/renderer/utils/request.js";
const baseUrl = "https://apifoxmock.com/m1/4160691-3800034-default"
// login 登录
export const login = (option) => {
  let url = `${baseUrl}/api/login`
  return doRequest(url, {
    method: "post",
    data: {
      email: option.email,
      password: option.password,
    },
  })
};
// sign up 注册
export const register = (option) => {
  let url = `${baseUrl}/api/register`
  return doRequest(url, {
    method: "post",
    data: {
      email: option.email,
      password: option.password,
      confirmPassword: option.confirmPassword
    },
  })
};
// 获取配置列表
export const getConfigList = () => {
  let url = `${baseUrl}/api/config`
  return doRequest(url, {
    method: "get"
  })
};
// 新增配置
export const addConfig = (data) => {
  let url = `${baseUrl}/api/addConfig`
  return doRequest(url, {
    method: "post",
    data
  })
};
// 修改配置
export const editConfig = (data) => {
  let url = `${baseUrl}/api/editConfig`
  return doRequest(url, {
    method: "post",
    data
  })
};
// 获取投递记录
export const getDeliveryList = () => {
  let url = `${baseUrl}/api/deliveryList`
  return doRequest(url, {
    method: "get"
  })
};
