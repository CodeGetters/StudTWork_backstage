/*
 * @Description: 总路由
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-06-18 21:18:19
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-08-03 10:30:09
 */
import { createRouter, createWebHistory } from "vue-router";

import { messageTip } from "@/utils/reminder";

const Home = () => import("@/views/HomePage.vue");
const Login = () => import("@/views/LoginPage.vue");
const NotFound = () => import("@/views/NotFound.vue");

const UserManage = () => import("@/components/User/UserManage.vue");
const UserHome = () => import("@/components/UserHome.vue");
const CommentManage = () => import("@/components/CommentManage.vue");
const UserCenter = () => import("@/components/User/UserCenter.vue");
const CreateUser = () => import("@/components/User/CreateUser.vue");

const PublicArticle = () => import("@/components/Article/PublicArticle.vue");
const VisibleArticle = () => import("@/components/Article/VisibleArticle.vue");
const MyArticle = () => import("@/components/Article/MyArticle.vue");
const CreateArticle = () => import("@/components/Article/CreateArticle.vue");
const viewArticle = () => import("@/components/Article/ViewArticle.vue");

const LoginPage = () => import("@/components/Home/LoginCon.vue");
const registerPage = () => import("@/components/Home/RegisterCon.vue");
const forgetPwd = () => import("@/components/Home/ForgetPwd.vue");

const CreateTeam = () => import("@/components/Department/CreateTeam.vue");
const ManageTeam = () => import("@/components/Department/ManageTeam.vue");

const ChartTest = () => import("@/views/ChartTest.vue");
const MapTest = () => import("@/views/MapTest.vue");

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    redirect: "/homePage",
    component: Home,
    meta: { transition: "slide-right" },
    children: [
      {
        path: "/homePage",
        component: UserHome,
      },
      {
        path: "/userManage",
        component: UserManage,
      },
      {
        path: "/createUser",
        component: CreateUser,
      },
      {
        path: "/commentManage",
        component: CommentManage,
      },
      {
        path: "/publicArticle",
        component: PublicArticle,
      },
      {
        path: "/visibleArticle",
        component: VisibleArticle,
      },
      {
        path: "/MyArticle",
        component: MyArticle,
      },
      {
        path: "/CreateArticle",
        component: CreateArticle,
      },
      {
        path: "/viewArticle",
        component: viewArticle,
      },
      {
        path: "/createTeam",
        component: CreateTeam,
      },
      {
        path: "/manageTeam",
        component: ManageTeam,
      },
      {
        path: "/charTest",
        component: ChartTest,
      },
      {
        path: "/userCenter",
        component: UserCenter,
      },

      {
        path: "/mapTest",
        component: MapTest,
      },
    ],
  },
  {
    // TODO:用户不能反复登录注册！(只能注销后才可以)
    path: "/login",
    name: "Login",
    redirect: "/loginPage",
    component: Login,
    meta: { transition: "slide-right" },
    children: [
      {
        path: "/loginPage",
        component: LoginPage,
      },
      {
        path: "/register",
        component: registerPage,
      },
      {
        path: "/forgetPwd",
        component: forgetPwd,
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 如果访问的是登录页 login、forgetPwd、register 放行
  if (to.path === "/loginPage") return next();
  if (to.path === "/register") return next();
  if (to.path === "/forgetPwd") return next();

  // 匹配 authorization
  const userInfoReg =
    /^(?=.*userInfo)(?=.*id)(?=.*userName)(?=.*sex)(?=.*departmentId)(?=.*authority).*$/;
  // 匹配 token
  const tokenReg = /.*Authorization.*/;
  let userInfo = localStorage.getItem("userInfo");
  let token = localStorage.getItem("Authorization");

  const userRes = userInfoReg.test(userInfo);
  const tokenRes = tokenReg.test(token);

  // 如果匹配不成功则返回首页重新登录
  // localStorage 为空需要重新登录
  if (!userRes || !tokenRes) {
    messageTip("error", "发生错误了，要不你重新登录一下试试~");
    router.push("/loginPage");
    localStorage.clear("userInfo");
  }

  // 放行
  next();
});
export default router;
