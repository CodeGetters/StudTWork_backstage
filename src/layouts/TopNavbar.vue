<script setup>
import { avatarGroup } from "@/utils/assets";
import translate from "../assets/layout/translate.svg";
import avatar from "../assets/layout/avatar.png";

import { useI18n } from "vue-i18n";
const { locale } = useI18n();

import { useRouter } from "vue-router";
const router = useRouter();

import UseInfoStore from "../store/user";
const infoStore = UseInfoStore();
import useAuthStore from "../store/auth";
const authStore = useAuthStore();

/**
 * @description 语言切换
 */
const changeLang = () => {
  locale.value === "zh-cn"
    ? (locale.value = "en-us")
    : (locale.value = "zh-cn");
};

// 路由跳转
const routerJump = (path) => {
  router.push({
    path,
  });
};

const exitAccount = () => {
  routerJump("/loginPage");
  // 清除 Auth
  infoStore.clearUserInfo();
  authStore.clearToken();
};
</script>

<template>
  <div id="TopNavbar" class="h5.5% w100% top-0 fixed">
    <el-row>
      <el-col :xs="8" :sm="4" :md="4" :lg="6" class="left">
        <div
          class="w30% h58.3% flex flex-row items-center ml-3.3% mr-67% cursor-pointer"
          @click="routerJump('/homePage')"
        >
          <div class="logo w31.5% h100%">
            <img src="@/assets/logo.svg" alt="logo" />
          </div>
          <div class="logoDesc text-16px font-800 italic">StudTWork</div>
        </div>
      </el-col>
      <el-col :xs="0" :sm="8" :md="10" :lg="12" />
      <el-col :xs="16" :sm="12" :md="10" :lg="6" class="right">
        <div
          class="avatarGroup w100% h100% flex flex-row items-center justify-end mr-4%"
        >
          <div class="icon" @click="changeLang()">
            <img :src="translate" alt="语言切换" />
          </div>
          <div
            class="icon"
            v-for="item in avatarGroup"
            :key="item"
            @click="item.onPress"
          >
            <img :src="item.src" :alt="item.alt" />
          </div>
          <div
            class="avatar w30% flex flex-row items-center justify-around rounded-15px text-12px items-center cursor-pointer bg-#f2f3f5"
          >
            <span class="p6%">{{ infoStore.userInfo.userName }}</span>
            <el-dropdown>
              <button
                class="border-none outline-none cursor-pointer overflow-hidden rounded-50%"
              >
                <img :src="avatar" alt="头像" />
                <arrow-down />
              </button>

              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>个人中心</el-dropdown-item>
                  <el-dropdown-item @click.prevent="exitAccount()">{{
                    $t("layout.exitAccount")
                  }}</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<style lang="less" scoped>
#TopNavbar {
  .el-row {
    width: 100%;
    height: 100%;
    background-color: var(--navbar-bgc);

    .left {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;

      img {
        width: 100%;
        height: 100%;
      }

      .logoDesc {
        background-clip: text;
        -webkit-text-fill-color: transparent;
        background-image: var(--form-left-logo-textColor);
      }
    }

    .right {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;

      .avatarGroup {
        .icon {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          margin-right: 2.5%;
          background-color: #ccc;
          overflow: hidden;
          cursor: pointer;

          img {
            width: 100%;
            height: 100%;
          }
          &:hover {
            opacity: 0.8;
          }
          &:active {
            opacity: 0.5;
          }
        }

        .avatar {
          &:hover {
            opacity: 0.9;
          }
          &:active {
            opacity: 0.7;
          }
        }
      }
    }
  }
}
</style>
