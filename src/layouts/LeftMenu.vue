<script setup>
import { ref } from "vue";
import {
  Setting,
  Odometer,
  Operation,
  User,
  Fold,
  Expand,
} from "@element-plus/icons-vue";

import globalConfig from "@/utils/globalConfig";
const isCollapse = ref(globalConfig.layout.isCollapse);
const emits = defineEmits(["updateValue"]);
import { useRouter } from "vue-router";
const router = useRouter();

/**
 * @description 是否折叠侧边菜单
 */
const changeCollapse = () => {
  isCollapse.value = !isCollapse.value;
  emits("updateValue", isCollapse.value);
};

/**
 * @description 路由跳转
 * @param {*} url
 * @param {*} param
 */
const routerJump = (url, param) => {
  router.push({
    path: url,
    query: param,
  });
};

// 处理折叠
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
};
</script>

<template>
  <div id="LeftMenu" class="h100% flex fixed top-5.5% flex-col">
    <el-menu
      default-active="1"
      class="menuCon"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
      active-text-color="#165DFF"
    >
      <!-- 主页 -->
      <el-menu-item index="1" @click="routerJump('/', {})">
        <el-icon><Odometer /></el-icon>
        <template #title>{{ $t("layout.homePage") }}</template>
      </el-menu-item>

      <!-- 用户管理 -->
      <el-sub-menu index="2">
        <template #title>
          <el-icon><User /></el-icon>
          <span>{{ $t("layout.userManage") }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1" @click="routerJump('/userManage', {})">{{
            $t("layout.userManage")
          }}</el-menu-item>

          <!-- 用户中心 -->
          <el-menu-item index="2-2" @click="routerJump('/userCenter', {})">
            {{ $t("layout.userCenter") }}
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>

      <!-- 文章管理 -->
      <el-sub-menu index="3">
        <template #title>
          <el-icon><Operation /></el-icon>
          <span>{{ $t("layout.articleManage") }}</span>
        </template>
        <el-menu-item-group>
          <!-- 所有公开的文章 -->
          <el-menu-item index="3-1" @click="routerJump('/publicArticle', {})"
            >公开文章</el-menu-item
          >
          <!-- 权限内可见文章 -->
          <el-menu-item index="3-2" @click="routerJump('/visibleArticle', {})"
            >可见文章</el-menu-item
          >
          <!-- 个人文章 -->
          <el-menu-item index="3-3" @click="routerJump('/MyArticle', {})"
            >我的文章</el-menu-item
          >
          <!-- 创建文章 -->
          <el-menu-item index="3-4" @click="routerJump('/CreateArticle', {})"
            >创建文章</el-menu-item
          >
        </el-menu-item-group>
      </el-sub-menu>

      <!-- 小组管理 -->
      <el-sub-menu index="4">
        <template #title>
          <el-icon><setting /></el-icon>
          <span>小组管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="4-1" @click="routerJump('/createTeam', {})"
            >创建小组</el-menu-item
          >
          <el-menu-item index="4-2" @click="routerJump('/manageTeam', {})"
            >小组管理</el-menu-item
          >
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
    <button
      class="isOpen flex items-center h5% outline-none border-none cursor-pointer justify-end"
      @click="changeCollapse()"
    >
      <el-icon v-if="isCollapse"><Expand /></el-icon>
      <el-icon v-else><Fold /></el-icon>
    </button>
  </div>
</template>

<style lang="less">
#LeftMenu {
  .el-menu {
    height: 90%;
    padding: 3.3% 3.6%;
    border-right: none;
    background-color: var(--navbar-bgc);

    .el-menu-item {
      border-radius: 2px;
    }
  }

  // 具有 menuCon 类但不具有 el-menu--collapse 类的元素
  .menuCon:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

  .is-active {
    background-color: #f2f3f5;
  }

  .isOpen {
    padding: 0 10%;
    background-color: var(--navbar-bgc);
  }
}
</style>
