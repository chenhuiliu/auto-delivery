import { request } from "@/renderer/utils/request.js"

// login 登录
export const login = (option) => {
  let url = "/api/login"
  return request(url, {
    method: "post",
    data: {
      email: option.email,
      password: option.password,
    },
  })
};
// sign up 注册
export const register = (option) => {
  let url = "/api/register"
  return request(url, {
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
  let url = "/api/config"
  return request(url, {
    method: "get"
  })
};
// 新增配置
export const addConfig = (data) => {
  let url = "/api/addConfig"
  return request(url, {
    method: "post",
    data
  })
};
// 修改配置
export const editConfig = (data) => {
  let url = "/api/editConfig"
  return request(url, {
    method: "post",
    data
  })
};
// 获取投递记录
export const getDeliveryList = () => {
  let url = "/api/deliveryList"
  return request(url, {
    method: "get"
  })
};
