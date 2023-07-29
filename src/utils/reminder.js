/*
 * @Description-en:
 * @Description-zh:
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-07-29 17:19:50
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-07-29 17:20:39
 */
export const messageTip = (type, msg) => {
  // eslint-disable-next-line no-undef
  ElMessage({
    message: msg,
    type,
  });
};
