/*
 * @Description-en:
 * @Description-zh:
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-07-29 14:16:19
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-07-29 14:21:18
 */
import dayjs from "dayjs";

export const normalDate = (oldDate) => {
  return dayjs(oldDate).format("YYYY-MM-DD hh:mm");
};
