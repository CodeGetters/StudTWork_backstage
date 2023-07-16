<script setup>
import { ref } from "vue";
import { Editor } from "@bytemd/vue-next";
import gfm from "@bytemd/plugin-gfm";
import "bytemd/dist/index.css";

import { uploadArticle } from "@/api/article";

let content = ref("");

const plugins = [gfm()];
const handleChange = (v) => {
  content.value = v;
};
const getContent = () => {
  console.log(content.value);
};

const uploadFile = async () => {
  await uploadArticle(content.value)
    .then((res) => {
      console.log("res", res);
    })
    .then((err) => {
      console.log(err);
    });
};
</script>

<template>
  <div id="ArticleTest">
    <button class="h50px w50px" @click="getContent()">保存</button>
    <button class="h50px w50px" @click="uploadFile">提交</button>
    <div class="editorBox">
      <Editor :value="content" :plugins="plugins" @change="handleChange" />
    </div>
  </div>
</template>

<style lang="less">
#ArticleTest {
  height: 100%;
  width: 100%;

  .editorBox {
    width: 1000px;
    height: 900px;

    .bytemd-body {
      height: 500px;
    }
  }
}
</style>
