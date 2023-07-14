import search from "../assets/layout/search.svg";
import notification from "../assets/layout/notification.svg";
import theme from "../assets/layout/theme.svg";
import setting from "../assets/layout/setting.svg";
import motif from "../assets/layout/motif.svg";

import { changeTheme } from ".";

export const avatarGroup = [
  {
    src: search,
    alt: "搜索",
    onPress: () => {},
  },
  {
    src: notification,
    alt: "提示 ",
    onPress: () => {},
  },
  {
    src: theme,
    alt: "主题",
    onPress: () => {
      changeTheme();
    },
  },
  {
    src: setting,
    alt: "设置",
    onPress: () => {},
  },
  {
    src: motif,
    alt: "皮肤",
    onPress: () => {},
  },
];
