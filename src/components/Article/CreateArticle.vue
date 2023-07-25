<!--
 * @Description-en: 
 * @Description-zh: 
 * @Author: CodeGetters
 * @version: 
 * @Date: 2023-07-14 11:27:27
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-07-21 22:04:41
-->
<script setup>
// TODO:国际化以及布局主题切换
import { ref } from "vue";
// https://bytemd.js.org/#options
import { Editor } from "@bytemd/vue-next";
import gfm from "@bytemd/plugin-gfm";
import "bytemd/dist/index.css";

import { useRouter } from "vue-router";
const router = useRouter();

import i18n from "@/i18n";

import { uploadArticle } from "@/api/article";

const titleName = ref("");
const articleCon = ref("");
const articleInfo = ref(null);

const plugins = [gfm()];
const handleChange = (v) => {
  articleCon.value = v;
};

const JumpTo = (path, param) => {
  router.push({
    path,
    query: param,
  });
};

// 上传反馈
const messageTip = (type, msg) => {
  // eslint-disable-next-line no-undef
  ElMessage({
    message: msg === "" ? i18n.global.t("uploadArticle.networkError") : msg,
    type,
  });
};

// 文章上传
const uploadFile = async (visualRange) => {
  if (!articleCon.value) {
    messageTip("error", i18n.global.t("uploadArticle.emptyArticle"));
    return;
  }

  if (visualRange === 0 && titleName.value === "") {
    messageTip("error", i18n.global.t("uploadArticle.emptyTitle"));
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
      JumpTo("/homePage");
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
        :placeholder="$t('uploadArticle.iptTitle')"
        class="h100% outline-0 border-0 text-30px indent-2 w65%"
      />
      <div class="flex flex-row w30% h100% items-center ml-5%">
        <button class="h50px w50px" @click="uploadFile(-1)">
          {{ $t("uploadArticle.saveToDraft") }}
        </button>
        <button class="h50px w50px" @click="uploadFile(0)">
          {{ $t("uploadArticle.publish") }}
        </button>
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
