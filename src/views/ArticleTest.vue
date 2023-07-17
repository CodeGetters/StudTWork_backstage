<!--
 * @Description-en: 
 * @Description-zh: 
 * @Author: CodeGetters
 * @version: 
 * @Date: 2023-07-14 11:27:27
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-07-17 22:36:44
-->
<script setup>
// TODO:国际化以及布局主题切换
import { ref } from "vue";
// https://bytemd.js.org/#options
import { Editor } from "@bytemd/vue-next";
import gfm from "@bytemd/plugin-gfm";
import "bytemd/dist/index.css";

import { uploadArticle } from "@/api/article";

const titleName = ref("");
const articleCon = ref("");
const articleInfo = ref(null);

const plugins = [gfm()];
const handleChange = (v) => {
  articleCon.value = v;
};

// 上传反馈
const messageTip = (type, msg) => {
  // eslint-disable-next-line no-undef
  ElMessage({
    message: msg === "" ? "网络连接失败，请检查网络后再试" : msg,
    type,
  });
};

// 文章上传
const uploadFile = async (visualRange) => {
  if (!articleCon.value) {
    messageTip("error", "上传或保存文章，内容不能为空");
    return;
  }

  if (visualRange === 0 && titleName.value === "") {
    messageTip("error", "发布文章标调不能为空");
    return;
  }

  articleInfo.value = {
    articleName: titleName.value,
    articleCon: articleCon.value,
    visualRange,
  };

  await uploadArticle(articleInfo)
    .then((res) => {
      messageTip("success", res.msg);
    })
    .catch((err) => {
      messageTip("error", err.response.data.msg);
    });
};
</script>

<template>
  <div id="ArticleTest">
    <div class="articleInfo h8% w96% flex flex-row items-center bg-#fff">
      <input
        v-model="titleName"
        type="text"
        placeholder="请输入文章标题"
        class="h100% outline-0 border-0 text-30px indent-2 w65%"
      />
      <div class="flex flex-row w30% h100% items-center ml-5%">
        <button class="h50px w50px" @click="uploadFile(-1)">保存至草稿</button>
        <button class="h50px w50px" @click="uploadFile(0)">发布</button>
      </div>
    </div>
    <div class="mt-1% w96% h70%">
      <Editor
        :value="articleCon"
        :plugins="plugins"
        @change="handleChange"
        style="height: 100%"
      />
    </div>
  </div>
</template>

<style lang="less" scoped>
#ArticleTest {
  height: 100%;
  width: 100%;

  button {
    height: 80%;
    width: 46%;
    margin-left: 4%;
    outline: none;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    color: #fff;
    font-size: 18px;
    background-color: #165dff;

    &:hover {
      background-color: #447cff;
    }
    & :active {
      background-color: #85a8fa;
    }
  }

  :deep(.bytemd-split) {
    width: 100%;
    height: 100%;

    .bytemd-body {
      height: 100%;
      background-color: #fff;

      .CodeMirror-wrap {
        background-color: #f2f3f5;
      }
    }
  }
}
</style>
