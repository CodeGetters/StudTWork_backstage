/*
 * @Description: 总路由
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-06-18 21:18:19
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-07-28 00:01:49
 */
import { createRouter, createWebHistory } from "vue-router";

const Home = () => import("../views/HomePage.vue");
const Login = () => import("../views/LoginPage.vue");
const NotFound = () => import("../views/NotFound.vue");

const UserManage = () => import("../components/User/UserManage.vue");
const UserHome = () => import("../components/UserHome.vue");
const CommentManage = () => import("../components/CommentManage.vue");
const UserCenter = () => import("../components/User/UserCenter.vue");

const PublicArticle = () => import("../components/Article/PublicArticle.vue");
const VisibleArticle = () => import("../components/Article/VisibleArticle.vue");
const MyArticle = () => import("../components/Article/MyArticle.vue");
const CreateArticle = () => import("../components/Article/CreateArticle.vue");

const LoginPage = () => import("../components/LoginCon.vue");
const registerPage = () => import("../components/RegisterCon.vue");
const forgetPwd = () => import("../components/ForgetPwd.vue");

const ChartTest = () => import("../views/ChartTest.vue");
const MapTest = () => import("../views/MapTest.vue");

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

  // token 不存在强制跳转到登录页 login
  let token = localStorage.getItem("Authorization");
  if (!token) return next("/loginPage");

  // 4.tokenStr 存在放行
  next();
});

export default router;
