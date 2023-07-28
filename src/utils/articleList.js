/*
 * @Description-en:refresh the article list data
 * @Description-zh:刷新文章列表数据
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-07-23 17:07:26
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-07-28 00:12:46
 */
import dayjs from "dayjs";

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
    item.releaseTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
    item.lastUpdate = dayjs().format("YYYY-MM-DD HH:mm:ss");
    if (count <= articleLength) item.articleId = count++;
  });

  tableData.value = articleList.data.articleList;
};
