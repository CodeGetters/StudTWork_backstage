<!--
 * @Description-en: 
 * @Description-zh: 
 * @Author: CodeGetters
 * @version: 
 * @Date: 2023-07-09 13:24:41
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-07-20 15:03:09
-->
<script setup>
import { ref, onMounted } from "vue";
import { showArticle } from "@/api/article";
import { dayjs } from "element-plus";

const tableData = ref();

// 删除行
const deleteRow = (index) => {
  tableData.value.splice(index, 1);
};

onMounted(async () => {
  const articleList = await showArticle();
  articleList.data.articleList.forEach((item) => {
    item.releaseTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
  });
  tableData.value = articleList.data.articleList;
});
</script>

<template>
  <div id="ArticleManage" class="w100% h100%">
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      max-height="600"
      border
    >
      <el-table-column fixed prop="articleName" label="文章名" width="250" />
      <el-table-column prop="author" label="作者" width="180" />
      <el-table-column prop="releaseTime" label="发布时间" width="300" />
      <el-table-column prop="readers" label="阅读量" width="180" />
      <el-table-column label="操作" width="660">
        <template #default="scope">
          <el-check-tag checked class="ml-2">修改文章信息</el-check-tag>
          <el-check-tag checked class="ml-2">修改文章内容</el-check-tag>
          <el-check-tag
            checked
            class="ml-2"
            @click.prevent="deleteRow(scope.$index)"
          >
            删除文章
          </el-check-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style lang="less" scoped></style>
