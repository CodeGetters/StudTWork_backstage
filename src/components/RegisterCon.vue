<!--
 * @Description-en: 
 * @Description-zh: 注册页
 * @Author: CodeGetters
 * @version: 
 * @Date: 2023-07-14 13:38:57
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-07-20 22:44:00
-->
<script setup>
import { postRegister } from "@/api/user";
import { ref } from "vue";
import i18n from "@/i18n";
import { useRouter } from "vue-router";
import translate from "../assets/translate.svg";
import theme from "@/assets/theme.svg";
import useAuthStore from "../store/auth";
import useInfoStore from "../store/user";

import { getIp } from "../utils/getLocal";

const authStore = useAuthStore();
const userStore = useInfoStore();

const router = useRouter();

// TODO:语言切换持久全局化--------刷新自动获取本地语言进行切换
import { changeTheme } from "@/utils/index";

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

const ruleFormRef = ref();

const ruleForm = ref({
  pass: "",
  checkPass: "",
  userName: "",
  city: "",
  province: "",
});

const genderValue = ref("");

// 检验规则
const rules = ref({
  userName: [
    {
      required: true,
      validator: checkName,
      trigger: "blur",
    },
  ],
  pass: [
    {
      required: true,
      validator: validatePass,
      trigger: "blur",
    },
  ],
  checkPass: [
    {
      required: true,
      validator: checkPass,
      trigger: "blur",
    },
  ],
});

/**
 * @description 用户名检查
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
const checkName = (rule, value, callback) => {
  let usernameReg = /^(?=.*[a-zA-Z]).{4,11}$/;
  let emailReg = /^([a-zA-Z\d][\w-]{2,})@(\w{2,})\.([a-z]{2,})(\.[a-z]{2,})?$/;
  let timer = null;

  if (!value) {
    return callback(new Error(i18n.global.t("loginPage.noNone")));
  } else {
    timer = setTimeout(() => {
      if (usernameReg.test(value) || emailReg.test(value)) {
        if (!ruleFormRef.value) return;
        callback();
      }
      callback(new Error(i18n.global.t("loginPage.accountVerify")));
      clearTimeout(timer);
    }, 1000);
  }
};

/**
 * @description 密码检查
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
const validatePass = (rule, value, callback) => {
  let passReg = /^(?=.*[a-zA-Z])(?=.*\d).{4,11}$/;
  let timer = null;

  if (!value) {
    callback(new Error(i18n.global.t("loginPage.noNone")));
  } else {
    timer = setTimeout(() => {
      if (passReg.test(value)) {
        if (!ruleFormRef.value) return;
        callback();
      }
      callback(new Error(i18n.global.t("loginPage.pwdVerify")));
      clearTimeout(timer);
    }, 1000);
  }
};

/**
 * @description 二次密码检查
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
const checkPass = (rule, value, callback) => {
  if (!value) {
    callback(new Error(i18n.global.t("loginPage.noNone")));
  } else if (value !== ruleForm.value.pass) {
    callback(new Error(i18n.global.t("loginPage.matchAgainPwd")));
  } else {
    callback();
  }
};

const linkTo = (path) => {
  router.push({
    path,
  });
};

const newUser = ref(null);

/**
 * @description 注册用户
 * @param {*} userInfo
 */
const createUser = async (userInfo) => {
  const createRes = await postRegister(userInfo).catch((err) => {
    notification("error", err.response.data.msg);
  });

  if (createRes.msg === "success") {
    notification("success");
    authStore.setToken(JSON.stringify(createRes.data.token));
    userStore.setUserInfo(createRes.data.userInfo);
    linkTo("/home");
  } else {
    notification("error", "请输入账号或密码");
  }
};

/**
 * @description: 注册填写表单
 * @param {*} formEl
 */
const submitForm = async (formEl) => {
  if (!formEl) return;
  const ipInfo = await getIp().catch((err) => {
    return err;
  });
  ruleForm.value.city = ipInfo.city;
  ruleForm.value.province = ipInfo.province;

  // 校验
  formEl.validate(async (valid) => {
    if (valid) {
      newUser.value = {
        userName: ruleForm.value.userName,
        pwd: ruleForm.value.pass,
        gender: genderValue.value,
        city: ruleForm.value.city,
        province: ruleForm.value.province,
      };
      await createUser(newUser);
    } else {
      notification("error", "请完善信息");
    }
  });
};
/**
 * @description 注册结果
 * @param {*} type
 * @param {*} msg
 */
const notification = (type, msg) => {
  // eslint-disable-next-line no-undef
  ElNotification({
    title: "消息提示",
    message:
      type === "success"
        ? `欢迎加入 StudTWork 远在${ruleForm.value.city}的${ruleForm.value.userName}`
        : msg,
    type,
  });
};

const options = [
  {
    value: "男",
    label: i18n.global.t("loginPage.gentleman"),
  },
  {
    value: "女",
    label: i18n.global.t("loginPage.lady"),
  },
  {
    value: "保密",
    label: i18n.global.t("loginPage.secret"),
  },
];
</script>

<template>
  <div
    id="RegisterCon"
    class="w46% h74% m-auto mb-0 rounded-10px flex flex-col items-center"
  >
    <h1 class="pt-4% text-25px">{{ i18n.global.t("loginPage.register") }}</h1>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      class="demo-ruleForm mt-2%"
    >
      <div class="userInfo flex flex-row justify-between">
        <el-form-item :label="$t('loginPage.account')" prop="userName">
          <el-input
            v-model.number="ruleForm.userName"
            :placeholder="$t('loginPage.accountIpt')"
          />
        </el-form-item>
        <el-select v-model="genderValue" :placeholder="$t('loginPage.gender')">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>

      <el-form-item prop="pass" :label="$t('loginPage.password')">
        <el-input
          v-model="ruleForm.pass"
          type="password"
          autocomplete="off"
          :placeholder="$t('loginPage.passwordIpt')"
        />
      </el-form-item>
      <el-form-item :label="$t('loginPage.againPwd')" prop="checkPass">
        <el-input
          v-model="ruleForm.checkPass"
          type="password"
          autocomplete="off"
          :placeholder="$t('loginPage.passwordIpt')"
        />
      </el-form-item>

      <!-- TODO:用户注册成功就会获得 token，保存这个 token 并自动登录 -->
      <el-form-item class="flex items-center mt-8%">
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          {{ $t("loginPage.register") }}
        </el-button>
        <el-button type="primary" @click="linkTo('home')">
          {{ $t("loginPage.goHome") }}
        </el-button>
      </el-form-item>
    </el-form>

    <div class="changeButton relative left-26% top-5%">
      <button @click="changeTheme()">
        <img :src="theme" alt="theme" />
      </button>
      <button @click="changeLang()">
        <img :src="translate" alt="translate" />
      </button>
    </div>
  </div>
</template>

<style lang="less" scoped>
#RegisterCon {
  overflow: hidden;
  background-color: var(--form-right-bgc);
  box-shadow: 15px 15px 4px -5px var(--form-bgc-box-shadow);

  h1 {
    color: var(--from-right-textColor);
  }

  .el-form {
    width: 70%;

    .el-form-item {
      display: flex;
      flex-direction: column;

      :deep(.el-form-item__label) {
        color: var(--from-right-textColor);
        display: flex;
        justify-content: flex-start;
      }
    }

    :deep(.el-select) {
      position: relative;
      left: 0%;
      top: 32px;
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
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
