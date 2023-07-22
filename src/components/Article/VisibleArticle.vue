<script setup>
import { ref, onMounted } from "vue";
import { findArticle } from "@/api/article";
import * as dayjs from "dayjs";

const tableData = ref();

// 修改文章信息
const dialogArticleInfo = ref(false);

// 修改文章内容
const dialogArticleCon = ref(false);

// 删除文章
const articleDelete = ref(false);

// 删除行
const deleteRow = () => {
  articleDelete.value = true;
  // tableData.value.splice(index, 1);
};

// TODO：visualRange 对自己的文章进行是否公开、修改观看权限等。。。
// TODO：将文章分离出来单独做一个文章管理菜单：包括：管理自己的文章，管理权限内可修改的文章
// 当然，这个要经过超管同意(也就是给超管发送站内信)
onMounted(async () => {
  const articleList = await findArticle();
  let count = 1;
  let articleLength = articleList.data.articleList.length;
  articleList.data.articleList.forEach((item) => {
    item.releaseTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
    item.lastUpdate = dayjs().format("YYYY-MM-DD HH:mm:ss");
    if (count <= articleLength) item.articleId = count++;
  });

  tableData.value = articleList.data.articleList;
});
</script>

<template>
  <div id="VisibleArticle" class="w100% h100%">
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      max-height="600"
      border
    >
      <el-table-column fixed prop="articleId" label="id" width="60" />
      <el-table-column prop="articleName" label="文章名" width="200" />
      <el-table-column prop="author" label="作者" width="130" />
      <el-table-column prop="releaseTime" label="发布时间" width="210" />
      <el-table-column prop="lastUpdate" label="最后更新时间" width="210" />
      <el-table-column prop="readers" label="阅读量" width="100" />

      <el-table-column label="操作" width="660">
        <template #default="scope">
          <el-check-tag checked class="ml-2" @click="dialogArticleInfo = true"
            >修改文章信息</el-check-tag
          >
          <el-check-tag checked class="ml-2" @click="dialogArticleCon = true"
            >修改文章内容</el-check-tag
          >
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
    <!-- 弹出框：修改文章信息 -->
    <el-dialog v-model="dialogArticleInfo" title="Shipping address">
      <el-form :model="articleInfo">
        <el-form-item label="文章名" :label-width="formLabelWidth">
          <el-input v-model="articleInfo.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="作者" :label-width="formLabelWidth">
          <el-input v-model="articleInfo.author" autocomplete="off" />
        </el-form-item>
        <el-form-item label="文章可见范围" :label-width="formLabelWidth">
          <el-radio-group v-model="articleInfo.visualRange">
            <el-radio label="1" size="large" border>游客</el-radio>
            <el-radio label="2" size="large" border>普通用户</el-radio>
            <el-radio label="3" size="large" border>管理员</el-radio>
            <el-radio label="4" size="large" border>公开</el-radio>
            <el-radio label="5" size="large" border>不公开</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <!-- 尾部内容 -->
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogArticleInfo = false">取消</el-button>
          <el-button type="primary" @click="dialogArticleInfo = false">
            提交
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="less" scoped></style>
