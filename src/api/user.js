/*
 * @Description-en:
 * @Description-zh:
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-06-29 22:05:35
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-07-16 20:23:59
 */
import service from "./index";

/**
 * @description 用户登录
 * @param {*} data
 * @returns res
 */
export const postLogin = async (data) => {
  // TODO:在登录时获取用户 ip 地址，并将 ip 地址转成实际地址||调用获取用位置第三方接口
  // TODO:获取到用户的市级地址
  // TODO：将用户的地址存储到后端记录起来---位置模型
  // TODO：后台通过调用位置模型接口渲染饼形图、条形图、折线图等等

  // const getIp = async () =>
  //   fetch("https://api.ipify.org?format=json")
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       const ipAddress = data.ip;
  //       console.log(`IP 获取成功 Address: ${ipAddress}`);
  //       return ipAddress;
  //     })
  //     .catch((error) => {
  //       console.error("ip 地址获取失败:", error);
  //     });

  // const response1 = await fetch("https://api.ipify.org?format=json");
  // if (!response1.ok) {
  //   throw new Error("Network response was not ok");
  // }
  // const data1 = await response1.json();
  // const address = data1.ip;
  // console.log(`IP 地址获取成功: ${address}`);

  const response = await service.post("/user/login", {
    userName: data.value.userName,
    pwd: data.value.pwd,
  });
  return response.data;
};

/**
 * @description 用户注册
 * @param {*} data
 * @returns
 */
export const postRegister = async (data) => {
  const response = await service.post("/user/register", {
    userName: data.value.userName,
    pwd: data.value.pwd,
    gender: data.value.gender,
  });
  return response.data;
};

// TODO:修改密码 api
export const postChange = async (data) => {
  const response = await service.post("/user/update", {
    userName: data.value.userName,
    newPwd: data.value.newPwd,
  });
  return response.data;
};

/**
 * @description:查找比用户权限低的全部用户
 */
export const getAllUser = async () => {
  const response = await service.get("/user/find");
  return response.data;
};
