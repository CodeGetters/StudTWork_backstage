/*
 * @Description-en:refresh the article list data
 * @Description-zh:刷新文章列表数据
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-07-23 17:07:26
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-08-03 15:23:24
 */
import { includeSecond, normalDate } from "./formatTime";

/**
 * @description 文章请求
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

/**
 * @description 用户请求
 * @param {*} tableData:待填充表格
 * @param {*} getAllUser:请求用户 api
 * @param {*} findDepartment:用户部门信息 api
 */
export const getUserList = async (tableData, getAllUser, findDepartment) => {
  const user = await getAllUser();
  let count = 1;
  let userLength = user.data.users.length;

  // 格式化用户 id、用户注册时间、部门信息
  user.data.users.forEach(async (item) => {
    item.registerTime = normalDate(item.registerTime);
    if (count <= userLength) item.userId = count++;
    item.departmentName = "暂未分配";

    if (item.departmentId) {
      let itemRes = await findDepartment(item.departmentId);
      item.departmentName = itemRes.data.info.departmentName;
    }
  });
  tableData.value = user.data.users;
};
