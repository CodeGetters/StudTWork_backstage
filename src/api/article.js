/*
 * @Description-en:
 * @Description-zh:文章相关请求 api
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-07-14 12:11:21
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-07-22 13:14:23
 */
import service from "./index";

/**
 * @description:上传文章或保存草稿
 * @param {*} data
 */
export const uploadArticle = async (data) => {
  const response = await service.post("/article/upload", {
    articleName: data.value.articleName,
    articleCon: data.value.articleCon,
    visualRange: data.value.visualRange,
  });
  return response.data;
};

/**
 * @description 查看所有对外公开文章
 */
export const showArticle = async () => {
  const response = await service.get("/article/showArticle");

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
