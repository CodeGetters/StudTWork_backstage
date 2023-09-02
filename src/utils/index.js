/*
 * @Description-en:tool function
 * @Description-zh:工具函数
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-06-21 15:04:57
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-08-21 09:44:17
 */

import useThemeStore from "@/store/theme";

const theme = useThemeStore();
let timer = null;

/**
 * @description 触发切换主题
 */
export const changeTheme = () => {
  if (!theme.isDark) {
    timer = setTimeout(() => {
      document.documentElement.setAttribute("theme", "dark");
      // 切换
      theme.toggleTheme();
      clearTimeout(timer);
    }, 500);
  } else {
    timer = setTimeout(() => {
      document.documentElement.removeAttribute("theme");
      theme.toggleTheme();
      clearTimeout(timer);
    }, 500);
  }
};

/**
 * @description 用于首次渲染时获取 localStorage 的值渲染主题
 */
export const recallTheme = () => {
  if (theme.isDark) {
    document.documentElement.setAttribute("theme", "dark");
  } else {
    document.documentElement.removeAttribute("theme");
  }
};
// const lang = useLangStore();

// export const changeLang = () => {
//   // 默认 zh-cn
// };
