/*
 * @Description-en:
 * @Description-zh:文章相关请求 api
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-07-14 12:11:21
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-07-29 10:39:33
 */
import service from "./index";

/**
 * @description:上传文章或保存草稿
 * @param {*} data
 */
export const uploadArticle = async (data) => {
  const response = await service
    .post("/article/upload", {
      articleName: data.value.articleName,
      articleCon: data.value.articleCon,
      visualRange: data.value.visualRange,
    })
    .catch((err) => {
      return err;
    });
  return response.data;
};

/**
 * @description 查看对外公开文章
 */
export const showArticle = async () => {
  const response = await service.get("/article/showArticle").catch((err) => {
    return err;
  });

  return response.data;
};

/**
 * @description 修改对外公开文章信息
 * @param {*} data
 */
export const updatePublicInfo = async (data) => {
  const response = await service.post("/article/updatePublicInfo", {
    id: data.value.id,
    author: data.value.author,
    articleName: data.value.articleName,
    visualRange: data.value.visualRange,
    modifyReason: data.value.modifyReason,
  });

  return response.data;
};

/**
 * @description 删除对外公开文章信息
 * @param {*} data
 */
export const deletePublic = async (data) => {
  const response = await service.post("/article/deletePublic", {
    id: data.value.id,
    deleteReason: data.value.modifyReason,
  });

  return response.data;
};

/**
 * @description 修改对外公开文章内容
 * @param {*} data
 */
export const updatePublicCon = async (data) => {
  const response = await service.post("/article/updatePublicCon", {
    id: data.value.id,
    articleCon: data.value.articleCon,
    modifyReason: data.value.modifyReason,
  });

  return response.data;
};

/**
 * @description 查看权限内可见文章
 */
export const findArticle = async () => {
  const response = await service.get("/article/findArticle");

  return response.data;
};

/**
 * @description 查看用户自己的文章
 */
export const personalArticle = async () => {
  const response = await service.get("/article/findPersonal");

  return response.data;
};

/**
 * @description 修改用户自己的文章信息
 */
export const updatePersonal = async (data) => {
  const response = await service.post("/article/updatePersonal", {
    id: data.value.id,
    author: data.value.author,
    articleName: data.value.articleName,
    visualRange: data.value.visualRange,
  });

  return response.data;
};

/**
 * @description 修改用户自己的文章内容
 */
export const updateCon = async (data) => {
  const response = await service.post("/article/updateCon", {
    id: data.value.id,
    articleCon: data.value.articleCon,
  });

  return response.data;
};

/**
 * @description 用户删除自己的文章
 */
export const deletePersonal = async (data) => {
  const response = await service.post("/article/deletePersonal", {
    id: data.value.id,
  });

  return response.data;
};
