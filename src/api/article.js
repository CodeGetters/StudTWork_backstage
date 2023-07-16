/*
 * @Description-en:
 * @Description-zh:文章相关请求 api
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-07-14 12:11:21
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-07-14 19:52:07
 */
import service from "./index";

/**
 * @description:
 * @param {*} data
 */
export const uploadArticle = async (data) => {
  const response = await service.post("/article/upload", {
    articleCon: data.value.articleCon,
  });
  return response.data;
};
