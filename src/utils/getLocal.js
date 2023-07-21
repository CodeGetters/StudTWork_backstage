/*
 * @Description-en:
 * @Description-zh:
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-07-19 23:44:48
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-07-20 21:11:41
 */
// ip 定位
// https://lbs.amap.com/api/webservice/guide/api/ipconfig

const gaoDeKey = import.meta.env.VITE_GAODE_API;

export const getIp = async () => {
  const response = await fetch(
    `https://restapi.amap.com/v3/ip?key=${gaoDeKey}`,
  ).catch((err) => {
    return err;
  });

  return await response.json();
};
