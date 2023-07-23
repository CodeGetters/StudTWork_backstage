/*
 * @Description-en:
 * @Description-zh:刷新文章列表
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-07-23 17:07:26
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-07-23 17:10:44
 */
import * as dayjs from "dayjs";

export const getArticleList = async (tableData, articleApi) => {
  const articleList = await articleApi();
  let articleLength = articleList.data.articleList.length;
  let count = 1;
  articleList.data.articleList.forEach((item) => {
    item.releaseTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
    item.lastUpdate = dayjs().format("YYYY-MM-DD HH:mm:ss");
    if (count <= articleLength) item.articleId = count++;
  });

  tableData.value = articleList.data.articleList;
};
