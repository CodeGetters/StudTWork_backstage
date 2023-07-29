/*
 * @Description-en:refresh the article list data
 * @Description-zh:刷新文章列表数据
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-07-23 17:07:26
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-07-29 17:18:56
 */
import { includeSecond } from "./formatTime";

/**
 *
 * @param {*} tableData:待填充图表
 * @param {*} articleApi:填充图表数据 api
 */
export const getArticleList = async (tableData, articleApi) => {
  const articleList = await articleApi();
  let articleLength = articleList.data.articleList.length;
  let count = 1;

  // 处理 api 数据中的发布时间和最后更新时间以及添加文章列表 id
  articleList.data.articleList.forEach((item) => {
    item.releaseTime = includeSecond(item.releaseTime);
    item.lastUpdate = includeSecond(item.lastUpdate);
    if (count <= articleLength) item.articleId = count++;
  });

  tableData.value = articleList.data.articleList;
};
