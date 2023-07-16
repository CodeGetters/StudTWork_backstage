<script setup>
import { ref } from "vue";
import i18n from "@/i18n";
import { changeTheme } from "@/utils/index";
import { postLogin } from "@/api/user";
import { useRouter } from "vue-router";
import useAuthStore from "@/store/auth";
import useInfoStore from "@/store/user";

import translate from "../assets/translate.svg";
import theme from "@/assets/theme.svg";

const authStore = useAuthStore();
const userInfoStore = useInfoStore();
const router = useRouter();

// TODO:语言切换持久全局化
import { useI18n } from "vue-i18n";
const { locale } = useI18n();

/**
 * @description 语言切换
 */
const changeLang = () => {
  locale.value === "zh-cn"
    ? (locale.value = "en-us")
    : (locale.value = "zh-cn");
};

const isRight = ref({
  account: false,
  pwd: false,
});

// 表单
const ruleForm = ref({
  account: "",
  pass: "",
});

const ruleFormRef = ref();

/**
 * @description 用户名或邮箱校验
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
const checkAccount = (rule, value, callback) => {
  let usernameReg = /^(?=.*[a-zA-Z]).{4,11}$/;
  let emailReg = /^([a-zA-Z\d][\w-]{2,})@(\w{2,})\.([a-z]{2,})(\.[a-z]{2,})?$/;
  if (value === "") {
    callback(new Error(i18n.global.t("loginPage.noNone")));
  } else {
    if (usernameReg.test(value) || emailReg.test(value)) {
      if (!ruleFormRef.value) return;
      isRight.value.account = true;
      callback();
    }
    callback(new Error(i18n.global.t("loginPage.accountVerify")));
  }
};

/**
 * @description 密码校验
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
const checkPass = (rule, value, callback) => {
  let passReg = /^(?=.*[a-zA-Z])(?=.*\d).{4,11}$/;
  if (value === "") {
    callback(new Error(i18n.global.t("loginPage.noNone")));
  } else {
    if (passReg.test(value)) {
      if (!ruleFormRef.value) return;
      isRight.value.pwd = true;
      callback();
    }
    callback(new Error(i18n.global.t("loginPage.pwdVerify")));
  }
};

// 校验规则配置
const rules = ref({
  account: [
    {
      required: true,
      trigger: "blur",
      validator: checkAccount,
    },
  ],
  pass: [
    {
      required: true,
      trigger: "blur",
      validator: checkPass,
    },
  ],
});

/**
 * @description 登录
 */
const submitForm = async () => {
  if (isRight.value.account && isRight.value.pwd) {
    const userName = ruleForm.value.account;
    const pwd = ruleForm.value.pass;
    isRight.value = {
      userName,
      pwd,
    };
    // 调用登录接口
    await postLogin(isRight)
      .then((res) => {
        notification("success");
        // token 和 userInfo 持久化
        authStore.setToken(JSON.stringify(res.data.token));
        userInfoStore.setUserInfo(res.data.userInfo);

        linkTo("/home");
      })
      .catch((err) => {
        notification(err, err.response.data.msg);
      });
  } else {
    notification("error");
  }
};

const linkTo = (path) => {
  router.push({
    path,
  });
};

/**
 * @description 登录结果提示
 * @param {*} type 弹出类型 err ? su                       ccess
 * @param {*} msg 失败信息
 */
const notification = (type, msg) => {
  // eslint-disable-next-line no-undef
  ElNotification({
    title: "消息提示",
    message: type === "success" ? `欢迎回来 ${ruleForm.value.account}` : msg,
    type,
  });
};
</script>

