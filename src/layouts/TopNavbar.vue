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

/**
 * @description 语言切换
 */
const changeLang = () => {
  console.log("切换成功！");
  locale.value === "zh-cn"
    ? (locale.value = "en-us")
    : (locale.value = "zh-cn");
};

// 路由跳转
const toHome = () => {
  router.push("/home");
};
</script>

<template>
  <div id="TopNavbar">
    <el-row>
      <el-col :xs="8" :sm="4" :md="4" :lg="6" class="left">
        <div class="logoBox" @click="toHome()">
          <div class="logo">
            <img src="@/assets/logo.svg" alt="logo" />
          </div>
          <div class="logoDesc">StudTWork</div>
        </div>
      </el-col>
      <el-col :xs="0" :sm="8" :md="10" :lg="12" />
      <el-col :xs="16" :sm="12" :md="10" :lg="6" class="right">
        <div class="avatarGroup">
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
          <div class="avatar w30% flex flex-row items-center justify-around">
            <span class="userName">{{ infoStore.userInfo.userName }}</span>
            <img :src="avatar" alt="头像" />
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<style lang="less">
#TopNavbar {
  height: 5.5%;
  width: 100%;
  position: fixed;
  top: 0;
  border-bottom: 1px solid #e5e6eb;

  .el-row {
    width: 100%;
    height: 100%;
    background-color: var(--navbar-bgc);

    .left {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      background-color: #fff;

      .logoBox {
        width: 30%;
        height: 58.3%;
        margin-left: 3.3%;
        margin-right: 67%;
        display: flex;
        flex-direction: row;
        align-items: center;
        cursor: pointer;

        .logo {
          width: 31.5%;
          height: 100%;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .logoDesc {
          font-size: 16px;
          font-weight: 800;
          font-style: italic;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          background-image: var(--form-left-logo-textColor);
        }
      }
    }

    .center {
      width: 100%;
      height: 100%;
    }

    .right {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;

      .avatarGroup {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        margin-right: 4%;

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
        }

        .avatar {
          border-radius: 15px;
          font-size: 12px;
          align-items: center;
          background-color: #f2f3f5;
          cursor: pointer;

          .userName {
            padding: 6%;
          }
        }
      }
    }
  }
}
</style>
