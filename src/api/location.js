/*
 * @Description-en:
 * @Description-zh:
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-07-29 11:58:51
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-07-29 12:33:21
 */
import service from ".";

export const getLastInfo = async () => {
  // 获取最后一次登录信息
  const response = await service.get("/location/getLastInfo");
  return response.data;
};