<template>
  <el-row class="flex w67% h74% flex-row rounded-10px" id="LoginCon">
    <el-col :xs="0" :sm="0" :md="12" :lg="12" class="login-left w100% h100%">
      <div class="logo-con h23% w58% flex flex-col select-none m-auto">
        <div
          class="logo-box h66% w100% flex justify-center items-center flex-row ml-8%"
        >
          <div class="logo w31% h100% mr-2%">
            <img src="@/assets/logo.svg" alt="logo" />
          </div>
          <div class="logo-English w67% text-28px m-auto italic tracking-2.8px">
            StudTWork
          </div>
        </div>
        <div class="logo-des text-20px text-center text-#3a7ecd mt-7%">
          {{ $t("loginPage.logoDesc") }}
        </div>
      </div>
    </el-col>

    <el-col :xs="24" :sm="24" :md="12" :lg="12" class="login-right w100% h100%">
      <div
        class="login-form-container w76% h76% flex justify-center m-auto flex-col"
      >
        <h1 class="m0 text-center">{{ $t("loginPage.loginTitle") }}</h1>
        <div class="login-form-right-con h90%">
          <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            status-icon
            :rules="rules"
            label-width="100px"
            class="login-user-info flex flex-col w100% h64% mb-4%"
          >
            <el-form-item :label="$t('loginPage.account')" prop="account">
              <el-input
                type="account"
                v-model="ruleForm.account"
                autocomplete="off"
                :placeholder="$t('loginPage.accountIpt')"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('loginPage.password')" prop="pass">
              <el-input
                type="password"
                v-model="ruleForm.pass"
                autocomplete="off"
                :placeholder="$t('loginPage.passwordIpt')"
              ></el-input>
            </el-form-item>

            <div
              @click="linkTo('/forgetPwd')"
              class="forget-pwd flex h7% m-3.5% text-12px items-center justify-end cursor-pointer"
            >
              <span>{{ $t("loginPage.forgetPwd") }}</span>
            </div>
            <el-button type="primary" @click="submitForm('ruleForm')">{{
              $t("loginPage.loginForm")
            }}</el-button>
          </el-form>

          <div class="other-platform-login h33% flex flex-col">
            <el-divider content-position="center">{{
              $t("loginPage.otherPlatform")
            }}</el-divider>
            <div class="icon-group h30% flex">
              <div class="icon"></div>
            </div>
            <div
              class="go-register text-center text-10px flex flex-row justify-center"
            >
              {{ $t("loginPage.noAccount") }}，
              <div class="cursor-pointer" @click="linkTo('/register')">
                {{ $t("loginPage.register") }}
              </div>
            </div>
          </div>
          <div class="changeButton relative left-80%">
            <button @click="changeTheme()">
              <img :src="theme" alt="theme" />
            </button>
            <button @click="changeLang()">
              <img :src="translate" alt="translate" />
            </button>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<style lang="less">
#LoginCon {
  margin: auto;
  margin-bottom: 0;
  overflow: hidden;
  box-shadow: 15px 15px 4px -5px var(--form-bgc-box-shadow);

  .login-left {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--form-left-bgc);

    .logo-English {
      // 线性渐变
      background-clip: text;
      -webkit-text-fill-color: transparent;
      background-image: var(--form-left-logo-textColor);
    }
  }

  .login-right {
    align-items: center;
    display: flex;
    justify-content: center;
    background-color: var(--form-right-bgc);

    .login-form-container {
      h1 {
        color: var(--from-right-textColor);
        font-size: 25px;
        padding-bottom: 3%;
      }

      .login-form-right-con {
        .forget-pwd {
          color: var(--from-right-textColor);
        }

        .el-form-item {
          margin: 0;
        }

        .el-form-item--feedback {
          flex-direction: column;

          label.el-form-item__label {
            color: var(--from-right-textColor);
            font-size: 16px;
            display: flex;
            justify-content: flex-start;
          }

          .el-form-item__content {
            min-height: 30px;

            .el-form-item__error {
              font-size: 10px;
            }
          }
        }

        .el-form-item--feedback:first-child {
          margin-bottom: 8%;
        }

        .el-button--primary {
          height: 14%;
          border-radius: 50px;
        }

        .other-platform-login {
          .el-divider__text {
            font-size: 12px;
            color: var(--from-right-textColor);
            background-color: var(--form-right-textBgc);
          }

          .el-divider--horizontal {
            margin: 2%;
          }

          .icon-group {
            margin: 8% 0;
            background-color: red;
          }

          .go-register {
            color: var(--from-right-textColor);

            a {
              color: var(--footer-textColor);
              text-decoration: none;
              outline: none;
            }
          }
        }

        .changeButton {
          button {
            height: 40px;
            width: 40px;
            border-radius: 50%;
            outline: none;
            border: none;
            cursor: pointer;
            overflow: hidden;
            background-color: #fff;
            margin-right: 10px;
          }
        }
      }
    }

    .login {
      color: var(--textColor);
    }
  }
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
