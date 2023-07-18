/*
 * @Description-en:
 * @Description-zh:文章相关请求 api
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-07-14 12:11:21
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-07-17 21:22:17
 */
import service from "./index";

/**
 * @description:
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
