<!--
 * @Description-en: 
 * @Description-zh: 
 * @Author: CodeGetters
 * @version: 
 * @Date: 2023-07-09 13:24:41
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-07-22 00:26:22
-->
<script setup>
import { ref, onMounted } from "vue";
import { showArticle } from "@/api/article";
import * as dayjs from "dayjs";

const tableData = ref();

onMounted(async () => {
  const articleList = await showArticle();
  articleList.data.articleList.forEach((item) => {
    item.releaseTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
  });
  // TODO：visualRange 对自己的文章进行是否公开、修改观看权限等。。。
  // TODO：将文章分离出来单独做一个文章管理菜单：包括：管理自己的文章，管理权限内可修改的文章
  // 当然，这个要经过超管同意(也就是给超管发送站内信)
  console.log("---------------", articleList.data.articleList);
  tableData.value = articleList.data.articleList;
});

// 修改文章信息
const dialogArticleInfo = ref(false);
const formLabelWidth = "140px";
const articleInfo = ref({
  articleName: "",
  author: "",
  date1: "",
  date2: "",
  isPublic: "",
});

// 修改文章内容
const dialogArticleCon = ref(false);
const articleCon = ref("");

// 删除文章
const articleDelete = ref(false);

// 删除行
const deleteRow = () => {
  articleDelete.value = true;
  // tableData.value.splice(index, 1);
};
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
        <el-form-item label="是否公开">
          <el-radio-group v-model="articleInfo.isPublic" class="ml-4">
            <el-radio label="1" size="large">是</el-radio>
            <el-radio label="2" size="large">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="发布时间">
          <el-col :span="11">
            <el-date-picker
              v-model="articleInfo.date1"
              type="date"
              placeholder="Pick a date"
              style="width: 100%"
            />
          </el-col>
          <el-col :span="2" class="text-center">
            <span class="text-gray-500">-</span>
          </el-col>
          <el-col :span="11">
            <el-time-picker
              v-model="articleInfo.date2"
              placeholder="Pick a time"
              style="width: 100%"
            />
          </el-col>
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

    <el-dialog
      v-model="dialogArticleCon"
      title="Tips"
      width="30%"
      :before-close="handleClose"
    >
      <el-input
        v-model="articleCon"
        autosize
        type="textarea"
        placeholder="Please input"
      />
      <!-- 尾部 -->
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogArticleCon = false">取消</el-button>
          <el-button type="primary" @click="dialogArticleCon = false">
            提交
          </el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog
      v-model="articleDelete"
      title="Tips"
      width="30%"
      :before-close="handleClose"
    >
      <span>此操作不可逆，是否继续</span>
      <!-- 尾部 -->
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="articleDelete = false">取消</el-button>
          <el-button type="primary" @click="articleDelete = false">
            提交
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="less" scoped></style>
