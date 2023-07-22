<script setup>
import { ref, onMounted } from "vue";
import { personalArticle } from "@/api/article";
import * as dayjs from "dayjs";

const tableData = ref();

// TODO：visualRange 对自己的文章进行是否公开、修改观看权限等。。。
// TODO：将文章分离出来单独做一个文章管理菜单：包括：管理自己的文章，管理权限内可修改的文章
// 当然，这个要经过超管同意(也就是给超管发送站内信)
onMounted(async () => {
  const articleList = await personalArticle();
  let articleLength = articleList.data.articleList.length;
  let count = 1;
  articleList.data.articleList.forEach((item) => {
    item.releaseTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
    if (count <= articleLength) item.articleId = count++;
  });

  tableData.value = articleList.data.articleList;
});

// 修改文章信息
const dialogArticleInfo = ref(false);
const formLabelWidth = "100px";
const articleInfo = ref({
  articleName: "",
  author: "",
  isPublic: "",
  visualRange: [],
});

// TODO：点击某个行的按钮，自动获取该行的所在文章内容(根据文章 id 获取)

const getArticleInfo = () => {
  // 打开弹出框
  dialogArticleInfo.value = true;
};

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
  <div id="MyArticle" class="w100% h100%">
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      max-height="600"
      border
    >
      <el-table-column fixed prop="articleId" label="id" width="100" />
      <el-table-column prop="articleName" label="文章名" width="230" />
      <el-table-column prop="author" label="作者" width="180" />
      <el-table-column prop="releaseTime" label="发布时间" width="250" />
      <el-table-column prop="readers" label="阅读量" width="150" />
      <el-table-column label="操作" width="660">
        <template #default="scope">
          <el-check-tag checked class="ml-2" @click="getArticleInfo()"
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
    <el-dialog v-model="dialogArticleInfo" title="修改文章信息">
      <el-form :model="articleInfo">
        <el-form-item label="文章名" :label-width="formLabelWidth">
          <el-input
            v-model="articleInfo.name"
            autocomplete="off"
            maxlength="15"
            show-word-limit
          />
        </el-form-item>
        <el-form-item label="作者" :label-width="formLabelWidth">
          <el-input
            v-model="articleInfo.author"
            autocomplete="off"
            maxlength="12"
            show-word-limit
          />
        </el-form-item>
        <el-form-item label="文章是否可见" :label-width="formLabelWidth">
          <el-radio-group v-model="articleInfo.isPublic">
            <el-radio label="0" size="large" border>公开</el-radio>
            <el-radio label="-1" size="large" border>隐藏</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="文章可见范围"
          :label-width="formLabelWidth"
          v-if="articleInfo.isPublic !== '-1'"
        >
          <el-checkbox-group v-model="articleInfo.visualRange">
            <el-checkbox label="1" size="large" border>游客</el-checkbox>
            <el-checkbox label="2" size="large" border>普通用户</el-checkbox>
            <el-checkbox label="3" size="large" border>超级管理员</el-checkbox>
          </el-checkbox-group>
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

    <!-- 修改文章内容 -->
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
  </div>
</template>

<style lang="less" scoped></style>
