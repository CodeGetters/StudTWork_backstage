/*
 * @Description-en:
 * @Description-zh:
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-06-29 22:05:35
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-08-04 14:50:55
 */
import service from "./index";

// TODO:分组管理

/**
 * @description 用户登录
 * @param {*} data
 * @returns res
 */
export const postLogin = async (data) => {
  const response = await service.post("/user/login", {
    userName: data.value.userName,
    pwd: data.value.pwd,
    city: data.value.city,
    province: data.value.province,
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
    city: data.value.city,
    province: data.value.province,
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

/**
 * @description 修改比用户权限低的用户信息
 * @param {*} data
 */
export const adminUpdate = async (data) => {
  const response = await service.post("/user/adminUpdate", {
    id: data.value.id,
    userName: data.value.userName,
    authority: data.value.authority,
    sex: data.value.sex,
    departmentId: data.value.departmentId,
    reason: data.value.reason,
  });

  return response.data;
};

/**
 *@description 高权限用户删除低权限用户
 * @param {*} data
 */
export const deleteUser = async (data) => {
  const response = await service.post("/user/delete", {
    id: data.value.id,
    reason: data.value.reason,
  });

  return response.data;
};

/**
 * @description 查看所有管理员
 */
export const adminList = async () => {
  const response = await service.get("/user/getManagers");
  return response.data;
};

/**
 * @description 查看特定用户的信息
 * @param {*} data
 */
export const specificUser = async (data) => {
  const response = await service.get("/user/specificUser", {
    userId: data.value.id,
  });
  return response.data;
};
