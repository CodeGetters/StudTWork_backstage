<script setup>
import { ref, onMounted } from "vue";
import { personalArticle } from "@/api/article";
import * as dayjs from "dayjs";

const tableData = ref();
const formLabelWidth = "100px";

// 弹出框控制
const dialogSwitch = ref({
  dialogArticleCon: false,
  dialogArticleInfo: false,
  articleDelete: false,
});

// 修改文章信息
const articleInfo = ref({
  articleName: "",
  author: "",
  isPublic: "",
  visualRange: [],
});

// 修改文章信息
const getArticleInfo = (info, row) => {
  const proxyInfo = new Proxy(info, {});

  if (proxyInfo.visualRange === "-1") {
    proxyInfo.isPublic = "-1";
  } else if (proxyInfo.visualRange === "0") {
    proxyInfo.isPublic = "0";
    proxyInfo.visualRange = ["1", "2", "3"];
  } else {
    proxyInfo.isPublic = "0";
    proxyInfo.visualRange = proxyInfo.visualRange.split("");
  }

  articleInfo.value = {
    ...proxyInfo,
  };

  console.log(row);
  dialogSwitch.value.dialogArticleInfo = true;
};

// 提交信息
const articleSubmit = () => {
  dialogSwitch.value.dialogArticleInfo = false;
  console.log(articleInfo.value.visualRange);
  const visualRange = Object.values(articleInfo.value.visualRange);
  console.log("拼接好的字符串：", visualRange.join(""));
};

// 修改文章内容
const getArticleCon = (id, row) => {
  // 打开弹出框
  dialogSwitch.value.dialogArticleCon = true;
  // 获取原始文章 id
  console.log("当前所在行的文章对应 id 和文章行号：", id, row);
};

// 删除文章
const deleteArticle = (id, row) => {
  console.log(id, row);
  dialogSwitch.value.articleDelete = true;

  // tableData.value.splice(row, 1);
};

// 修改文章内容
const articleCon = ref("");

// TODO：将文章分离出来单独做一个文章管理菜单：包括：管理自己的文章，管理权限内可修改的文章
// 当然，这个要经过超管同意(也就是给超管发送站内信)
onMounted(async () => {
  const articleList = await personalArticle();
  let articleLength = articleList.data.articleList.length;
  let count = 1;
  articleList.data.articleList.forEach((item) => {
    item.releaseTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
    item.lastUpdate = dayjs().format("YYYY-MM-DD HH:mm:ss");
    if (count <= articleLength) item.articleId = count++;
  });

  tableData.value = articleList.data.articleList;
});
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
      <el-table-column fixed prop="articleId" label="id" width="60" />
      <el-table-column prop="articleName" label="文章名" width="200" />
      <el-table-column prop="author" label="作者" width="130" />
      <el-table-column prop="releaseTime" label="发布时间" width="210" />
      <el-table-column prop="lastUpdate" label="最后更新时间" width="210" />
      <el-table-column prop="readers" label="阅读量" width="100" />
      <el-table-column label="操作" width="660">
        <template #default="scope">
          <el-check-tag
            checked
            class="ml-2"
            @click="getArticleInfo(scope.row, scope.$index)"
            >修改文章信息</el-check-tag
          >
          <el-check-tag
            checked
            class="ml-2"
            @click="getArticleCon(scope.row.id, scope.$index)"
            >修改文章内容</el-check-tag
          >
          <el-check-tag
            checked
            class="ml-2"
            @click="deleteArticle(scope.row.id, scope.$index)"
          >
            删除文章
          </el-check-tag>
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹出框：修改文章信息 -->
    <el-dialog v-model="dialogSwitch.dialogArticleInfo" title="修改文章信息">
      <el-form :model="articleInfo">
        <el-form-item label="文章名" :label-width="formLabelWidth">
          <el-input
            v-model="articleInfo.articleName"
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
          <el-button @click="dialogSwitch.dialogArticleInfo = false"
            >取消</el-button
          >
          <el-button type="primary" @click="articleSubmit()"> 提交 </el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 弹出框：修改文章内容 -->
    <el-dialog
      v-model="dialogSwitch.dialogArticleCon"
      title="修改文章内容"
      width="30%"
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
          <el-button @click="dialogSwitch.dialogArticleCon = false"
            >取消</el-button
          >
          <el-button
            type="primary"
            @click="dialogSwitch.dialogArticleCon = false"
          >
            提交
          </el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 弹出框：删除文章 -->
    <el-dialog
      v-model="dialogSwitch.articleDelete"
      title="删除文章"
      width="30%"
    >
      <span>此操作不可逆，是否继续</span>
      <!-- 尾部 -->
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogSwitch.articleDelete = false"
            >取消</el-button
          >
          <el-button type="primary" @click="dialogSwitch.articleDelete = false">
            提交
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="less" scoped></style>
