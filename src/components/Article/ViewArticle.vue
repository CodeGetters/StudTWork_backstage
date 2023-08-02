<script setup>
import { onMounted, ref } from "vue";
import { Viewer } from "@bytemd/vue-next";
import { specificArticle } from "@/api/article";
import { useRoute } from "vue-router";
const route = useRoute();

const articleCon = ref("");
const getArticleInfo = async () => {
  const res = await specificArticle(route.query.id);
  articleCon.value = res.data.articleInfo.articleCon;
};

onMounted(() => {
  getArticleInfo();
});
</script>

<template>
  <div id="ViewArticle" class="w100% h100% bg-#fff">
    <!-- TODO:样式优化 -->
    <Viewer :tabindex="2" :value="articleCon" class="w96% h100% p2%" />
  </div>
</template>

<style scoped lang="less"></style>
